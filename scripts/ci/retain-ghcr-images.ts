interface PackageVersion {
  id: number
  created_at: string
  metadata?: {
    container?: {
      tags?: string[]
    }
  }
}

const runnerTemp = Bun.env.RUNNER_TEMP
const owner = Bun.env.GITHUB_REPOSITORY_OWNER
const packageName = Bun.env.PACKAGE_NAME
if (!runnerTemp || !owner || !packageName) {
  throw new Error('RUNNER_TEMP, GITHUB_REPOSITORY_OWNER, and PACKAGE_NAME are required')
}

const keepCount = Number(Bun.argv.find((argument) => argument.startsWith('--keep='))?.slice(7))
if (!Number.isInteger(keepCount) || keepCount < 1) {
  throw new Error('Pass a positive --keep count')
}
const requiredTag = Bun.argv.find((argument) => argument.startsWith('--require-tag='))?.slice(14)
const versions = (await Bun.file(`${runnerTemp}/ghcr-package-versions.json`).json()).flat() as PackageVersion[]
const releaseTag = /^v(\d+)\.(\d+)\.(\d+)$/
const releases = versions
  .flatMap((version) => {
    const tag = version.metadata?.container?.tags?.find((value) => releaseTag.test(value))
    if (!tag) return []
    const [, major, minor, patch] = tag.match(releaseTag)!
    return { version, tag, semver: [Number(major), Number(minor), Number(patch)] as const }
  })
  .sort((left, right) => {
    for (let index = 0; index < 3; index += 1) {
      const difference = right.semver[index] - left.semver[index]
      if (difference !== 0) return difference
    }
    return right.version.created_at.localeCompare(left.version.created_at)
  })

if (requiredTag && !releases.some(({ tag }) => tag === requiredTag)) {
  throw new Error(`Published release ${requiredTag} was not found in GHCR`)
}

const keepIds = new Set(releases.slice(0, keepCount).map(({ version }) => version.id))

for (const version of versions) {
  const tags = version.metadata?.container?.tags ?? []
  const isReleaseVersion = tags.some((tag) => releaseTag.test(tag))
  // GHCR reports the image index and its untagged platform/attestation
  // manifests as separate package versions. The release tag belongs to the
  // index; deleting untagged entries breaks pulls of that index.
  if (!isReleaseVersion || keepIds.has(version.id)) continue
  const result = Bun.spawnSync({
    cmd: [
      'gh',
      'api',
      '--method',
      'DELETE',
      `users/${owner}/packages/container/${packageName}/versions/${version.id}`,
    ],
    stdout: 'inherit',
    stderr: 'inherit',
  })
  if (result.exitCode !== 0) {
    throw new Error(`Failed to delete GHCR package version ${version.id}`)
  }
}

console.log(
  `Retained ${keepIds.size} GHCR release image version(s) and preserved untagged manifests`,
)
