import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "users" DROP COLUMN IF EXISTS "pokedex";
    ALTER TABLE "users" DROP COLUMN IF EXISTS "inventory";
    ALTER TABLE "users" DROP COLUMN IF EXISTS "completed_tasks";
    ALTER TABLE "users" DROP COLUMN IF EXISTS "shop_purchases";
    ALTER TABLE "users" DROP COLUMN IF EXISTS "tcg";
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "pokedex" jsonb DEFAULT '{}'::jsonb;
    ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "inventory" jsonb DEFAULT '{}'::jsonb;
    ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "completed_tasks" jsonb DEFAULT '{}'::jsonb;
    ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "shop_purchases" jsonb DEFAULT '{}'::jsonb;
    ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "tcg" jsonb DEFAULT '{}'::jsonb;
  `)
}
