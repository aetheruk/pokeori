import { existsSync, readdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { allPokemon } from '../src/data/pokemon'
import formSpriteMap from '../src/data/pokemon-overworld-form-sprite-map.json'

const publicRoot = join(import.meta.dir, '../public')
const normalRoot = '/games/overworld/pokemon-pack/Graphics/Characters/Followers'
const shinyRoot = '/games/overworld/pokemon-pack/Graphics/Characters/Followers-shiny'
const output: Record<
  string,
  {
    name: string
    speciesId: number
    normal: string
    shiny?: string
    female?: string
    shinyFemale?: string
  }
> = {}
const followerAssets: Record<string, { src: string; palette: 'normal' | 'shiny' }> = {}

const filenameStem = (name: string) =>
  name
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
const exists = (url: string) => existsSync(join(publicRoot, url.replace(/^\//, '')))
const baseSpriteStemOverrides: Record<number, string> = {
  29: 'NIDORANfE',
  32: 'NIDORANmA',
}

function addPokemonFormSprite(
  params: {
    formId: string
    speciesId: number
    name: string
    stem: string
    genderDifference: boolean
    requireSheet?: boolean
  },
) {
  const { formId, speciesId, name, stem, genderDifference, requireSheet = true } = params
  const normal = `${normalRoot}/${stem}.png`
  if (!exists(normal) && requireSheet) {
    throw new Error(`Mapped Pokémon follower sheet is missing: ${stem}.png (${formId})`)
  }
  if (!exists(normal)) return

  const shiny = `${shinyRoot}/${stem}.png`
  const female = `${normalRoot}/${stem}_female.png`
  const shinyFemale = `${shinyRoot}/${stem}_female.png`
  output[formId] = {
    name,
    speciesId,
    normal,
    ...(exists(shiny) ? { shiny } : {}),
    ...(genderDifference && exists(female) ? { female } : {}),
    ...(genderDifference && exists(shinyFemale) ? { shinyFemale } : {}),
  }
}

for (const species of allPokemon) {
  const form = species.forms.find((entry) => entry.form === 'base') || species.forms[0]
  if (!form || form.id !== String(species.id)) continue

  const stem = baseSpriteStemOverrides[species.id] || filenameStem(form.name)
  addPokemonFormSprite({
    formId: form.id,
    speciesId: species.id,
    name: form.name,
    stem,
    genderDifference: species.has_gender_differences,
    requireSheet: false,
  })

  for (const alternateForm of species.forms) {
    if (alternateForm.id === form.id) continue
    const alternateStem = (formSpriteMap as Record<string, string>)[alternateForm.id]
    if (!alternateStem) continue
    addPokemonFormSprite({
      formId: alternateForm.id,
      speciesId: species.id,
      name: alternateForm.name,
      stem: alternateStem,
      genderDifference: species.has_gender_differences,
    })
  }
}

const registeredFormIds = new Set(allPokemon.flatMap((species) => species.forms.map((form) => form.id)))
for (const formId of Object.keys(formSpriteMap)) {
  if (!registeredFormIds.has(formId)) {
    throw new Error(`Mapped follower sprite references unknown Pokémon form: ${formId}`)
  }
}

for (const [folder, palette] of [
  ['Followers', 'normal'],
  ['Followers-shiny', 'shiny'],
] as const) {
  const root = join(publicRoot, 'games/overworld/pokemon-pack/Graphics/Characters', folder)
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.toLowerCase().endsWith('.png')) continue
    const stem = entry.name.replace(/\.png$/i, '')
    followerAssets[`pokemon-follower-${palette}:${stem}`] = {
      src: `/games/overworld/pokemon-pack/Graphics/Characters/${folder}/${entry.name}`,
      palette,
    }
  }
}

writeFileSync(
  join(import.meta.dir, '../src/data/pokemon-overworld-sprite-manifest.json'),
  `${JSON.stringify(output, null, 2)}\n`,
)
console.info(`Registered ${Object.keys(output).length} verified Pokémon form sheets.`)
writeFileSync(
  join(import.meta.dir, '../src/data/pokemon-overworld-follower-assets.json'),
  `${JSON.stringify(followerAssets, null, 2)}\n`,
)
console.info(`Registered ${Object.keys(followerAssets).length} source follower assets.`)
