const packageJson = await Bun.file('package.json').json()
const bunVersion = (await Bun.file('.bun-version').text()).trim()
const dockerfile = await Bun.file('Dockerfile').text()
const dockerImage = dockerfile.match(
  /^FROM mirror\.gcr\.io\/oven\/bun:(\S+) AS base$/m,
)?.[1]
const [, baseTag, baseDigest] = dockerImage?.match(
  /^(\d+\.\d+\.\d+-alpine)@sha256:([a-f\d]{64})$/,
) ?? []

if (packageJson.packageManager !== `bun@${bunVersion}`) {
  throw new Error('packageManager and .bun-version do not match')
}
if (packageJson.engines?.bun !== `>=${bunVersion}`) {
  throw new Error('The Bun engine requirement and .bun-version do not match')
}
if (packageJson.devDependencies?.['@types/bun'] !== bunVersion) {
  throw new Error('The Bun type package and .bun-version do not match')
}
if (baseTag !== `${bunVersion}-alpine` || !baseDigest) {
  throw new Error('The Docker base image tag/digest and .bun-version do not match')
}
if (!dockerfile.includes(`RUN test "$(bun --version)" = "${bunVersion}"`)) {
  throw new Error('The Docker base image is missing its Bun version assertion')
}

console.log(`Bun ${bunVersion} pins match package metadata and Docker stages`)
