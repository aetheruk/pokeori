import { GameDataTools } from './components/GameDataTools'
import Link from 'next/link'

export default function DevPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold tracking-tight">Pokemon App Dev Tools</h1>
      <p className="text-muted-foreground">
        Welcome to the developer tools. Use the navigation above to manage game data.
      </p>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h3 className="font-semibold leading-none tracking-tight">Battles</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Manage trainer battles, wild encounters config, and PVP presets.
          </p>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h3 className="font-semibold leading-none tracking-tight">Locations</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Manage location data, encounters, and requirements.
          </p>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h3 className="font-semibold leading-none tracking-tight">Tasks</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Manage quests, tasks, and NPC interactions.
          </p>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h3 className="font-semibold leading-none tracking-tight">Shops</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Manage shop inventories, items, costs, and stock.
          </p>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h3 className="font-semibold leading-none tracking-tight">Voyages</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Manage voyage expeditions, pokemon criteria, and rewards.
          </p>
        </div>
        <Link
          href="/dev/moves"
          className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 block hover:bg-card/85"
        >
          <h3 className="font-semibold leading-none tracking-tight">Moves</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Create and edit TM moves by type file, with sprite-based Pokémon form selection.
          </p>
        </Link>
        <Link
          href="/dev/abilities"
          className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 block hover:bg-card/85"
        >
          <h3 className="font-semibold leading-none tracking-tight">Abilities</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Inspect and generate encounter, research, and Field Observation ability effects.
          </p>
        </Link>
        <Link
          href="/dev/rarities"
          className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 block hover:bg-card/85"
        >
          <h3 className="font-semibold leading-none tracking-tight">Rarities</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Compare CSS-only Pokemon rarity treatments across pixel and Home sprites.
          </p>
        </Link>
      </div>

      <GameDataTools />
    </div>
  )
}
