#!/usr/bin/env bash

# Build the checked-out protected-main release, publish it to GHCR, then ask
# Coolify to pull the immutable image. Keep credentials outside the repository.
set -euo pipefail

readonly DEFAULT_GHCR_OWNER="aetheruk"
readonly DEFAULT_IMAGE_NAME="pokeori"
readonly DEFAULT_REMOTE="origin"
readonly DEFAULT_BRANCH="main"

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

main() {
  require_command git "Install Git and try again."
  require_command node "Install Node.js 22+ and pnpm 10.24.0, then run pnpm install."
  require_command pnpm "Install pnpm 10.24.0 and run pnpm install."
  require_command docker "Start Docker Desktop (with Buildx) and try again."
  docker buildx version >/dev/null 2>&1 || fail "Docker Buildx is required; enable it in Docker Desktop."
  require_command curl "Install curl and try again."

  local remote="${DEPLOY_REMOTE:-$DEFAULT_REMOTE}"
  local branch="${DEPLOY_BRANCH:-$DEFAULT_BRANCH}"
  local owner="${GHCR_OWNER:-$DEFAULT_GHCR_OWNER}"
  local image_name="${GHCR_IMAGE_NAME:-$DEFAULT_IMAGE_NAME}"
  local image="ghcr.io/${owner}/${image_name}"

  [[ "$(git branch --show-current)" == "$branch" ]] || \
    fail "Deploy only from '$branch' after its pull request has merged."
  git diff --quiet || fail "Commit or stash working-tree changes before deploying."
  git diff --cached --quiet || fail "Commit or unstage index changes before deploying."

  git fetch "$remote" "$branch" --quiet
  local local_sha remote_sha
  local_sha="$(git rev-parse HEAD)"
  remote_sha="$(git rev-parse "${remote}/${branch}")"
  [[ "$local_sha" == "$remote_sha" ]] || \
    fail "Local '$branch' must exactly match '${remote}/${branch}'. Pull the merged release first."

  require_env GHCR_TOKEN
  require_env GHCR_USERNAME
  require_env COOLIFY_WEBHOOK
  require_env COOLIFY_TOKEN

  local version short_sha
  version="$(node --input-type=module -e "import pkg from './package.json' with { type: 'json' }; process.stdout.write(pkg.version)")"
  short_sha="$(git rev-parse --short=12 HEAD)"

  printf 'Validating Pokeori %s at %s…\n' "$version" "$short_sha"
  pnpm run lint
  pnpm run typecheck
  pnpm test
  pnpm run validate:data

  printf 'Authenticating to GHCR…\n'
  printf '%s' "$GHCR_TOKEN" | docker login ghcr.io --username "$GHCR_USERNAME" --password-stdin

  printf 'Building and publishing %s…\n' "$image"
  docker buildx build \
    --platform linux/amd64 \
    --push \
    --label "org.opencontainers.image.source=https://github.com/${owner}/${image_name}" \
    --label "org.opencontainers.image.revision=${local_sha}" \
    --label "org.opencontainers.image.version=${version}" \
    --tag "${image}:latest" \
    --tag "${image}:v${version}" \
    --tag "${image}:sha-${short_sha}" \
    .

  printf 'Triggering Coolify…\n'
  curl --fail-with-body --silent --show-error --request GET "$COOLIFY_WEBHOOK" \
    --header "Authorization: Bearer ${COOLIFY_TOKEN}"
  printf '\nDeployment requested: %s:v%s (sha-%s)\n' "$image" "$version" "$short_sha"
}

main "$@"
