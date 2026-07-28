import { STATUS_EFFECTS } from '@/data/moves/entries/status-effects'

const STATUS_CHIP_CLASSES: Record<string, string> = {
  burn: 'border-red-950/25 bg-red-700 text-white',
  poison: 'border-purple-950/25 bg-purple-700 text-white',
  'bad-poison': 'border-purple-950/35 bg-purple-900 text-white',
  paralysis: 'border-amber-700/30 bg-amber-300 text-slate-950',
  sleep: 'border-slate-950/25 bg-slate-700 text-white',
  freeze: 'border-cyan-800/25 bg-cyan-200 text-cyan-950',
  frostbite: 'border-blue-800/25 bg-blue-200 text-blue-950',
  confusion: 'border-pink-800/25 bg-pink-300 text-pink-950',
  veil: 'border-fuchsia-800/20 bg-fuchsia-200 text-fuchsia-950',
  regen: 'border-emerald-800/25 bg-emerald-200 text-emerald-950',
  'mystic-veil': 'border-indigo-800/25 bg-indigo-200 text-indigo-950',
  shield: 'border-slate-700/25 bg-slate-200 text-slate-950',
  'shield-plus': 'border-slate-950/25 bg-slate-500 text-white',
  'shield-ex': 'border-slate-950/35 bg-slate-800 text-white',
}

export function getBattleStatusChip(statusId: string): {
  className: string
  label: string
} {
  return {
    className:
      STATUS_CHIP_CLASSES[statusId] ||
      'border-game-night-border bg-game-night-surface text-game-night-ink',
    label:
      STATUS_EFFECTS[statusId]?.name ||
      statusId
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (letter) => letter.toUpperCase()),
  }
}
