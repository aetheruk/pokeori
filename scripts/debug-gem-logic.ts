import { palletTownBattles } from '../src/data/battles/entries/pallet-town'
import { calculateGemRewards } from '../src/utilities/rewards/gem-logic'
import { grantRewards } from '../src/utilities/rewards/reward-logic'

async function runDebug() {
  const battleConfig = palletTownBattles.find((b) => b.id === 'route-1-battle')
  if (!battleConfig) {
    console.error('Route 1 battle not found')
    return
  }

  console.log('Config found:', JSON.stringify(battleConfig.gemConfig, null, 2))

  // Mock types for Pidgey
  const types = ['Normal', 'Flying']

  console.log('Simulating 100 drops...')
  let drops = 0

  for (let i = 0; i < 100; i++) {
    const rewards = calculateGemRewards(battleConfig, types)
    if (rewards.length > 0) {
      // Simulate grantRewards check
      const reward = rewards[0]
      const dropChance = reward.dropChance ?? 100
      if (dropChance < 100) {
        if (Math.random() * 100 <= dropChance) {
          drops++
        }
      } else {
        drops++
      }
    }
  }

  console.log(`Drops: ${drops}/100`)
}

runDebug().catch(console.error)
