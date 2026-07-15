import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

const USER_STATE_FK_CASCADE_UP_SQL = `
  DO $$ BEGIN
    IF to_regclass('public.user_inventory_items') IS NOT NULL THEN
      ALTER TABLE "user_inventory_items" DROP CONSTRAINT IF EXISTS "user_inventory_items_user_id_users_id_fk";
      ALTER TABLE "user_inventory_items" ADD CONSTRAINT "user_inventory_items_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
    END IF;
  END $$;

  DO $$ BEGIN
    IF to_regclass('public.user_pokedex_entries') IS NOT NULL THEN
      ALTER TABLE "user_pokedex_entries" DROP CONSTRAINT IF EXISTS "user_pokedex_entries_user_id_users_id_fk";
      ALTER TABLE "user_pokedex_entries" ADD CONSTRAINT "user_pokedex_entries_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
    END IF;
  END $$;

  DO $$ BEGIN
    IF to_regclass('public.user_task_progress') IS NOT NULL THEN
      ALTER TABLE "user_task_progress" DROP CONSTRAINT IF EXISTS "user_task_progress_user_id_users_id_fk";
      ALTER TABLE "user_task_progress" ADD CONSTRAINT "user_task_progress_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
    END IF;
  END $$;

  DO $$ BEGIN
    IF to_regclass('public.user_activity_stats') IS NOT NULL THEN
      ALTER TABLE "user_activity_stats" DROP CONSTRAINT IF EXISTS "user_activity_stats_user_id_users_id_fk";
      ALTER TABLE "user_activity_stats" ADD CONSTRAINT "user_activity_stats_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
    END IF;
  END $$;

  DO $$ BEGIN
    IF to_regclass('public.user_tcg_cards') IS NOT NULL THEN
      ALTER TABLE "user_tcg_cards" DROP CONSTRAINT IF EXISTS "user_tcg_cards_user_id_users_id_fk";
      ALTER TABLE "user_tcg_cards" ADD CONSTRAINT "user_tcg_cards_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
    END IF;
  END $$;

  DO $$ BEGIN
    IF to_regclass('public.user_shop_purchases') IS NOT NULL THEN
      ALTER TABLE "user_shop_purchases" DROP CONSTRAINT IF EXISTS "user_shop_purchases_user_id_users_id_fk";
      ALTER TABLE "user_shop_purchases" ADD CONSTRAINT "user_shop_purchases_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
    END IF;
  END $$;
`

const USER_STATE_FK_CASCADE_DOWN_SQL = `
  DO $$ BEGIN
    IF to_regclass('public.user_inventory_items') IS NOT NULL THEN
      ALTER TABLE "user_inventory_items" DROP CONSTRAINT IF EXISTS "user_inventory_items_user_id_users_id_fk";
      ALTER TABLE "user_inventory_items" ADD CONSTRAINT "user_inventory_items_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
    END IF;
  END $$;

  DO $$ BEGIN
    IF to_regclass('public.user_pokedex_entries') IS NOT NULL THEN
      ALTER TABLE "user_pokedex_entries" DROP CONSTRAINT IF EXISTS "user_pokedex_entries_user_id_users_id_fk";
      ALTER TABLE "user_pokedex_entries" ADD CONSTRAINT "user_pokedex_entries_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
    END IF;
  END $$;

  DO $$ BEGIN
    IF to_regclass('public.user_task_progress') IS NOT NULL THEN
      ALTER TABLE "user_task_progress" DROP CONSTRAINT IF EXISTS "user_task_progress_user_id_users_id_fk";
      ALTER TABLE "user_task_progress" ADD CONSTRAINT "user_task_progress_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
    END IF;
  END $$;

  DO $$ BEGIN
    IF to_regclass('public.user_activity_stats') IS NOT NULL THEN
      ALTER TABLE "user_activity_stats" DROP CONSTRAINT IF EXISTS "user_activity_stats_user_id_users_id_fk";
      ALTER TABLE "user_activity_stats" ADD CONSTRAINT "user_activity_stats_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
    END IF;
  END $$;

  DO $$ BEGIN
    IF to_regclass('public.user_tcg_cards') IS NOT NULL THEN
      ALTER TABLE "user_tcg_cards" DROP CONSTRAINT IF EXISTS "user_tcg_cards_user_id_users_id_fk";
      ALTER TABLE "user_tcg_cards" ADD CONSTRAINT "user_tcg_cards_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
    END IF;
  END $$;

  DO $$ BEGIN
    IF to_regclass('public.user_shop_purchases') IS NOT NULL THEN
      ALTER TABLE "user_shop_purchases" DROP CONSTRAINT IF EXISTS "user_shop_purchases_user_id_users_id_fk";
      ALTER TABLE "user_shop_purchases" ADD CONSTRAINT "user_shop_purchases_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
    END IF;
  END $$;
`

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql.raw(USER_STATE_FK_CASCADE_UP_SQL))
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql.raw(USER_STATE_FK_CASCADE_DOWN_SQL))
}
