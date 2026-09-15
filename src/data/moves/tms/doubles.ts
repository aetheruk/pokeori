import type { MoveConfig } from '../types'

// Learners are a conservative subset of canonical compatible forms; the
// research rewards below determine when these TMs become obtainable.
export const DOUBLES_TM_MOVES:MoveConfig[]=[
  {id:'helping-hand',name:'Helping Hand',description:'Boosts the active ally’s next damaging move this turn.',stance:'tech',damage:0,target:'self',doublesTarget:'ally',doublesPriority:5,doublesOnly:true,forcedType:'normal',accuracy:100,level:10,formId:['35','36','39','40','113','133','173','175','176','311','312','417','440','468','531']},
  {id:'follow-me',name:'Follow Me',description:'Draws single-target attacks away from the active ally for this turn.',stance:'speed',damage:0,target:'self',doublesTarget:'self',doublesPriority:2,doublesOnly:true,forcedType:'normal',accuracy:100,level:15,formId:['35','36','122','175','176','417','447','468','10186']},
  {id:'rage-powder',name:'Rage Powder',description:'Draws single-target attacks away from the active ally for this turn.',stance:'speed',damage:0,target:'self',doublesTarget:'self',doublesPriority:2,doublesOnly:true,forcedType:'bug',accuracy:100,level:15,formId:['12','46','47','48','114','187','188','189','590','591','637','666']},
  {id:'ally-switch',name:'Ally Switch',description:'Swaps the user’s battle lane with the active ally before attacks resolve.',stance:'speed',damage:0,target:'self',doublesTarget:'self',doublesPriority:2,doublesOnly:true,forcedType:'psychic',accuracy:100,level:20,formId:['35','36','63','64','65','92','93','94','122','151','177','178','280','281','282','292']},
  {id:'after-you',name:'After You',description:'The chosen ally takes its action immediately after the user.',stance:'speed',damage:0,target:'self',doublesTarget:'ally',doublesPriority:0,doublesOnly:true,forcedType:'normal',accuracy:100,level:25,formId:['35','36','43','44','45','175','176','179','180','181','287','288','289','322','323','324','352','427','428']},
]

const allActive=['surf','earthquake','self-destruct','explosion','magnitude','teeter-dance','discharge','lava-plume','sludge-wave','synchronoise','bulldoze','searing-shot','parabolic-charge','petal-blizzard','boomburst','sparkling-aria','brutal-swing','mind-blown','misty-explosion','corrosive-gas']
const bothOpponents=['razor-wind','tail-whip','leer','growl','acid','blizzard','razor-leaf','string-shot','swift','poison-gas','bubble','rock-slide','cotton-spore','powder-snow','icy-wind','sweet-scent','twister','heat-wave','eruption','hyper-voice','air-cutter','water-spout','muddy-water','heal-block','captivate','dark-void','incinerate','struggle-bug','electroweb','relic-song','glaciate','snarl','disarming-voice','diamond-storm','venom-drench','dazzling-gleam','thousand-arrows','thousand-waves','lands-wrath','origin-pulse','precipice-blades','core-enforcer','clanging-scales','shell-trap','splishy-splash','breaking-swipe','overdrive','burning-jealousy','dragon-energy','fiery-wrath','glacial-lance','astral-barrage','springtide-storm','bleakwind-storm','wildbolt-storm','sandsear-storm','mortal-spin','make-it-rain','tera-starstorm']
const bothAllies=['heal-bell','aromatherapy','howl','magnetic-flux','gear-up','life-dew','coaching','jungle-healing']
const ally=['aromatic-mist','decorate','heal-pulse']
const priorityOne=['quick-attack','sucker-punch','aqua-jet','bullet-punch','mach-punch','vacuum-wave','shadow-sneak','ice-shard','water-shuriken','thunderclap','jet-punch','accelerock','baby-doll-eyes']
const priorityTwo=['extreme-speed','first-impression']
const priorityThree=['fake-out']
const priorityFour=['protect','detect']
const sideField=['mist','light-screen','reflect','safeguard','tailwind','lucky-chant','aurora-veil']

export const DOUBLES_MOVE_OVERRIDES:Record<string,Pick<MoveConfig,'doublesTarget'|'doublesPriority'>>={
  ...Object.fromEntries(allActive.map(id=>[id,{doublesTarget:'all-active' as const}])),
  ...Object.fromEntries(bothOpponents.map(id=>[id,{doublesTarget:'both-opponents' as const}])),
  ...Object.fromEntries(bothAllies.map(id=>[id,{doublesTarget:'both-allies' as const}])),
  ...Object.fromEntries(ally.map(id=>[id,{doublesTarget:'ally' as const}])),
  'wide-guard':{doublesTarget:'both-allies',doublesPriority:3},
  'quick-guard':{doublesTarget:'both-allies',doublesPriority:3},
  'mat-block':{doublesTarget:'both-allies',doublesPriority:0},
  'crafty-shield':{doublesTarget:'both-allies',doublesPriority:3},
  ...Object.fromEntries(priorityOne.map(id=>[id,{doublesPriority:1}])),
  ...Object.fromEntries(priorityTwo.map(id=>[id,{doublesPriority:2}])),
  ...Object.fromEntries(priorityThree.map(id=>[id,{doublesPriority:3}])),
  ...Object.fromEntries(priorityFour.map(id=>[id,{doublesPriority:4}])),
  ...Object.fromEntries(sideField.map(id=>[id,{doublesTarget:'both-allies' as const}])),
  'pollen-puff':{doublesTarget:'any-single'},
}
