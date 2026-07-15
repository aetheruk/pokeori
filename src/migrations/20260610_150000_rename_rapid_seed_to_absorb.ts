import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    WITH move_id_map(old_id, new_id) AS (
      VALUES
        ('move-rapid-seed', 'absorb'),
        ('rapid-seed', 'absorb')
    )
    UPDATE "pokemon_assigned_moves"
    SET "move_id" = move_id_map.new_id
    FROM move_id_map
    WHERE "pokemon_assigned_moves"."move_id" = move_id_map.old_id;

    WITH inventory_id_map(old_id, new_id) AS (
      VALUES
        ('move-rapid-seed', 'tm-absorb'),
        ('tm-rapid-seed', 'tm-absorb')
    )
    UPDATE "user_inventory_items"
    SET "item_id" = inventory_id_map.new_id
    FROM inventory_id_map
    WHERE "user_inventory_items"."item_id" = inventory_id_map.old_id;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    UPDATE "pokemon_assigned_moves"
    SET "move_id" = 'rapid-seed'
    WHERE "move_id" = 'absorb';

    UPDATE "user_inventory_items"
    SET "item_id" = 'tm-rapid-seed'
    WHERE "item_id" = 'tm-absorb';
  `)
}
