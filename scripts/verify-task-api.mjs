const BASE_URL = 'https://pokemon.theaether.co.uk/api'

async function checkTask() {
  try {
    const response = await fetch(`${BASE_URL}/game-tasks?limit=1000&depth=0`)
    const data = await response.json()
    const task = data.docs.find((t) => t.name === 'Adventure Awaits!')

    if (task) {
      console.log('Task found:', task.name, task.id)
      console.log('Criteria:', JSON.stringify(task.criteria, null, 2))
    } else {
      console.log('Task not found')
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

checkTask()
