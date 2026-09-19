import type { PowersState } from './types'

export const POWER_STANCE_WIN_COST = 3

export function getStanceWinCharges(powers: PowersState | undefined): number {
  return Math.max(0, powers?.stanceWinCharges ?? 0)
}

export function awardStanceWin(powers: PowersState | undefined): void {
  if (powers) powers.stanceWinCharges = getStanceWinCharges(powers) + 1
}

export function spendPowerCharge(powers: PowersState | undefined): boolean {
  if (!powers || getStanceWinCharges(powers) < POWER_STANCE_WIN_COST)
    return false
  powers.stanceWinCharges = getStanceWinCharges(powers) - POWER_STANCE_WIN_COST
  return true
}
