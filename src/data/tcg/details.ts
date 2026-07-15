import type { TcgCardDetail } from './types'

export async function getTcgSetDetailsById(setId: string): Promise<TcgCardDetail[] | null> {
  switch (setId) {
    case 'base1':
      return (await import('./details/base1')).default
    case 'base2':
      return (await import('./details/base2')).default
    case 'base3':
      return (await import('./details/base3')).default
    case 'base4':
      return (await import('./details/base4')).default
    case 'base5':
      return (await import('./details/base5')).default
    case 'base6':
      return (await import('./details/base6')).default
    case 'basep':
      return (await import('./details/basep')).default
    case 'bp':
      return (await import('./details/bp')).default
    case 'bw1':
      return (await import('./details/bw1')).default
    case 'bw10':
      return (await import('./details/bw10')).default
    case 'bw11':
      return (await import('./details/bw11')).default
    case 'bw2':
      return (await import('./details/bw2')).default
    case 'bw3':
      return (await import('./details/bw3')).default
    case 'bw4':
      return (await import('./details/bw4')).default
    case 'bw5':
      return (await import('./details/bw5')).default
    case 'bw6':
      return (await import('./details/bw6')).default
    case 'bw7':
      return (await import('./details/bw7')).default
    case 'bw8':
      return (await import('./details/bw8')).default
    case 'bw9':
      return (await import('./details/bw9')).default
    case 'bwp':
      return (await import('./details/bwp')).default
    case 'cel25':
      return (await import('./details/cel25')).default
    case 'cel25c':
      return (await import('./details/cel25c')).default
    case 'col1':
      return (await import('./details/col1')).default
    case 'dc1':
      return (await import('./details/dc1')).default
    case 'det1':
      return (await import('./details/det1')).default
    case 'dp1':
      return (await import('./details/dp1')).default
    case 'dp2':
      return (await import('./details/dp2')).default
    case 'dp3':
      return (await import('./details/dp3')).default
    case 'dp4':
      return (await import('./details/dp4')).default
    case 'dp5':
      return (await import('./details/dp5')).default
    case 'dp6':
      return (await import('./details/dp6')).default
    case 'dp7':
      return (await import('./details/dp7')).default
    case 'dpp':
      return (await import('./details/dpp')).default
    case 'dv1':
      return (await import('./details/dv1')).default
    case 'ecard1':
      return (await import('./details/ecard1')).default
    case 'ecard2':
      return (await import('./details/ecard2')).default
    case 'ecard3':
      return (await import('./details/ecard3')).default
    case 'ex1':
      return (await import('./details/ex1')).default
    case 'ex10':
      return (await import('./details/ex10')).default
    case 'ex11':
      return (await import('./details/ex11')).default
    case 'ex12':
      return (await import('./details/ex12')).default
    case 'ex13':
      return (await import('./details/ex13')).default
    case 'ex14':
      return (await import('./details/ex14')).default
    case 'ex15':
      return (await import('./details/ex15')).default
    case 'ex16':
      return (await import('./details/ex16')).default
    case 'ex2':
      return (await import('./details/ex2')).default
    case 'ex3':
      return (await import('./details/ex3')).default
    case 'ex4':
      return (await import('./details/ex4')).default
    case 'ex5':
      return (await import('./details/ex5')).default
    case 'ex6':
      return (await import('./details/ex6')).default
    case 'ex7':
      return (await import('./details/ex7')).default
    case 'ex8':
      return (await import('./details/ex8')).default
    case 'ex9':
      return (await import('./details/ex9')).default
    case 'fut20':
      return (await import('./details/fut20')).default
    case 'g1':
      return (await import('./details/g1')).default
    case 'gym1':
      return (await import('./details/gym1')).default
    case 'gym2':
      return (await import('./details/gym2')).default
    case 'hgss1':
      return (await import('./details/hgss1')).default
    case 'hgss2':
      return (await import('./details/hgss2')).default
    case 'hgss3':
      return (await import('./details/hgss3')).default
    case 'hgss4':
      return (await import('./details/hgss4')).default
    case 'hsp':
      return (await import('./details/hsp')).default
    case 'mcd11':
      return (await import('./details/mcd11')).default
    case 'mcd12':
      return (await import('./details/mcd12')).default
    case 'mcd14':
      return (await import('./details/mcd14')).default
    case 'mcd15':
      return (await import('./details/mcd15')).default
    case 'mcd16':
      return (await import('./details/mcd16')).default
    case 'mcd17':
      return (await import('./details/mcd17')).default
    case 'mcd18':
      return (await import('./details/mcd18')).default
    case 'mcd19':
      return (await import('./details/mcd19')).default
    case 'mcd21':
      return (await import('./details/mcd21')).default
    case 'mcd22':
      return (await import('./details/mcd22')).default
    case 'me1':
      return (await import('./details/me1')).default
    case 'me2':
      return (await import('./details/me2')).default
    case 'me2pt5':
      return (await import('./details/me2pt5')).default
    case 'me3':
      return (await import('./details/me3')).default
    case 'me4':
      return (await import('./details/me4')).default
    case 'neo1':
      return (await import('./details/neo1')).default
    case 'neo2':
      return (await import('./details/neo2')).default
    case 'neo3':
      return (await import('./details/neo3')).default
    case 'neo4':
      return (await import('./details/neo4')).default
    case 'np':
      return (await import('./details/np')).default
    case 'pgo':
      return (await import('./details/pgo')).default
    case 'pl1':
      return (await import('./details/pl1')).default
    case 'pl2':
      return (await import('./details/pl2')).default
    case 'pl3':
      return (await import('./details/pl3')).default
    case 'pl4':
      return (await import('./details/pl4')).default
    case 'pop1':
      return (await import('./details/pop1')).default
    case 'pop2':
      return (await import('./details/pop2')).default
    case 'pop3':
      return (await import('./details/pop3')).default
    case 'pop4':
      return (await import('./details/pop4')).default
    case 'pop5':
      return (await import('./details/pop5')).default
    case 'pop6':
      return (await import('./details/pop6')).default
    case 'pop7':
      return (await import('./details/pop7')).default
    case 'pop8':
      return (await import('./details/pop8')).default
    case 'pop9':
      return (await import('./details/pop9')).default
    case 'rsv10pt5':
      return (await import('./details/rsv10pt5')).default
    case 'ru1':
      return (await import('./details/ru1')).default
    case 'si1':
      return (await import('./details/si1')).default
    case 'sm1':
      return (await import('./details/sm1')).default
    case 'sm10':
      return (await import('./details/sm10')).default
    case 'sm11':
      return (await import('./details/sm11')).default
    case 'sm115':
      return (await import('./details/sm115')).default
    case 'sm12':
      return (await import('./details/sm12')).default
    case 'sm2':
      return (await import('./details/sm2')).default
    case 'sm3':
      return (await import('./details/sm3')).default
    case 'sm35':
      return (await import('./details/sm35')).default
    case 'sm4':
      return (await import('./details/sm4')).default
    case 'sm5':
      return (await import('./details/sm5')).default
    case 'sm6':
      return (await import('./details/sm6')).default
    case 'sm7':
      return (await import('./details/sm7')).default
    case 'sm75':
      return (await import('./details/sm75')).default
    case 'sm8':
      return (await import('./details/sm8')).default
    case 'sm9':
      return (await import('./details/sm9')).default
    case 'sma':
      return (await import('./details/sma')).default
    case 'smp':
      return (await import('./details/smp')).default
    case 'sv1':
      return (await import('./details/sv1')).default
    case 'sv10':
      return (await import('./details/sv10')).default
    case 'sv2':
      return (await import('./details/sv2')).default
    case 'sv3':
      return (await import('./details/sv3')).default
    case 'sv3pt5':
      return (await import('./details/sv3pt5')).default
    case 'sv4':
      return (await import('./details/sv4')).default
    case 'sv4pt5':
      return (await import('./details/sv4pt5')).default
    case 'sv5':
      return (await import('./details/sv5')).default
    case 'sv6':
      return (await import('./details/sv6')).default
    case 'sv6pt5':
      return (await import('./details/sv6pt5')).default
    case 'sv7':
      return (await import('./details/sv7')).default
    case 'sv8':
      return (await import('./details/sv8')).default
    case 'sv8pt5':
      return (await import('./details/sv8pt5')).default
    case 'sv9':
      return (await import('./details/sv9')).default
    case 'sve':
      return (await import('./details/sve')).default
    case 'svp':
      return (await import('./details/svp')).default
    case 'swsh1':
      return (await import('./details/swsh1')).default
    case 'swsh10':
      return (await import('./details/swsh10')).default
    case 'swsh10tg':
      return (await import('./details/swsh10tg')).default
    case 'swsh11':
      return (await import('./details/swsh11')).default
    case 'swsh11tg':
      return (await import('./details/swsh11tg')).default
    case 'swsh12':
      return (await import('./details/swsh12')).default
    case 'swsh12pt5':
      return (await import('./details/swsh12pt5')).default
    case 'swsh12pt5gg':
      return (await import('./details/swsh12pt5gg')).default
    case 'swsh12tg':
      return (await import('./details/swsh12tg')).default
    case 'swsh2':
      return (await import('./details/swsh2')).default
    case 'swsh3':
      return (await import('./details/swsh3')).default
    case 'swsh35':
      return (await import('./details/swsh35')).default
    case 'swsh4':
      return (await import('./details/swsh4')).default
    case 'swsh45':
      return (await import('./details/swsh45')).default
    case 'swsh45sv':
      return (await import('./details/swsh45sv')).default
    case 'swsh5':
      return (await import('./details/swsh5')).default
    case 'swsh6':
      return (await import('./details/swsh6')).default
    case 'swsh7':
      return (await import('./details/swsh7')).default
    case 'swsh8':
      return (await import('./details/swsh8')).default
    case 'swsh9':
      return (await import('./details/swsh9')).default
    case 'swsh9tg':
      return (await import('./details/swsh9tg')).default
    case 'swshp':
      return (await import('./details/swshp')).default
    case 'tk1a':
      return (await import('./details/tk1a')).default
    case 'tk1b':
      return (await import('./details/tk1b')).default
    case 'tk2a':
      return (await import('./details/tk2a')).default
    case 'tk2b':
      return (await import('./details/tk2b')).default
    case 'xy0':
      return (await import('./details/xy0')).default
    case 'xy1':
      return (await import('./details/xy1')).default
    case 'xy10':
      return (await import('./details/xy10')).default
    case 'xy11':
      return (await import('./details/xy11')).default
    case 'xy12':
      return (await import('./details/xy12')).default
    case 'xy2':
      return (await import('./details/xy2')).default
    case 'xy3':
      return (await import('./details/xy3')).default
    case 'xy4':
      return (await import('./details/xy4')).default
    case 'xy5':
      return (await import('./details/xy5')).default
    case 'xy6':
      return (await import('./details/xy6')).default
    case 'xy7':
      return (await import('./details/xy7')).default
    case 'xy8':
      return (await import('./details/xy8')).default
    case 'xy9':
      return (await import('./details/xy9')).default
    case 'xyp':
      return (await import('./details/xyp')).default
    case 'zsv10pt5':
      return (await import('./details/zsv10pt5')).default
    default:
      return null
  }
}

export async function getTcgCardDetailById(cardId: string): Promise<TcgCardDetail | null> {
  const setId = cardId.split('-')[0]
  if (!setId) return null
  const details = await getTcgSetDetailsById(setId)
  return details?.find((card) => card.id === cardId) ?? null
}
