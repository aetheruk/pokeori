import { describe, expect, test } from 'bun:test'
import {
  getTcgSeriesInReleaseOrder,
  sortTcgSetsByReleaseDate,
} from '@/utilities/tcg/set-order'

const sets = [
  {
    id: 'later',
    name: 'Later',
    series: 'Later Series',
    releaseDate: '2001/01/01',
  },
  {
    id: 'first',
    name: 'First',
    series: 'First Series',
    releaseDate: '1999/01/01',
  },
  {
    id: 'middle',
    name: 'Middle',
    series: 'First Series',
    releaseDate: '2000/01/01',
  },
  {
    id: 'undated',
    name: 'Undated',
    series: 'Undated Series',
    releaseDate: null,
  },
]

describe('TCG set ordering', () => {
  test('orders expansions chronologically and leaves undated sets last', () => {
    expect(sortTcgSetsByReleaseDate(sets).map((set) => set.id)).toEqual([
      'first',
      'middle',
      'later',
      'undated',
    ])
  })

  test('orders deck series by the release date of each series first set', () => {
    expect(getTcgSeriesInReleaseOrder(sets)).toEqual([
      'First Series',
      'Later Series',
      'Undated Series',
    ])
  })
})
