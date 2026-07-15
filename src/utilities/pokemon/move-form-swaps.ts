import {
  normalizeAssignedMoveIds,
  type AssignedMoveInput,
} from './pokemon-moves'

const KELDEO_SPECIES_ID = 647
const KELDEO_BASE_FORM_ID = '647'
const KELDEO_RESOLUTE_FORM_ID = '10024'
const KELDEO_FORM_IDS = new Set([KELDEO_BASE_FORM_ID, KELDEO_RESOLUTE_FORM_ID])
const SACRED_SWORD_MOVE_ID = 'sacred-sword'

const MELOETTA_SPECIES_ID = 648
const MELOETTA_BASE_FORM_ID = '648'
const MELOETTA_PIROUETTE_FORM_ID = '10018'
const MELOETTA_FORM_IDS = new Set([
  MELOETTA_BASE_FORM_ID,
  MELOETTA_PIROUETTE_FORM_ID,
])
const RELIC_SONG_MOVE_ID = 'relic-song'

export function resolveAssignedMoveFormId({
  speciesId,
  currentFormId,
  assignedMoves,
}: {
  speciesId: number | null | undefined
  currentFormId: string | null | undefined
  assignedMoves: AssignedMoveInput
}): string {
  const formId = currentFormId || String(speciesId || '')

  if (speciesId === KELDEO_SPECIES_ID || KELDEO_FORM_IDS.has(formId)) {
    return normalizeAssignedMoveIds(assignedMoves).includes(
      SACRED_SWORD_MOVE_ID,
    )
      ? KELDEO_RESOLUTE_FORM_ID
      : KELDEO_BASE_FORM_ID
  }

  if (speciesId === MELOETTA_SPECIES_ID || MELOETTA_FORM_IDS.has(formId)) {
    return normalizeAssignedMoveIds(assignedMoves).includes(RELIC_SONG_MOVE_ID)
      ? MELOETTA_PIROUETTE_FORM_ID
      : MELOETTA_BASE_FORM_ID
  }

  return formId
}
