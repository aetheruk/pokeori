import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    WITH move_id_map(old_id, new_id) AS (
      VALUES
        ('move-metronome', 'metronome'),
        ('move-secret-power', 'secret-power'),
        ('move-headbutt', 'headbutt'),
        ('move-quick-attack', 'quick-attack'),
        ('move-rest', 'rest'),
        ('tm-cut', 'cut'),
        ('p-move-leek-spin', 'leek-spin'),
        ('move-harden', 'harden'),
        ('move-water-gun', 'water-gun'),
        ('move-pressure-pump', 'pressure-pump'),
        ('move-aqua-blitz', 'aqua-blitz'),
        ('move-bubble-guard', 'bubble-guard'),
        ('move-bubble-beam', 'bubble-beam'),
        ('move-sea-breeze', 'sea-breeze'),
        ('tm-surf', 'surf'),
        ('move-thunder-wave', 'thunder-wave'),
        ('tm-flash', 'flash'),
        ('p-move-sing', 'sing'),
        ('move-mega-punch', 'mega-punch'),
        ('tm-strength', 'strength'),
        ('move-aerial-ace', 'aerial-ace'),
        ('tm-fly', 'fly'),
        ('move-venomous-nibble', 'poison-sting'),
        ('move-vine-whip', 'vine-whip'),
        ('move-leafage', 'leafage'),
        ('move-rapid-seed', 'rapid-seed'),
        ('move-rock-shield', 'rock-shield'),
        ('move-wave-breaker', 'wave-breaker'),
        ('move-rock-slide', 'rock-slide'),
        ('move-dig', 'dig'),
        ('move-ember', 'ember'),
        ('move-ember-charge', 'flame-charge'),
        ('move-flame-spit', 'fire-spin')
    )
    UPDATE "pokemon_assigned_moves"
    SET "move_id" = move_id_map.new_id
    FROM move_id_map
    WHERE "pokemon_assigned_moves"."move_id" = move_id_map.old_id;

    WITH inventory_id_map(old_id, new_id) AS (
      VALUES
        ('move-metronome', 'tm-metronome'),
        ('move-secret-power', 'tm-secret-power'),
        ('move-headbutt', 'tm-headbutt'),
        ('move-quick-attack', 'tm-quick-attack'),
        ('move-rest', 'tm-rest'),
        ('p-move-leek-spin', 'tm-leek-spin'),
        ('move-harden', 'tm-harden'),
        ('move-water-gun', 'tm-water-gun'),
        ('move-pressure-pump', 'tm-pressure-pump'),
        ('move-aqua-blitz', 'tm-aqua-blitz'),
        ('move-bubble-guard', 'tm-bubble-guard'),
        ('move-bubble-beam', 'tm-bubble-beam'),
        ('move-sea-breeze', 'tm-sea-breeze'),
        ('move-thunder-wave', 'tm-thunder-wave'),
        ('p-move-sing', 'tm-sing'),
        ('move-mega-punch', 'tm-mega-punch'),
        ('move-aerial-ace', 'tm-aerial-ace'),
        ('move-venomous-nibble', 'tm-poison-sting'),
        ('move-vine-whip', 'tm-vine-whip'),
        ('move-leafage', 'tm-leafage'),
        ('move-rapid-seed', 'tm-rapid-seed'),
        ('move-rock-shield', 'tm-rock-shield'),
        ('move-wave-breaker', 'tm-wave-breaker'),
        ('move-rock-slide', 'tm-rock-slide'),
        ('move-dig', 'tm-dig'),
        ('move-ember', 'tm-ember'),
        ('move-ember-charge', 'tm-flame-charge'),
        ('move-flame-spit', 'tm-fire-spin')
    )
    UPDATE "user_inventory_items"
    SET "item_id" = inventory_id_map.new_id
    FROM inventory_id_map
    WHERE "user_inventory_items"."item_id" = inventory_id_map.old_id;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    WITH move_id_map(old_id, new_id) AS (
      VALUES
        ('move-metronome', 'metronome'),
        ('move-secret-power', 'secret-power'),
        ('move-headbutt', 'headbutt'),
        ('move-quick-attack', 'quick-attack'),
        ('move-rest', 'rest'),
        ('tm-cut', 'cut'),
        ('p-move-leek-spin', 'leek-spin'),
        ('move-harden', 'harden'),
        ('move-water-gun', 'water-gun'),
        ('move-pressure-pump', 'pressure-pump'),
        ('move-aqua-blitz', 'aqua-blitz'),
        ('move-bubble-guard', 'bubble-guard'),
        ('move-bubble-beam', 'bubble-beam'),
        ('move-sea-breeze', 'sea-breeze'),
        ('tm-surf', 'surf'),
        ('move-thunder-wave', 'thunder-wave'),
        ('tm-flash', 'flash'),
        ('p-move-sing', 'sing'),
        ('move-mega-punch', 'mega-punch'),
        ('tm-strength', 'strength'),
        ('move-aerial-ace', 'aerial-ace'),
        ('tm-fly', 'fly'),
        ('move-venomous-nibble', 'poison-sting'),
        ('move-vine-whip', 'vine-whip'),
        ('move-leafage', 'leafage'),
        ('move-rapid-seed', 'rapid-seed'),
        ('move-rock-shield', 'rock-shield'),
        ('move-wave-breaker', 'wave-breaker'),
        ('move-rock-slide', 'rock-slide'),
        ('move-dig', 'dig'),
        ('move-ember', 'ember'),
        ('move-ember-charge', 'flame-charge'),
        ('move-flame-spit', 'fire-spin')
    )
    UPDATE "pokemon_assigned_moves"
    SET "move_id" = move_id_map.old_id
    FROM move_id_map
    WHERE "pokemon_assigned_moves"."move_id" = move_id_map.new_id;
  `)
}
