type DailyTaskTitleInput = {
  name: string
  dailyMetadata?: { family?: string } | null
}

export function getDailyTaskTitle(task: DailyTaskTitleInput): string {
  if (
    task.dailyMetadata?.family === 'field-research' &&
    task.name.startsWith('Complete ')
  ) {
    return `Research ${task.name.slice('Complete '.length)}`
  }

  return task.name
}
