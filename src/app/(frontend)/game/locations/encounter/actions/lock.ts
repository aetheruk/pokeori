export const ENCOUNTER_MECHANICS_LOCK_TTL = 10

export function getEncounterMechanicsLockKey(userId: string): string {
  return `lock:encounter:mechanics:${userId}`
}
