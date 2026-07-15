import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    WITH move_id_map(old_id, new_id) AS (
      VALUES
        ('move-pressure-pump', 'bubble'),
        ('pressure-pump', 'bubble'),
        ('move-aqua-blitz', 'whirlpool'),
        ('aqua-blitz', 'whirlpool')
    )
    UPDATE "pokemon_assigned_moves"
    SET "move_id" = move_id_map.new_id
    FROM move_id_map
    WHERE "pokemon_assigned_moves"."move_id" = move_id_map.old_id;

    WITH inventory_id_map(old_id, new_id) AS (
      VALUES
        ('move-pressure-pump', 'tm-bubble'),
        ('tm-pressure-pump', 'tm-bubble'),
        ('move-aqua-blitz', 'tm-whirlpool'),
        ('tm-aqua-blitz', 'tm-whirlpool')
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
    SET "move_id" = 'pressure-pump'
    WHERE "move_id" = 'bubble';

    UPDATE "user_inventory_items"
    SET "item_id" = 'tm-pressure-pump'
    WHERE "item_id" = 'tm-bubble';

    UPDATE "pokemon_assigned_moves"
    SET "move_id" = 'aqua-blitz'
    WHERE "move_id" = 'whirlpool';

    UPDATE "user_inventory_items"
    SET "item_id" = 'tm-aqua-blitz'
    WHERE "item_id" = 'tm-whirlpool';
  `)
}
