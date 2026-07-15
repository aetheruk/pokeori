import * as migration_20260604_102130_user_state_collections from './20260604_102130_user_state_collections';
import * as migration_20260604_113000_user_state_fk_cascade from './20260604_113000_user_state_fk_cascade';
import * as migration_20260605_120000_drop_legacy_user_ledgers from './20260605_120000_drop_legacy_user_ledgers';
import * as migration_20260607_120000_normalize_tm_move_ids from './20260607_120000_normalize_tm_move_ids';
import * as migration_20260607_130000_rename_venomous_nibble_to_poison_sting from './20260607_130000_rename_venomous_nibble_to_poison_sting';
import * as migration_20260610_140000_rename_water_moves from './20260610_140000_rename_water_moves';
import * as migration_20260610_150000_rename_rapid_seed_to_absorb from './20260610_150000_rename_rapid_seed_to_absorb';

export const migrations = [
  {
    up: migration_20260604_102130_user_state_collections.up,
    down: migration_20260604_102130_user_state_collections.down,
    name: '20260604_102130_user_state_collections'
  },
  {
    up: migration_20260604_113000_user_state_fk_cascade.up,
    down: migration_20260604_113000_user_state_fk_cascade.down,
    name: '20260604_113000_user_state_fk_cascade'
  },
  {
    up: migration_20260605_120000_drop_legacy_user_ledgers.up,
    down: migration_20260605_120000_drop_legacy_user_ledgers.down,
    name: '20260605_120000_drop_legacy_user_ledgers'
  },
  {
    up: migration_20260607_120000_normalize_tm_move_ids.up,
    down: migration_20260607_120000_normalize_tm_move_ids.down,
    name: '20260607_120000_normalize_tm_move_ids'
  },
  {
    up: migration_20260607_130000_rename_venomous_nibble_to_poison_sting.up,
    down: migration_20260607_130000_rename_venomous_nibble_to_poison_sting.down,
    name: '20260607_130000_rename_venomous_nibble_to_poison_sting'
  },
  {
    up: migration_20260610_140000_rename_water_moves.up,
    down: migration_20260610_140000_rename_water_moves.down,
    name: '20260610_140000_rename_water_moves'
  },
  {
    up: migration_20260610_150000_rename_rapid_seed_to_absorb.up,
    down: migration_20260610_150000_rename_rapid_seed_to_absorb.down,
    name: '20260610_150000_rename_rapid_seed_to_absorb'
  },
];
