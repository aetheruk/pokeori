import { mkdir, readFile, rm, stat, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath, pathToFileURL } from 'node:url'
import sharp from 'sharp'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const sourceRepoUrl = 'https://github.com/PokeAPI/sprites.git'
const sourceDir = join(repoRoot, 'source_data', 'pokeapi-sprites')
const outputRoot = join(repoRoot, 'public', 'sprites', 'pokemon')
const manifestPath = join(repoRoot, 'src', 'data', 'pokemon-sprite-manifest.json')
const missingDocPath = join(repoRoot, 'docs', 'game-data', 'missing-pokemon-sprites.md')
const fallbackFormId = '201'
const homeSpriteSize = 200
const syncConcurrency = 8
const spriteOutputExtension = 'avif'

const sourceFolders = [
  'sprites/items',
  'sprites/pokemon/other/home',
  'sprites/pokemon/versions/generation-v/black-white',
]

function parseArgs() {
  return new Set(process.argv.slice(2))
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: repoRoot,
    stdio: 'inherit',
    ...options,
  })

  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(' ')} failed`)
  }
}

async function pathExists(path) {
  try {
    await stat(path)
    return true
  } catch {
    return false
  }
}

async function shouldWriteSprite(source, output) {
  try {
    const [sourceStats, outputStats] = await Promise.all([stat(source), stat(output)])
    return outputStats.mtimeMs < sourceStats.mtimeMs
  } catch {
    return true
  }
}

async function prepareSourceRepo(args) {
  await mkdir(dirname(sourceDir), { recursive: true })

  if (!existsSync(join(sourceDir, '.git'))) {
    await rm(sourceDir, { recursive: true, force: true })
    run('git', ['clone', '--depth', '1', '--filter=blob:none', '--sparse', sourceRepoUrl, sourceDir])
  } else if (!args.has('--skip-fetch')) {
    run('git', ['-C', sourceDir, 'pull', '--ff-only'])
  }

  run('git', ['-C', sourceDir, 'sparse-checkout', 'set', ...sourceFolders])
}

async function loadPokemonForms() {
  const pokemonModuleUrl = pathToFileURL(join(repoRoot, 'src', 'data', 'pokemon', 'index.ts')).href
  const { allPokemon } = await import(pokemonModuleUrl)

  return allPokemon
    .flatMap((species) =>
      species.forms.map((form) => ({
        speciesId: species.id,
        formId: String(form.id),
        name: form.name,
        form: form.form,
      })),
    )
    .sort((a, b) => a.formId.localeCompare(b.formId, undefined, { numeric: true }))
}

function sourcePath(...segments) {
  return join(sourceDir, 'sprites', 'pokemon', ...segments)
}

function outputPath(...segments) {
  return join(outputRoot, ...segments)
}

function publicPath(path) {
  return `/${relative(join(repoRoot, 'public'), path).replaceAll('\\', '/')}`
}

function getSpriteDefinitions(formId) {
  return [
    {
      key: 'home.normal',
      required: true,
      source: sourcePath('other', 'home', `${formId}.png`),
      output: outputPath('home', 'normal', `${formId}.${spriteOutputExtension}`),
      resizeHome: true,
    },
    {
      key: 'home.shiny',
      required: true,
      source: sourcePath('other', 'home', 'shiny', `${formId}.png`),
      output: outputPath('home', 'shiny', `${formId}.${spriteOutputExtension}`),
      resizeHome: true,
    },
    {
      key: 'home.female',
      required: false,
      source: sourcePath('other', 'home', 'female', `${formId}.png`),
      output: outputPath('home', 'female', `${formId}.${spriteOutputExtension}`),
      resizeHome: true,
    },
    {
      key: 'home.shinyFemale',
      required: false,
      source: sourcePath('other', 'home', 'shiny', 'female', `${formId}.png`),
      output: outputPath('home', 'shiny-female', `${formId}.${spriteOutputExtension}`),
      resizeHome: true,
    },
    {
      key: 'genV.front.normal',
      required: true,
      source: sourcePath('versions', 'generation-v', 'black-white', `${formId}.png`),
      output: outputPath('gen-v', 'front', 'normal', `${formId}.${spriteOutputExtension}`),
    },
    {
      key: 'genV.front.shiny',
      required: true,
      source: sourcePath('versions', 'generation-v', 'black-white', 'shiny', `${formId}.png`),
      output: outputPath('gen-v', 'front', 'shiny', `${formId}.${spriteOutputExtension}`),
    },
    {
      key: 'genV.back.normal',
      required: true,
      source: sourcePath('versions', 'generation-v', 'black-white', 'back', `${formId}.png`),
      output: outputPath('gen-v', 'back', 'normal', `${formId}.${spriteOutputExtension}`),
    },
    {
      key: 'genV.back.shiny',
      required: true,
      source: sourcePath('versions', 'generation-v', 'black-white', 'back', 'shiny', `${formId}.png`),
      output: outputPath('gen-v', 'back', 'shiny', `${formId}.${spriteOutputExtension}`),
    },
    {
      key: 'genV.front.female',
      required: false,
      source: sourcePath('versions', 'generation-v', 'black-white', 'female', `${formId}.png`),
      output: outputPath('gen-v', 'front', 'female', `${formId}.${spriteOutputExtension}`),
    },
    {
      key: 'genV.front.shinyFemale',
      required: false,
      source: sourcePath('versions', 'generation-v', 'black-white', 'shiny', 'female', `${formId}.png`),
      output: outputPath('gen-v', 'front', 'shiny-female', `${formId}.${spriteOutputExtension}`),
    },
    {
      key: 'genV.back.female',
      required: false,
      source: sourcePath('versions', 'generation-v', 'black-white', 'back', 'female', `${formId}.png`),
      output: outputPath('gen-v', 'back', 'female', `${formId}.${spriteOutputExtension}`),
    },
    {
      key: 'genV.back.shinyFemale',
      required: false,
      source: sourcePath('versions', 'generation-v', 'black-white', 'back', 'shiny', 'female', `${formId}.png`),
      output: outputPath('gen-v', 'back', 'shiny-female', `${formId}.${spriteOutputExtension}`),
    },
  ]
}

function setManifestPath(entry, key, path) {
  const parts = key.split('.')
  if (parts[0] === 'home') {
    entry.home ??= {}
    entry.home[parts[1]] = path
    return
  }

  entry.genV ??= {}
  entry.genV[parts[1]] ??= {}
  entry.genV[parts[1]][parts[2]] = path
}

async function writeSpriteFile(definition) {
  if (!(await shouldWriteSprite(definition.source, definition.output))) {
    return false
  }

  await mkdir(dirname(definition.output), { recursive: true })

  let pipeline = sharp(definition.source)

  if (definition.resizeHome) {
    pipeline = pipeline
      .resize(homeSpriteSize, homeSpriteSize, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
  }

  await pipeline.avif({ quality: definition.resizeHome ? 70 : 85, effort: 4 }).toFile(definition.output)
  return true
}

async function mapWithConcurrency(items, concurrency, mapper) {
  const results = new Array(items.length)
  let nextIndex = 0

  const workers = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (nextIndex < items.length) {
      const currentIndex = nextIndex
      nextIndex += 1
      results[currentIndex] = await mapper(items[currentIndex])
    }
  })

  await Promise.all(workers)
  return results
}

async function syncFormSprites(form) {
  const entry = {}
  const missing = []
  const copied = []
  const requiredCopied = []
  const optionalFound = []
  let skippedExisting = 0

  for (const definition of getSpriteDefinitions(form.formId)) {
    if (await pathExists(definition.source)) {
      const wroteFile = await writeSpriteFile(definition)
      setManifestPath(entry, definition.key, publicPath(definition.output))
      copied.push(definition.output)
      if (!wroteFile) skippedExisting += 1
      if (definition.required) {
        requiredCopied.push(definition.output)
      } else {
        optionalFound.push({ ...form, sprite: definition.key })
      }
    } else if (definition.required) {
      missing.push({ ...form, sprite: definition.key })
    }
  }

  return { form, entry, missing, copied, requiredCopied, optionalFound, skippedExisting }
}

async function syncSprites(forms, args) {
  if (args.has('--clean')) {
    await rm(outputRoot, { recursive: true, force: true })
  }

  const sprites = {}
  const results = await mapWithConcurrency(forms, syncConcurrency, syncFormSprites)
  const missing = results.flatMap((result) => result.missing)
  const copied = results.flatMap((result) => result.copied)
  const requiredCopied = results.flatMap((result) => result.requiredCopied)
  const optionalFound = results.flatMap((result) => result.optionalFound)
  const skippedExisting = results.reduce((total, result) => total + result.skippedExisting, 0)

  for (const result of results) {
    sprites[result.form.formId] = result.entry
  }

  return { sprites, missing, copied, requiredCopied, optionalFound, skippedExisting }
}

async function writeManifest(sprites, missing) {
  const manifest = {
    generatedAt: new Date().toISOString(),
    source: 'https://github.com/PokeAPI/sprites',
    fallbackFormId,
    sprites,
    missing,
  }

  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
}

function formatMissingRows(missing) {
  if (missing.length === 0) return 'No required sprites are missing.\n'

  return [
    '| Form ID | Pokemon | Form | Missing sprite |',
    '| --- | --- | --- | --- |',
    ...missing.map(
      (entry) => `| ${entry.formId} | ${entry.name} | ${entry.form || 'base'} | ${entry.sprite} |`,
    ),
    '',
  ].join('\n')
}

async function writeMissingDoc({ forms, missing, requiredCopied, optionalFound, skippedExisting }) {
  const existing = existsSync(missingDocPath) ? await readFile(missingDocPath, 'utf-8') : ''
  const note = existing.includes('<!-- pokemon-sprite-sync -->')
    ? null
    : '<!-- pokemon-sprite-sync -->\n'

  const content = `${note || '<!-- pokemon-sprite-sync -->\n'}# Missing Pokemon Sprites

Generated by \`bun run sync:pokemon-sprites\`.

- Source: https://github.com/PokeAPI/sprites
- Generated at: ${new Date().toISOString()}
- Forms scanned: ${forms.length}
- Required sprites copied: ${requiredCopied.length}
- Required sprites missing: ${missing.length}
- Optional female variants copied: ${optionalFound.length}
- Existing generated files reused: ${skippedExisting}
- Fallback form: Unown (${fallbackFormId})
- Sprite output: AVIF
- HOME sprite size: ${homeSpriteSize}x${homeSpriteSize}

${formatMissingRows(missing)}`

  await mkdir(dirname(missingDocPath), { recursive: true })
  await writeFile(missingDocPath, content)
}

async function main() {
  const args = parseArgs()
  await prepareSourceRepo(args)

  if (args.has('--prepare-source-only')) return

  const forms = await loadPokemonForms()
  const result = await syncSprites(forms, args)
  await writeManifest(result.sprites, result.missing)
  await writeMissingDoc({ forms, ...result })

  console.log(
    `Synced ${result.requiredCopied.length} required sprites for ${forms.length} forms. Missing required sprites: ${result.missing.length}.`,
  )
  if (result.skippedExisting > 0) {
    console.log(`Reused ${result.skippedExisting} existing generated sprite files.`)
  }
  console.log(`Manifest: ${relative(repoRoot, manifestPath)}`)
  console.log(`Missing report: ${relative(repoRoot, missingDocPath)}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
