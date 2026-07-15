import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    UPDATE "pokemon_assigned_moves"
    SET "move_id" = 'poison-sting'
    WHERE "move_id" IN ('venomous-nibble', 'move-venomous-nibble');

    UPDATE "user_inventory_items"
    SET "item_id" = 'tm-poison-sting'
    WHERE "item_id" IN ('tm-venomous-nibble', 'move-venomous-nibble');
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    UPDATE "pokemon_assigned_moves"
    SET "move_id" = 'venomous-nibble'
    WHERE "move_id" = 'poison-sting';

    UPDATE "user_inventory_items"
    SET "item_id" = 'tm-venomous-nibble'
    WHERE "item_id" = 'tm-poison-sting';
  `)
}
