'use client'

import { CircleAlert } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

const sourceLinks = [
  { label: 'PokeAPI', href: 'https://pokeapi.co/' },
  { label: 'PokeAPI data', href: 'https://github.com/PokeAPI/pokeapi' },
  { label: 'PokeAPI sprites', href: 'https://github.com/PokeAPI/sprites' },
  { label: 'PokeAPI cries', href: 'https://github.com/PokeAPI/cries' },
  { label: 'Pokémon TCG API', href: 'https://pokemontcg.io/' },
  {
    label: 'Pokémon TCG data repository',
    href: 'https://github.com/PokemonTCG/pokemon-tcg-data',
  },
]

const softwareLinks = [
  { label: 'Bun', href: 'https://bun.sh/' },
  { label: 'Next.js', href: 'https://nextjs.org/' },
  { label: 'Payload CMS', href: 'https://payloadcms.com/' },
  { label: 'React', href: 'https://react.dev/' },
  { label: 'Tailwind CSS', href: 'https://tailwindcss.com/' },
  { label: 'Radix UI', href: 'https://www.radix-ui.com/' },
]

function SourceList({ links }: { links: typeof sourceLinks }) {
  return (
    <ul className="flex flex-wrap gap-x-3 gap-y-1 text-sm">
      {links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-game-moss-strong underline decoration-game-moss/40 underline-offset-2 hover:text-game-clay"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  )
}

export function ProjectInfoDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label="About Pokeori, licensing, and sources"
          title="About Pokeori"
          className="game-focus-ring flex size-10 items-center justify-center rounded-lg border border-game-border bg-game-surface/90 text-game-ink shadow-lg shadow-black/20 backdrop-blur-md transition-colors hover:border-game-clay/60 hover:bg-game-surface-raised hover:text-game-clay focus-visible:outline-none"
        >
          <CircleAlert className="size-5" aria-hidden="true" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[min(86dvh,720px)] border-game-border bg-game-surface text-game-ink sm:max-w-xl">
        <DialogHeader>
          <p className="game-field-label">Field notes</p>
          <DialogTitle>About Pokeori</DialogTitle>
          <DialogDescription>
            An open-source, unofficial Pokémon fan project, currently released as v0.0.1.
          </DialogDescription>
        </DialogHeader>

        <section className="rounded-lg border border-game-clay/35 bg-game-clay/10 p-4">
          <h2 className="font-display text-base font-semibold text-game-ink">Important notice</h2>
          <p className="mt-2 text-sm leading-relaxed text-game-ink">
            Pokeori is not affiliated with, endorsed by, sponsored by, or otherwise associated with
            Nintendo, Creatures Inc., GAME FREAK inc., or The Pokémon Company. Pokémon, its
            characters, names, artwork, marks, and related intellectual property belong to their
            respective owners. This is a fan-made project, not an official Pokémon product.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-base font-semibold text-game-ink">Open-source license</h2>
          <p className="text-sm leading-relaxed text-game-muted">
            Original Pokeori source code is available under the MIT License. The full license is in
            the repository’s <code className="rounded bg-game-surface-raised px-1 py-0.5">LICENSE</code>{' '}
            file. Third-party software, data, media, and Pokémon intellectual property remain under
            their own terms and are not relicensed by Pokeori.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-base font-semibold text-game-ink">Data and media sources</h2>
          <p className="text-sm leading-relaxed text-game-muted">
            With thanks to the maintainers and contributors who make these community projects and
            services available:
          </p>
          <SourceList links={sourceLinks} />
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-base font-semibold text-game-ink">Open-source software</h2>
          <SourceList links={softwareLinks} />
        </section>

        <p className="text-xs leading-relaxed text-game-muted">
          See <code>ATTRIBUTIONS.md</code> in the repository for the complete source list and notices.
        </p>
      </DialogContent>
    </Dialog>
  )
}
