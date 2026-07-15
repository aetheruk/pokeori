import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export const USER_STATE_SCHEMA_UP_SQL = `
    DO $$ BEGIN
      CREATE TYPE "public"."enum_user_pokedex_entries_preferred_battle_stance" AS ENUM('power', 'speed', 'tech');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_user_activity_stats_activity_type" AS ENUM('battle', 'research', 'location', 'expedition');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    CREATE TABLE IF NOT EXISTS "user_inventory_items" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
      "user_id" uuid NOT NULL,
      "item_id" varchar NOT NULL,
      "quantity" numeric DEFAULT 0 NOT NULL,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "user_pokedex_entries" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
      "user_id" uuid NOT NULL,
      "species_id" numeric NOT NULL,
      "form_id" varchar NOT NULL,
      "seen" boolean DEFAULT false,
      "caught" boolean DEFAULT false,
      "total_seen" numeric DEFAULT 0,
      "total_caught" numeric DEFAULT 0,
      "shiny_seen" boolean DEFAULT false,
      "shiny_caught" boolean DEFAULT false,
      "research_xp" numeric DEFAULT 0,
      "research_level" numeric DEFAULT 0,
      "preferred_battle_stance" "enum_user_pokedex_entries_preferred_battle_stance",
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "user_task_progress" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
      "user_id" uuid NOT NULL,
      "task_id" varchar NOT NULL,
      "count" numeric DEFAULT 0 NOT NULL,
      "completed_at" timestamp(3) with time zone,
      "last_completed_at" timestamp(3) with time zone,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "user_activity_stats" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
      "user_id" uuid NOT NULL,
      "activity_type" "enum_user_activity_stats_activity_type" NOT NULL,
      "activity_id" varchar NOT NULL,
      "wins" numeric DEFAULT 0 NOT NULL,
      "losses" numeric DEFAULT 0 NOT NULL,
      "high_score" numeric,
      "last_played" timestamp(3) with time zone,
      "metadata" jsonb DEFAULT '{}'::jsonb,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "user_tcg_cards" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
      "user_id" uuid NOT NULL,
      "card_id" varchar NOT NULL,
      "set_id" varchar,
      "quantity" numeric DEFAULT 0 NOT NULL,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "user_shop_purchases" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
      "user_id" uuid NOT NULL,
      "shop_item_id" varchar NOT NULL,
      "shop_id" varchar,
      "item_id" varchar,
      "count" numeric DEFAULT 0 NOT NULL,
      "first_purchased_at" timestamp(3) with time zone,
      "last_purchased_at" timestamp(3) with time zone,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    DO $$ BEGIN
      ALTER TABLE "user_inventory_items" ADD CONSTRAINT "user_inventory_items_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "user_pokedex_entries" ADD CONSTRAINT "user_pokedex_entries_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "user_task_progress" ADD CONSTRAINT "user_task_progress_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "user_activity_stats" ADD CONSTRAINT "user_activity_stats_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "user_tcg_cards" ADD CONSTRAINT "user_tcg_cards_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "user_shop_purchases" ADD CONSTRAINT "user_shop_purchases_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    CREATE INDEX IF NOT EXISTS "user_inventory_items_user_idx" ON "user_inventory_items" USING btree ("user_id");
    CREATE INDEX IF NOT EXISTS "user_inventory_items_item_id_idx" ON "user_inventory_items" USING btree ("item_id");
    CREATE INDEX IF NOT EXISTS "user_inventory_items_updated_at_idx" ON "user_inventory_items" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "user_inventory_items_created_at_idx" ON "user_inventory_items" USING btree ("created_at");

    CREATE INDEX IF NOT EXISTS "user_pokedex_entries_user_idx" ON "user_pokedex_entries" USING btree ("user_id");
    CREATE INDEX IF NOT EXISTS "user_pokedex_entries_species_id_idx" ON "user_pokedex_entries" USING btree ("species_id");
    CREATE INDEX IF NOT EXISTS "user_pokedex_entries_form_id_idx" ON "user_pokedex_entries" USING btree ("form_id");
    CREATE INDEX IF NOT EXISTS "user_pokedex_entries_updated_at_idx" ON "user_pokedex_entries" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "user_pokedex_entries_created_at_idx" ON "user_pokedex_entries" USING btree ("created_at");

    CREATE INDEX IF NOT EXISTS "user_task_progress_user_idx" ON "user_task_progress" USING btree ("user_id");
    CREATE INDEX IF NOT EXISTS "user_task_progress_task_id_idx" ON "user_task_progress" USING btree ("task_id");
    CREATE INDEX IF NOT EXISTS "user_task_progress_updated_at_idx" ON "user_task_progress" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "user_task_progress_created_at_idx" ON "user_task_progress" USING btree ("created_at");

    CREATE INDEX IF NOT EXISTS "user_activity_stats_user_idx" ON "user_activity_stats" USING btree ("user_id");
    CREATE INDEX IF NOT EXISTS "user_activity_stats_activity_type_idx" ON "user_activity_stats" USING btree ("activity_type");
    CREATE INDEX IF NOT EXISTS "user_activity_stats_activity_id_idx" ON "user_activity_stats" USING btree ("activity_id");
    CREATE INDEX IF NOT EXISTS "user_activity_stats_updated_at_idx" ON "user_activity_stats" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "user_activity_stats_created_at_idx" ON "user_activity_stats" USING btree ("created_at");

    CREATE INDEX IF NOT EXISTS "user_tcg_cards_user_idx" ON "user_tcg_cards" USING btree ("user_id");
    CREATE INDEX IF NOT EXISTS "user_tcg_cards_card_id_idx" ON "user_tcg_cards" USING btree ("card_id");
    CREATE INDEX IF NOT EXISTS "user_tcg_cards_set_id_idx" ON "user_tcg_cards" USING btree ("set_id");
    CREATE INDEX IF NOT EXISTS "user_tcg_cards_updated_at_idx" ON "user_tcg_cards" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "user_tcg_cards_created_at_idx" ON "user_tcg_cards" USING btree ("created_at");

    CREATE INDEX IF NOT EXISTS "user_shop_purchases_user_idx" ON "user_shop_purchases" USING btree ("user_id");
    CREATE INDEX IF NOT EXISTS "user_shop_purchases_shop_item_id_idx" ON "user_shop_purchases" USING btree ("shop_item_id");
    CREATE INDEX IF NOT EXISTS "user_shop_purchases_shop_id_idx" ON "user_shop_purchases" USING btree ("shop_id");
    CREATE INDEX IF NOT EXISTS "user_shop_purchases_item_id_idx" ON "user_shop_purchases" USING btree ("item_id");
    CREATE INDEX IF NOT EXISTS "user_shop_purchases_updated_at_idx" ON "user_shop_purchases" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "user_shop_purchases_created_at_idx" ON "user_shop_purchases" USING btree ("created_at");

    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "user_inventory_items_id" uuid;
    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "user_pokedex_entries_id" uuid;
    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "user_task_progress_id" uuid;
    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "user_activity_stats_id" uuid;
    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "user_tcg_cards_id" uuid;
    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "user_shop_purchases_id" uuid;

    DO $$ BEGIN
      ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_user_inventory_items_fk" FOREIGN KEY ("user_inventory_items_id") REFERENCES "public"."user_inventory_items"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_user_pokedex_entries_fk" FOREIGN KEY ("user_pokedex_entries_id") REFERENCES "public"."user_pokedex_entries"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_user_task_progress_fk" FOREIGN KEY ("user_task_progress_id") REFERENCES "public"."user_task_progress"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_user_activity_stats_fk" FOREIGN KEY ("user_activity_stats_id") REFERENCES "public"."user_activity_stats"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_user_tcg_cards_fk" FOREIGN KEY ("user_tcg_cards_id") REFERENCES "public"."user_tcg_cards"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_user_shop_purchases_fk" FOREIGN KEY ("user_shop_purchases_id") REFERENCES "public"."user_shop_purchases"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_user_inventory_items_id_idx" ON "payload_locked_documents_rels" USING btree ("user_inventory_items_id");
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_user_pokedex_entries_id_idx" ON "payload_locked_documents_rels" USING btree ("user_pokedex_entries_id");
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_user_task_progress_id_idx" ON "payload_locked_documents_rels" USING btree ("user_task_progress_id");
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_user_activity_stats_id_idx" ON "payload_locked_documents_rels" USING btree ("user_activity_stats_id");
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_user_tcg_cards_id_idx" ON "payload_locked_documents_rels" USING btree ("user_tcg_cards_id");
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_user_shop_purchases_id_idx" ON "payload_locked_documents_rels" USING btree ("user_shop_purchases_id");
`

export const USER_STATE_SCHEMA_DOWN_SQL = `
    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_user_inventory_items_fk";
    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_user_pokedex_entries_fk";
    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_user_task_progress_fk";
    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_user_activity_stats_fk";
    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_user_tcg_cards_fk";
    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_user_shop_purchases_fk";

    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "user_inventory_items_id";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "user_pokedex_entries_id";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "user_task_progress_id";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "user_activity_stats_id";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "user_tcg_cards_id";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "user_shop_purchases_id";

    DROP TABLE IF EXISTS "user_inventory_items" CASCADE;
    DROP TABLE IF EXISTS "user_pokedex_entries" CASCADE;
    DROP TABLE IF EXISTS "user_task_progress" CASCADE;
    DROP TABLE IF EXISTS "user_activity_stats" CASCADE;
    DROP TABLE IF EXISTS "user_tcg_cards" CASCADE;
    DROP TABLE IF EXISTS "user_shop_purchases" CASCADE;

    DROP TYPE IF EXISTS "public"."enum_user_pokedex_entries_preferred_battle_stance";
    DROP TYPE IF EXISTS "public"."enum_user_activity_stats_activity_type";
`

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql.raw(USER_STATE_SCHEMA_UP_SQL))
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql.raw(USER_STATE_SCHEMA_DOWN_SQL))
}
