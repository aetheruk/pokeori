import type { TcgSet } from './types'

export async function getTcgSetByIdLazy(setId: string): Promise<TcgSet | null> {
  switch (setId) {
    case 'base1':
      return (await import('./sets/base1')).default
    case 'base2':
      return (await import('./sets/base2')).default
    case 'base3':
      return (await import('./sets/base3')).default
    case 'base4':
      return (await import('./sets/base4')).default
    case 'base5':
      return (await import('./sets/base5')).default
    case 'base6':
      return (await import('./sets/base6')).default
    case 'basep':
      return (await import('./sets/basep')).default
    case 'bp':
      return (await import('./sets/bp')).default
    case 'bw1':
      return (await import('./sets/bw1')).default
    case 'bw10':
      return (await import('./sets/bw10')).default
    case 'bw11':
      return (await import('./sets/bw11')).default
    case 'bw2':
      return (await import('./sets/bw2')).default
    case 'bw3':
      return (await import('./sets/bw3')).default
    case 'bw4':
      return (await import('./sets/bw4')).default
    case 'bw5':
      return (await import('./sets/bw5')).default
    case 'bw6':
      return (await import('./sets/bw6')).default
    case 'bw7':
      return (await import('./sets/bw7')).default
    case 'bw8':
      return (await import('./sets/bw8')).default
    case 'bw9':
      return (await import('./sets/bw9')).default
    case 'bwp':
      return (await import('./sets/bwp')).default
    case 'cel25':
      return (await import('./sets/cel25')).default
    case 'cel25c':
      return (await import('./sets/cel25c')).default
    case 'col1':
      return (await import('./sets/col1')).default
    case 'dc1':
      return (await import('./sets/dc1')).default
    case 'det1':
      return (await import('./sets/det1')).default
    case 'dp1':
      return (await import('./sets/dp1')).default
    case 'dp2':
      return (await import('./sets/dp2')).default
    case 'dp3':
      return (await import('./sets/dp3')).default
    case 'dp4':
      return (await import('./sets/dp4')).default
    case 'dp5':
      return (await import('./sets/dp5')).default
    case 'dp6':
      return (await import('./sets/dp6')).default
    case 'dp7':
      return (await import('./sets/dp7')).default
    case 'dpp':
      return (await import('./sets/dpp')).default
    case 'dv1':
      return (await import('./sets/dv1')).default
    case 'ecard1':
      return (await import('./sets/ecard1')).default
    case 'ecard2':
      return (await import('./sets/ecard2')).default
    case 'ecard3':
      return (await import('./sets/ecard3')).default
    case 'ex1':
      return (await import('./sets/ex1')).default
    case 'ex10':
      return (await import('./sets/ex10')).default
    case 'ex11':
      return (await import('./sets/ex11')).default
    case 'ex12':
      return (await import('./sets/ex12')).default
    case 'ex13':
      return (await import('./sets/ex13')).default
    case 'ex14':
      return (await import('./sets/ex14')).default
    case 'ex15':
      return (await import('./sets/ex15')).default
    case 'ex16':
      return (await import('./sets/ex16')).default
    case 'ex2':
      return (await import('./sets/ex2')).default
    case 'ex3':
      return (await import('./sets/ex3')).default
    case 'ex4':
      return (await import('./sets/ex4')).default
    case 'ex5':
      return (await import('./sets/ex5')).default
    case 'ex6':
      return (await import('./sets/ex6')).default
    case 'ex7':
      return (await import('./sets/ex7')).default
    case 'ex8':
      return (await import('./sets/ex8')).default
    case 'ex9':
      return (await import('./sets/ex9')).default
    case 'fut20':
      return (await import('./sets/fut20')).default
    case 'g1':
      return (await import('./sets/g1')).default
    case 'gym1':
      return (await import('./sets/gym1')).default
    case 'gym2':
      return (await import('./sets/gym2')).default
    case 'hgss1':
      return (await import('./sets/hgss1')).default
    case 'hgss2':
      return (await import('./sets/hgss2')).default
    case 'hgss3':
      return (await import('./sets/hgss3')).default
    case 'hgss4':
      return (await import('./sets/hgss4')).default
    case 'hsp':
      return (await import('./sets/hsp')).default
    case 'mcd11':
      return (await import('./sets/mcd11')).default
    case 'mcd12':
      return (await import('./sets/mcd12')).default
    case 'mcd14':
      return (await import('./sets/mcd14')).default
    case 'mcd15':
      return (await import('./sets/mcd15')).default
    case 'mcd16':
      return (await import('./sets/mcd16')).default
    case 'mcd17':
      return (await import('./sets/mcd17')).default
    case 'mcd18':
      return (await import('./sets/mcd18')).default
    case 'mcd19':
      return (await import('./sets/mcd19')).default
    case 'mcd21':
      return (await import('./sets/mcd21')).default
    case 'mcd22':
      return (await import('./sets/mcd22')).default
    case 'me1':
      return (await import('./sets/me1')).default
    case 'me2':
      return (await import('./sets/me2')).default
    case 'me2pt5':
      return (await import('./sets/me2pt5')).default
    case 'me3':
      return (await import('./sets/me3')).default
    case 'me4':
      return (await import('./sets/me4')).default
    case 'neo1':
      return (await import('./sets/neo1')).default
    case 'neo2':
      return (await import('./sets/neo2')).default
    case 'neo3':
      return (await import('./sets/neo3')).default
    case 'neo4':
      return (await import('./sets/neo4')).default
    case 'np':
      return (await import('./sets/np')).default
    case 'pgo':
      return (await import('./sets/pgo')).default
    case 'pl1':
      return (await import('./sets/pl1')).default
    case 'pl2':
      return (await import('./sets/pl2')).default
    case 'pl3':
      return (await import('./sets/pl3')).default
    case 'pl4':
      return (await import('./sets/pl4')).default
    case 'pop1':
      return (await import('./sets/pop1')).default
    case 'pop2':
      return (await import('./sets/pop2')).default
    case 'pop3':
      return (await import('./sets/pop3')).default
    case 'pop4':
      return (await import('./sets/pop4')).default
    case 'pop5':
      return (await import('./sets/pop5')).default
    case 'pop6':
      return (await import('./sets/pop6')).default
    case 'pop7':
      return (await import('./sets/pop7')).default
    case 'pop8':
      return (await import('./sets/pop8')).default
    case 'pop9':
      return (await import('./sets/pop9')).default
    case 'rsv10pt5':
      return (await import('./sets/rsv10pt5')).default
    case 'ru1':
      return (await import('./sets/ru1')).default
    case 'si1':
      return (await import('./sets/si1')).default
    case 'sm1':
      return (await import('./sets/sm1')).default
    case 'sm10':
      return (await import('./sets/sm10')).default
    case 'sm11':
      return (await import('./sets/sm11')).default
    case 'sm115':
      return (await import('./sets/sm115')).default
    case 'sm12':
      return (await import('./sets/sm12')).default
    case 'sm2':
      return (await import('./sets/sm2')).default
    case 'sm3':
      return (await import('./sets/sm3')).default
    case 'sm35':
      return (await import('./sets/sm35')).default
    case 'sm4':
      return (await import('./sets/sm4')).default
    case 'sm5':
      return (await import('./sets/sm5')).default
    case 'sm6':
      return (await import('./sets/sm6')).default
    case 'sm7':
      return (await import('./sets/sm7')).default
    case 'sm75':
      return (await import('./sets/sm75')).default
    case 'sm8':
      return (await import('./sets/sm8')).default
    case 'sm9':
      return (await import('./sets/sm9')).default
    case 'sma':
      return (await import('./sets/sma')).default
    case 'smp':
      return (await import('./sets/smp')).default
    case 'sv1':
      return (await import('./sets/sv1')).default
    case 'sv10':
      return (await import('./sets/sv10')).default
    case 'sv2':
      return (await import('./sets/sv2')).default
    case 'sv3':
      return (await import('./sets/sv3')).default
    case 'sv3pt5':
      return (await import('./sets/sv3pt5')).default
    case 'sv4':
      return (await import('./sets/sv4')).default
    case 'sv4pt5':
      return (await import('./sets/sv4pt5')).default
    case 'sv5':
      return (await import('./sets/sv5')).default
    case 'sv6':
      return (await import('./sets/sv6')).default
    case 'sv6pt5':
      return (await import('./sets/sv6pt5')).default
    case 'sv7':
      return (await import('./sets/sv7')).default
    case 'sv8':
      return (await import('./sets/sv8')).default
    case 'sv8pt5':
      return (await import('./sets/sv8pt5')).default
    case 'sv9':
      return (await import('./sets/sv9')).default
    case 'sve':
      return (await import('./sets/sve')).default
    case 'svp':
      return (await import('./sets/svp')).default
    case 'swsh1':
      return (await import('./sets/swsh1')).default
    case 'swsh10':
      return (await import('./sets/swsh10')).default
    case 'swsh10tg':
      return (await import('./sets/swsh10tg')).default
    case 'swsh11':
      return (await import('./sets/swsh11')).default
    case 'swsh11tg':
      return (await import('./sets/swsh11tg')).default
    case 'swsh12':
      return (await import('./sets/swsh12')).default
    case 'swsh12pt5':
      return (await import('./sets/swsh12pt5')).default
    case 'swsh12pt5gg':
      return (await import('./sets/swsh12pt5gg')).default
    case 'swsh12tg':
      return (await import('./sets/swsh12tg')).default
    case 'swsh2':
      return (await import('./sets/swsh2')).default
    case 'swsh3':
      return (await import('./sets/swsh3')).default
    case 'swsh35':
      return (await import('./sets/swsh35')).default
    case 'swsh4':
      return (await import('./sets/swsh4')).default
    case 'swsh45':
      return (await import('./sets/swsh45')).default
    case 'swsh45sv':
      return (await import('./sets/swsh45sv')).default
    case 'swsh5':
      return (await import('./sets/swsh5')).default
    case 'swsh6':
      return (await import('./sets/swsh6')).default
    case 'swsh7':
      return (await import('./sets/swsh7')).default
    case 'swsh8':
      return (await import('./sets/swsh8')).default
    case 'swsh9':
      return (await import('./sets/swsh9')).default
    case 'swsh9tg':
      return (await import('./sets/swsh9tg')).default
    case 'swshp':
      return (await import('./sets/swshp')).default
    case 'tk1a':
      return (await import('./sets/tk1a')).default
    case 'tk1b':
      return (await import('./sets/tk1b')).default
    case 'tk2a':
      return (await import('./sets/tk2a')).default
    case 'tk2b':
      return (await import('./sets/tk2b')).default
    case 'xy0':
      return (await import('./sets/xy0')).default
    case 'xy1':
      return (await import('./sets/xy1')).default
    case 'xy10':
      return (await import('./sets/xy10')).default
    case 'xy11':
      return (await import('./sets/xy11')).default
    case 'xy12':
      return (await import('./sets/xy12')).default
    case 'xy2':
      return (await import('./sets/xy2')).default
    case 'xy3':
      return (await import('./sets/xy3')).default
    case 'xy4':
      return (await import('./sets/xy4')).default
    case 'xy5':
      return (await import('./sets/xy5')).default
    case 'xy6':
      return (await import('./sets/xy6')).default
    case 'xy7':
      return (await import('./sets/xy7')).default
    case 'xy8':
      return (await import('./sets/xy8')).default
    case 'xy9':
      return (await import('./sets/xy9')).default
    case 'xyp':
      return (await import('./sets/xyp')).default
    case 'zsv10pt5':
      return (await import('./sets/zsv10pt5')).default
    default:
      return null
  }
}
