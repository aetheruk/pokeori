#!/usr/bin/env bash

# Build the checked-out protected-main release, publish it to GHCR, then ask
# Coolify to pull the immutable image. Keep credentials outside the repository.
set -euo pipefail

readonly DEFAULT_GHCR_OWNER="aetheruk"
readonly DEFAULT_IMAGE_NAME="pokeori"
readonly DEFAULT_REMOTE="origin"
readonly DEFAULT_BRANCH="main"
readonly GHCR_RELEASE_HISTORY_LIMIT=3

fail() {
  printf 'Deployment stopped: %s\n' "$*" >&2
  exit 1
}

require_command() {
  command -v "$1" >/dev/null 2>&1 || fail "'$1' is required. $2"
}

require_env() {
  local variable_name="$1"
  [[ -n "${!variable_name:-}" ]] || fail "Set $variable_name before deploying."
}

dotenv_value() {
  local variable_name="$1"
  [[ -f .env ]] || return 0

  bun -e "process.stdout.write(Bun.env[process.argv.at(-1)] ?? '')" "$variable_name"
}

confirm_main_update() {
  local prompt="$1"
  local response
  [[ -t 0 ]] || fail "$prompt Re-run from an interactive terminal."
  read -r -p "$prompt [y/N] " response
  [[ "$response" =~ ^[Yy]([Ee][Ss])?$ ]] || fail "Deployment cancelled."
}

main() {
  require_command git "Install Git and try again."
  require_command bun "Install Bun 1.3.10 and run bun install."
  require_command docker "Start Docker Desktop (with Buildx) and try again."
  docker buildx version >/dev/null 2>&1 || fail "Docker Buildx is required; enable it in Docker Desktop."
  require_command curl "Install curl and try again."
  require_command gh "Authenticate with GitHub CLI or set GHCR_TOKEN."

  local remote="${DEPLOY_REMOTE:-$DEFAULT_REMOTE}"
  local branch="${DEPLOY_BRANCH:-$DEFAULT_BRANCH}"
  local owner="${GHCR_OWNER:-$DEFAULT_GHCR_OWNER}"
  local image_name="${GHCR_IMAGE_NAME:-$DEFAULT_IMAGE_NAME}"
  local image="ghcr.io/${owner}/${image_name}"

  git diff --quiet || fail "Commit or stash working-tree changes before deploying."
  git diff --cached --quiet || fail "Commit or unstage index changes before deploying."

  git fetch "$remote" "$branch" --quiet
  local current_branch local_main_sha local_sha remote_sha
  current_branch="$(git branch --show-current)"
  local_main_sha="$(git rev-parse "refs/heads/${branch}")" || \
    fail "Local '$branch' does not exist. Fetch it and try again."
  remote_sha="$(git rev-parse "${remote}/${branch}")"

  if [[ "$local_main_sha" != "$remote_sha" ]]; then
    git merge-base --is-ancestor "$local_main_sha" "$remote_sha" || \
      fail "Local '$branch' has commits not on '${remote}/${branch}'. Resolve them before deploying."
  fi

  if [[ "$current_branch" != "$branch" || "$local_main_sha" != "$remote_sha" ]]; then
    confirm_main_update "Switch to '$branch' and fast-forward from '${remote}/${branch}' before deploying?"
    [[ "$current_branch" == "$branch" ]] || git switch "$branch"
    git merge --ff-only "${remote}/${branch}"
  fi

  local_sha="$(git rev-parse HEAD)"
  [[ "$local_sha" == "$remote_sha" ]] || fail "'$branch' must exactly match '${remote}/${branch}'."

  if [[ -z "${GHCR_TOKEN:-}" ]]; then
    GHCR_TOKEN="$(gh auth token)" || fail "Unable to read the GitHub CLI token."
  fi
  GHCR_USERNAME="${GHCR_USERNAME:-$owner}"

  COOLIFY_WEBHOOK="${COOLIFY_WEBHOOK:-${COOLIFY_WEBHOOK_URI:-}}"
  COOLIFY_TOKEN="${COOLIFY_TOKEN:-${COOLIFY_WEBHOOK_TOKEN:-}}"
  COOLIFY_WEBHOOK="${COOLIFY_WEBHOOK:-$(dotenv_value COOLIFY_WEBHOOK_URI)}"
  COOLIFY_TOKEN="${COOLIFY_TOKEN:-$(dotenv_value COOLIFY_WEBHOOK_TOKEN)}"

  require_env COOLIFY_WEBHOOK
  require_env COOLIFY_TOKEN
  NEXT_SERVER_ACTIONS_ENCRYPTION_KEY="${NEXT_SERVER_ACTIONS_ENCRYPTION_KEY:-$(dotenv_value NEXT_SERVER_ACTIONS_ENCRYPTION_KEY)}"
  require_env NEXT_SERVER_ACTIONS_ENCRYPTION_KEY

  local version short_sha
  version="$(bun -e "process.stdout.write((await Bun.file('package.json').json()).version)")"
  short_sha="$(git rev-parse --short=12 HEAD)"

  printf 'Validating Pokeori %s at %s…\n' "$version" "$short_sha"
  bun run lint
  bun run typecheck
  bun test
  bun run validate:data

  printf 'Authenticating to GHCR…\n'
  printf '%s' "$GHCR_TOKEN" | docker login ghcr.io --username "$GHCR_USERNAME" --password-stdin

  local candidate_tag="${image}:candidate-${short_sha}"
  printf 'Building linux/amd64 release candidate %s…\n' "$candidate_tag"
  docker buildx build \
    --platform linux/amd64 \
    --load \
    --cache-from "type=registry,ref=${image}:buildcache" \
    --cache-to "type=registry,ref=${image}:buildcache,mode=max,image-manifest=true,oci-mediatypes=true" \
    --secret id=NEXT_SERVER_ACTIONS_ENCRYPTION_KEY,env=NEXT_SERVER_ACTIONS_ENCRYPTION_KEY \
    --label "org.opencontainers.image.source=https://github.com/${owner}/${image_name}" \
    --label "org.opencontainers.image.revision=${local_sha}" \
    --label "org.opencontainers.image.version=${version}" \
    --tag "$candidate_tag" \
    .

  local image_size max_image_size
  image_size="$(docker image inspect "$candidate_tag" --format '{{.Size}}')"
  max_image_size="${MAX_RELEASE_IMAGE_BYTES:-367001600}"
  [[ "$image_size" -le "$max_image_size" ]] || \
    fail "Release image is $image_size bytes; budget is $max_image_size bytes."

  local smoke_container
  smoke_container="$(docker run --detach --rm \
    --env DATABASE_URI=mongodb://127.0.0.1:27017/pokeori \
    --env PAYLOAD_SECRET=pokeori-smoke-only-placeholder \
    --env RESEND_API_KEY=re_pokeori-smoke-only-placeholder \
    --env REDIS_URL=redis://127.0.0.1:6379 \
    --publish 127.0.0.1::3000 \
    "$candidate_tag")"
  trap 'docker rm --force "$smoke_container" >/dev/null 2>&1 || true' EXIT
  local smoke_port
  smoke_port="$(docker port "$smoke_container" 3000/tcp | awk -F: 'NR == 1 { print $NF }')"
  for _ in {1..30}; do
    if curl --fail --silent "http://127.0.0.1:${smoke_port}/api/app-version" |
      grep --quiet "\"version\":\"${version}\""; then
      break
    fi
    sleep 1
  done
  curl --fail --silent "http://127.0.0.1:${smoke_port}/api/app-version" |
    grep --quiet "\"version\":\"${version}\"" ||
    fail "Release candidate did not pass the app-version smoke check."
  docker rm --force "$smoke_container" >/dev/null
  trap - EXIT

  printf 'Publishing verified release candidate…\n'
  docker tag "$candidate_tag" "${image}:latest"
  docker tag "$candidate_tag" "${image}:v${version}"
  docker tag "$candidate_tag" "${image}:sha-${short_sha}"
  docker push "${image}:latest"
  docker push "${image}:v${version}"
  docker push "${image}:sha-${short_sha}"

  printf 'Pruning GHCR release history (keeping the newest %s images)…\n' "$GHCR_RELEASE_HISTORY_LIMIT"
  local package_owner_type="${GHCR_OWNER_TYPE:-user}"
  local package_versions_endpoint
  case "$package_owner_type" in
    user) package_versions_endpoint="users/${owner}/packages/container/${image_name}/versions" ;;
    org) package_versions_endpoint="orgs/${owner}/packages/container/${image_name}/versions" ;;
    *) fail "GHCR_OWNER_TYPE must be 'user' or 'org'." ;;
  esac

  local package_versions
  package_versions="$(GH_TOKEN="$GHCR_TOKEN" gh api --paginate \
    "${package_versions_endpoint}?per_page=100" \
    --jq '.[] | [(.id | tostring), .created_at, ((.metadata.container.tags // []) | join(","))] | @tsv' |
    sort -t $'\t' -k2,2r)" ||
    fail "Unable to list GHCR package versions. The release token needs package read/admin access."

  local release_count=0 version_id created_at tags
  while IFS=$'\t' read -r version_id created_at tags; do
    [[ -n "$version_id" ]] || continue
    [[ ",${tags}," == *,buildcache,* ]] && continue

    if [[ -z "$tags" ]]; then
      printf 'Deleting untagged GHCR version %s…\n' "$version_id"
    else
      release_count=$((release_count + 1))
      (( release_count > GHCR_RELEASE_HISTORY_LIMIT )) || continue
      printf 'Deleting old GHCR version %s (%s)…\n' "$version_id" "$tags"
    fi

    GH_TOKEN="$GHCR_TOKEN" gh api --method DELETE --silent \
      "${package_versions_endpoint}/${version_id}" ||
      fail "Unable to delete GHCR package version ${version_id}. Grant the release token delete:packages access."
  done <<< "$package_versions"

  printf 'Triggering Coolify…\n'
  curl --fail-with-body --silent --show-error --request GET "$COOLIFY_WEBHOOK" \
    --header "Authorization: Bearer ${COOLIFY_TOKEN}"
  printf '\nDeployment requested: %s:v%s (sha-%s)\n' "$image" "$version" "$short_sha"
}

main "$@"
