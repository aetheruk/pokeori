import { KANTO_GYM_CHRONICLE_STORIES } from '../src/data/gym-leader-chronicle-stories'
import {
  KANTO_GYM_CHRONICLES,
  type KantoGymChronicleKey,
} from '../src/data/gym-leader-chronicles'

const requestedLeader = process.argv
  .find((argument) => argument.startsWith('--leader='))
  ?.slice('--leader='.length)

const isChronicleKey = (value: string): value is KantoGymChronicleKey =>
  value in KANTO_GYM_CHRONICLE_STORIES

if (requestedLeader && !isChronicleKey(requestedLeader)) {
  throw new Error(
    `Unknown Chronicle leader "${requestedLeader}". Expected one of: ${Object.keys(KANTO_GYM_CHRONICLE_STORIES).join(', ')}`,
  )
}

const chronicles = requestedLeader
  ? KANTO_GYM_CHRONICLES.filter(
      (chronicle) => chronicle.key === requestedLeader,
    )
  : KANTO_GYM_CHRONICLES

for (const chronicle of chronicles) {
  const story = KANTO_GYM_CHRONICLE_STORIES[chronicle.key]

  console.log(`\n${chronicle.leaderName}: ${chronicle.title}`)
  console.log(
    '='.repeat(chronicle.leaderName.length + chronicle.title.length + 2),
  )

  story.sequence.forEach((beat, index) => {
    const number = String(index + 1).padStart(2, '0')

    if (beat.type === 'scene') {
      console.log(`\n${number} SCENE: ${beat.title}`)
      for (const panel of beat.panels) {
        const speaker =
          panel.kind === 'narration' ? 'Narration' : panel.speaker.name
        console.log(`  [${speaker}] ${panel.message}`)
      }
      return
    }

    console.log(`\n${number} ${beat.type.toUpperCase()}: ${beat.id}`)
  })
}
