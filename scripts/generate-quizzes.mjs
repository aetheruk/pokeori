import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const SOURCE_DIR = path.join(__dirname, '../source_data/pokemon')
const OUTPUT_DIR = path.join(__dirname, '../src/data/quiz')

// Helper to read JSON
const readJson = (filename) => {
  const data = fs.readFileSync(path.join(SOURCE_DIR, filename), 'utf-8')
  return JSON.parse(data)
}

console.log('Loading data...')

const pokemon = readJson('pokemon.json')
const speciesNames = readJson('pokemon_species_names.json')
const speciesFlavorText = readJson('pokemon_species_flavor_text.json')
const pokemonStats = readJson('pokemon_stats.json')
const statNames = readJson('stat_names.json')
const pokemonTypes = readJson('pokemon_types.json')
const typeNames = readJson('type_names.json')
const pokemonAbilities = readJson('pokemon_abilities.json')
const abilityNames = readJson('ability_names.json')
const species = readJson('pokemon_species.json')
const pokemonColorNames = readJson('pokemon_color_names.json')
const pokemonHabitatNames = readJson('pokemon_habitat_names.json')
const pokemonShapeProse = readJson('pokemon_shape_prose.json')
const pokemonEggGroups = readJson('pokemon_egg_groups.json')
const eggGroupProse = readJson('egg_group_prose.json')

console.log('Data loaded.')

const LANGUAGE_ID = '9' // English

// Helper to get English name
const getEnglishName = (collection, idField, id) => {
  const item = collection.find((i) => i[idField] === id && i.local_language_id === LANGUAGE_ID)
  return item ? item.name : null
}

// Helper to get Type Name
const getTypeName = (typeId) => {
  return getEnglishName(typeNames, 'type_id', typeId)
}

// Helper to get Stat Name
const getStatName = (statId) => {
  return getEnglishName(statNames, 'stat_id', statId)
}

// Helper to get Ability Name
const getAbilityName = (abilityId) => {
  return getEnglishName(abilityNames, 'ability_id', abilityId)
}

// Helper to get Pokemon Name
const getPokemonName = (speciesId) => {
  return getEnglishName(speciesNames, 'pokemon_species_id', speciesId)
}

// Helper to get Color Name
const getColorName = (colorId) => {
  return getEnglishName(pokemonColorNames, 'pokemon_color_id', colorId)
}

// Helper to get Habitat Name
const getHabitatName = (habitatId) => {
  return getEnglishName(pokemonHabitatNames, 'pokemon_habitat_id', habitatId)
}

// Helper to get Shape Name
const getShapeName = (shapeId) => {
  return getEnglishName(pokemonShapeProse, 'pokemon_shape_id', shapeId)
}

// Helper to get Egg Group Name
const getEggGroupName = (eggGroupId) => {
  return getEnglishName(eggGroupProse, 'egg_group_id', eggGroupId)
}

// Helper to shuffle array
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

// Generate questions for a Pokemon
const generateQuestions = (pokeId) => {
  const pId = pokeId.toString()
  const pData = pokemon.find((p) => p.id === pId)
  const sData = species.find((s) => s.id === pId)
  const name = getPokemonName(pId)

  if (!pData || !name) return []

  const questions = []
  let qCount = 1

  // 1. Type Question
  const pTypes = pokemonTypes.filter((pt) => pt.pokemon_id === pId)
  const typeNamesList = pTypes.map((pt) => getTypeName(pt.type_id))
  const correctType = typeNamesList.join('/')

  // Generate wrong options
  const allTypes = typeNames.filter((t) => t.local_language_id === LANGUAGE_ID).map((t) => t.name)
  const wrongTypes = []
  while (wrongTypes.length < 3) {
    const t = allTypes[Math.floor(Math.random() * allTypes.length)]
    if (t !== correctType && !typeNamesList.includes(t) && !wrongTypes.includes(t)) {
      wrongTypes.push(t)
    }
  }

  questions.push({
    id: `q${qCount++}`,
    question: `What type is ${name}?`,
    options: shuffle([correctType, ...wrongTypes]),
    correctAnswer: correctType,
  })

  // 2. Category Question
  const genusEntry = speciesNames.find(
    (sn) => sn.pokemon_species_id === pId && sn.local_language_id === LANGUAGE_ID,
  )
  if (genusEntry && genusEntry.genus) {
    const correctGenus = genusEntry.genus
    const wrongGenera = []
    // Pick random genera from other pokemon
    while (wrongGenera.length < 3) {
      const randomId = Math.floor(Math.random() * 1025) + 1
      const rEntry = speciesNames.find(
        (sn) =>
          sn.pokemon_species_id === randomId.toString() && sn.local_language_id === LANGUAGE_ID,
      )
      if (
        rEntry &&
        rEntry.genus &&
        rEntry.genus !== correctGenus &&
        !wrongGenera.includes(rEntry.genus)
      ) {
        wrongGenera.push(rEntry.genus)
      }
    }
    questions.push({
      id: `q${qCount++}`,
      question: `What is ${name}'s category?`,
      options: shuffle([correctGenus, ...wrongGenera]),
      correctAnswer: correctGenus,
    })
  }

  // 3. Ability Question
  const pAbilities = pokemonAbilities.filter((pa) => pa.pokemon_id === pId && pa.is_hidden === '0')
  if (pAbilities.length > 0) {
    const correctAbilityId = pAbilities[0].ability_id
    const correctAbility = getAbilityName(correctAbilityId)

    const wrongAbilities = []
    const allAbilities = abilityNames
      .filter((a) => a.local_language_id === LANGUAGE_ID)
      .map((a) => a.name)
    while (wrongAbilities.length < 3) {
      const a = allAbilities[Math.floor(Math.random() * allAbilities.length)]
      if (a !== correctAbility && !wrongAbilities.includes(a)) {
        wrongAbilities.push(a)
      }
    }

    questions.push({
      id: `q${qCount++}`,
      question: `Which of these is a ${name} Ability?`,
      options: shuffle([correctAbility, ...wrongAbilities]),
      correctAnswer: correctAbility,
    })
  }

  // 4. Base Stat Question (Highest Stat)
  const pStats = pokemonStats.filter((ps) => ps.pokemon_id === pId)
  if (pStats.length > 0) {
    // Find highest stat
    let maxStat = pStats[0]
    for (const s of pStats) {
      if (parseInt(s.base_stat) > parseInt(maxStat.base_stat)) {
        maxStat = s
      }
    }
    const correctStatName = getStatName(maxStat.stat_id)

    // Get other stat names
    const otherStats = pStats
      .filter((s) => s.stat_id !== maxStat.stat_id)
      .map((s) => getStatName(s.stat_id))
    const wrongOptions = shuffle(otherStats).slice(0, 3)

    questions.push({
      id: `q${qCount++}`,
      question: `Which is ${name}'s highest base stat?`,
      options: shuffle([correctStatName, ...wrongOptions]),
      correctAnswer: correctStatName,
    })
  }

  // 5. Evolution Question (Evolves Into)
  // Find species that evolve FROM this pokemon
  const evolutions = species.filter((s) => s.evolves_from_species_id === pId)
  if (evolutions.length > 0) {
    const targetSpecies = evolutions[0]
    const correctEvoName = getPokemonName(targetSpecies.id)

    const wrongEvos = []
    while (wrongEvos.length < 3) {
      const randomId = Math.floor(Math.random() * 1025) + 1
      const rName = getPokemonName(randomId.toString())
      if (rName && rName !== correctEvoName && rName !== name && !wrongEvos.includes(rName)) {
        wrongEvos.push(rName)
      }
    }

    questions.push({
      id: `q${qCount++}`,
      question: `What does ${name} evolve into?`,
      options: shuffle([correctEvoName, ...wrongEvos]),
      correctAnswer: correctEvoName,
    })
  }

  // 6. Pre-evolution Question (Evolves From)
  if (sData.evolves_from_species_id) {
    const prevId = sData.evolves_from_species_id
    const correctPrevName = getPokemonName(prevId)

    const wrongPrevs = []
    while (wrongPrevs.length < 3) {
      const randomId = Math.floor(Math.random() * 1025) + 1
      const rName = getPokemonName(randomId.toString())
      if (rName && rName !== correctPrevName && rName !== name && !wrongPrevs.includes(rName)) {
        wrongPrevs.push(rName)
      }
    }

    questions.push({
      id: `q${qCount++}`,
      question: `What does ${name} evolve from?`,
      options: shuffle([correctPrevName, ...wrongPrevs]),
      correctAnswer: correctPrevName,
    })
  }

  // 7. Flavor Text Question
  const flavors = speciesFlavorText.filter(
    (ft) =>
      ft.pokemon_species_id === pId && ft.language_id === LANGUAGE_ID && ft.version_id === '1',
  ) // Red version
  if (flavors.length > 0) {
    // Pick one
    const flavor = flavors[0].flavor_text.replace(/\n/g, ' ').replace(/\f/g, ' ')

    const wrongFlavors = []
    while (wrongFlavors.length < 3) {
      const randomId = Math.floor(Math.random() * 1025) + 1
      if (randomId.toString() === pId) continue

      const rFlavors = speciesFlavorText.filter(
        (ft) =>
          ft.pokemon_species_id === randomId.toString() &&
          ft.language_id === LANGUAGE_ID &&
          ft.version_id === '1',
      )
      if (rFlavors.length > 0) {
        const rFlavor = rFlavors[0].flavor_text.replace(/\n/g, ' ').replace(/\f/g, ' ')
        // Ensure it doesn't contain the target pokemon name
        if (!rFlavor.toLowerCase().includes(name.toLowerCase())) {
          wrongFlavors.push(rFlavor)
        }
      }
    }

    if (wrongFlavors.length === 3) {
      questions.push({
        id: `q${qCount++}`,
        question: `Which Pokedex entry describes ${name}?`,
        options: shuffle([flavor, ...wrongFlavors]),
        correctAnswer: flavor,
      })
    }
  }

  // 8. Color Question
  if (sData.color_id) {
    const correctColor = getColorName(sData.color_id)
    if (correctColor) {
      const wrongColors = []
      const allColors = pokemonColorNames
        .filter((c) => c.local_language_id === LANGUAGE_ID)
        .map((c) => c.name)

      while (wrongColors.length < 3) {
        const c = allColors[Math.floor(Math.random() * allColors.length)]
        if (c !== correctColor && !wrongColors.includes(c)) {
          wrongColors.push(c)
        }
      }

      questions.push({
        id: `q${qCount++}`,
        question: `What color is ${name}?`,
        options: shuffle([correctColor, ...wrongColors]),
        correctAnswer: correctColor,
      })
    }
  }

  // 9. Habitat Question
  if (sData.habitat_id) {
    const correctHabitat = getHabitatName(sData.habitat_id)
    if (correctHabitat) {
      const wrongHabitats = []
      const allHabitats = pokemonHabitatNames
        .filter((h) => h.local_language_id === LANGUAGE_ID)
        .map((h) => h.name)

      while (wrongHabitats.length < 3) {
        const h = allHabitats[Math.floor(Math.random() * allHabitats.length)]
        if (h !== correctHabitat && !wrongHabitats.includes(h)) {
          wrongHabitats.push(h)
        }
      }

      questions.push({
        id: `q${qCount++}`,
        question: `What is the habitat of ${name}?`,
        options: shuffle([correctHabitat, ...wrongHabitats]),
        correctAnswer: correctHabitat,
      })
    }
  }

  // 10. Shape Question
  if (sData.shape_id) {
    const correctShape = getShapeName(sData.shape_id)
    if (correctShape) {
      const wrongShapes = []
      const allShapes = pokemonShapeProse
        .filter((s) => s.local_language_id === LANGUAGE_ID)
        .map((s) => s.name)

      while (wrongShapes.length < 3) {
        const s = allShapes[Math.floor(Math.random() * allShapes.length)]
        if (s !== correctShape && !wrongShapes.includes(s)) {
          wrongShapes.push(s)
        }
      }

      questions.push({
        id: `q${qCount++}`,
        question: `What is the body shape of ${name}?`,
        options: shuffle([correctShape, ...wrongShapes]),
        correctAnswer: correctShape,
      })
    }
  }

  // 11. Egg Group Question
  const pEggGroups = pokemonEggGroups.filter((peg) => peg.species_id === pId)
  if (pEggGroups.length > 0) {
    const correctEggGroupId = pEggGroups[0].egg_group_id
    const correctEggGroup = getEggGroupName(correctEggGroupId)

    if (correctEggGroup) {
      const wrongEggGroups = []
      const allEggGroups = eggGroupProse
        .filter((eg) => eg.local_language_id === LANGUAGE_ID)
        .map((eg) => eg.name)

      while (wrongEggGroups.length < 3) {
        const eg = allEggGroups[Math.floor(Math.random() * allEggGroups.length)]
        if (eg !== correctEggGroup && !wrongEggGroups.includes(eg)) {
          wrongEggGroups.push(eg)
        }
      }

      questions.push({
        id: `q${qCount++}`,
        question: `Which Egg Group does ${name} belong to?`,
        options: shuffle([correctEggGroup, ...wrongEggGroups]),
        correctAnswer: correctEggGroup,
      })
    }
  }

  return questions
}

// Main loop
const generatedIds = []

for (let i = 1; i <= 1025; i++) {
  const questions = generateQuestions(i)
  if (questions.length > 0) {
    const fileContent = `import type { QuizQuestion } from './types'

const questions: QuizQuestion[] = ${JSON.stringify(questions, null, 2)}

export default questions
`
    fs.writeFileSync(path.join(OUTPUT_DIR, `${i}.ts`), fileContent)
    generatedIds.push(i)
    console.log(`Generated quiz for #${i}`)
  }
}

// Update index.ts
let indexContent = `import type { QuizQuestion } from './types'\n\n`
generatedIds.forEach((id) => {
  indexContent += `import q${id} from './${id}'\n`
})

indexContent += `\nexport type { QuizQuestion }\n\n`
indexContent += `export const quizzes: Record<string, QuizQuestion[]> = {\n`
generatedIds.forEach((id) => {
  indexContent += `  '${id}': q${id},\n`
})
indexContent += `}\n\n`
indexContent += `export function getQuizData(pokemonId: number | string): QuizQuestion[] | null {\n`
indexContent += `  return quizzes[pokemonId.toString()] || null\n`
indexContent += `}\n`

fs.writeFileSync(path.join(OUTPUT_DIR, 'index.ts'), indexContent)
console.log('Updated index.ts')
