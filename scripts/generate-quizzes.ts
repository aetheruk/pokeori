import { $ } from 'bun'
import { parseArgs } from 'util'
import fs from 'fs/promises'
import path from 'path'

// Quiz generation script using Google Gemini CLI
// Usage: bun scripts/generate-quizzes.ts --start=1 --limit=10 --override=true

const { values } = parseArgs({
  args: Bun.argv,
  options: {
    start: {
      type: 'string',
      default: '1',
    },
    limit: {
      type: 'string',
      default: '10',
    },
    override: {
      type: 'boolean',
      default: true,
    },
  },
  strict: true,
  allowPositionals: true,
})

async function generateQuiz(pokemonId: number, override: boolean) {
  const filePath = path.join(process.cwd(), `src/data/quiz/${pokemonId}.ts`)

  // Check if file exists and we shouldn't override
  if (!override) {
    try {
      await fs.access(filePath)
      console.log(`Quiz for Pokemon #${pokemonId} already exists. Skipping...`)
      return
    } catch {
      // File doesn't exist, proceed
    }
  }

  console.log(`Generating quiz for Pokemon #${pokemonId}...`)

  const prompt = `
You are an expert on the Pokemon franchise.
Create a set of exactly 20 well-rounded, dynamic, and challenging quiz questions about National Dex #${pokemonId}.
Use your full knowledge of Pokemon and internet search to include questions about this Pokemon from ANY part of the media franchise including the video games, TCG, anime, manga, merchandise, spin-offs, and lore.

IMPORTANT: The in-game UI has very limited space. You MUST keep the questions and answers extremely short and punchy. Reword questions to be as brief as possible (e.g., "Bulbasaur's Hidden Ability?" instead of "What is the Hidden Ability of the Pokemon Bulbasaur?"). Keep answer options brief (1-3 words max).
Every question MUST have exactly 4 options, unless it is a True/False question.

Output ONLY valid JSON matching this TypeScript type:
type QuizQuestion = {
  id: string; // e.g. "q1", "q2"
  question: string; // EXTREMELY SHORT AND PUNCHY
  options: string[]; // exactly 4 options (unless True/False), SHORT (1-3 words max)
  correctAnswer: string; // must exactly match one of the options
}
Output a JSON array of exactly 20 QuizQuestion objects. Do not include markdown formatting like \`\`\`json or anything else outside the JSON array.
`

  try {
    let jsonStr = ''
    let retries = 0
    let usePro = false

    while (retries < 5) {
      const args = ['gemini', '-p', prompt]
      if (usePro) {
        args.push('--model', 'gemini-3.1-pro')
      }

      const proc = Bun.spawn(args)

      const [stdout, stderr] = await Promise.all([
        new Response(proc.stdout).text(),
        new Response(proc.stderr).text(),
      ])

      const exitCode = await proc.exited

      if (exitCode !== 0 || stderr.includes('429') || stdout.includes('429')) {
        const delay = Math.pow(2, retries) * 2000
        console.warn(
          `[!] CLI error or rate limit for #${pokemonId}. Retrying in ${delay / 1000}s... ${usePro ? '(Using Pro)' : '(Using Flash)'}\n${stderr || stdout}`,
        )

        // If we fail twice with Flash, switch to Pro
        if (retries >= 1) {
          usePro = true
        }

        await Bun.sleep(delay)
        retries++
        continue
      }

      jsonStr = stdout
      break // Success
    }

    if (!jsonStr) {
      throw new Error(`CLI request failed after retries`)
    }

    // Clean up the output in case there's extra text or markdown
    const jsonStart = jsonStr.indexOf('[')
    const jsonEnd = jsonStr.lastIndexOf(']')

    if (jsonStart !== -1 && jsonEnd !== -1) {
      jsonStr = jsonStr.substring(jsonStart, jsonEnd + 1)
    }

    try {
      const parsed = JSON.parse(jsonStr)
      if (!Array.isArray(parsed) || parsed.length === 0) {
        throw new Error('Output is not a valid JSON array')
      }

      const fileContent = `import type { QuizQuestion } from './types'

const questions: QuizQuestion[] = ${JSON.stringify(parsed, null, 2)}

export default questions
`

      await fs.writeFile(filePath, fileContent, 'utf-8')
      console.log(`✅ Successfully generated and saved quiz for Pokemon #${pokemonId}`)
    } catch (parseError) {
      console.error(`❌ Failed to parse JSON for Pokemon #${pokemonId}:`, parseError)
      console.error('Raw output:', jsonStr)
    }
  } catch (error) {
    console.error(`❌ Error generating quiz for Pokemon #${pokemonId}:`, error)
  }
}

async function main() {
  const start = parseInt(values.start as string, 10) || 1
  const limit = parseInt(values.limit as string, 10) || 10
  const override = values.override ?? true

  console.log(
    `Starting quiz generation from #${start}, limit ${limit}, override: ${override} (Sequential processing)`,
  )

  for (let i = 0; i < limit; i++) {
    const currentId = start + i
    await generateQuiz(currentId, override)

    // Specific delay to avoid hitting rate limits too hard (Gemini free tier is 15 RPM = 4s per request)
    // We increase this to 4.5s to be a bit safer.
    if (i < limit - 1) {
      await Bun.sleep(4500)
    }
  }

  console.log('Quiz generation complete!')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
