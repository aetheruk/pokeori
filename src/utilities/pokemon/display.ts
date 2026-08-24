import { NATURES } from '@/data/natures'

export type NatureStatEffect = 'increased' | 'decreased'

export function capitalizeFirstLetter(
  value: string | null | undefined,
): string {
  if (!value) return ''
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export function getNatureStatEffect(
  nature: string | null | undefined,
  stat: string,
): NatureStatEffect | undefined {
  const natureData = NATURES[String(nature || '').toLowerCase()]
  if (natureData?.increased === stat) return 'increased'
  if (natureData?.decreased === stat) return 'decreased'
  return undefined
}
