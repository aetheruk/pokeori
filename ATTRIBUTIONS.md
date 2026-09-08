# Pokeori attributions and notices

Pokeori is an unofficial Pokémon fan project. The original code in this repository is available under the [MIT License](./LICENSE), but that license does not relicense third-party content, grant rights to Pokémon intellectual property, or replace the terms of any upstream service.

## Pokémon fan-project notice

Pokeori is not affiliated with, endorsed by, sponsored by, or otherwise associated with Nintendo, Creatures Inc., GAME FREAK inc., or The Pokémon Company. Pokémon, Pokémon character names, artwork, marks, and related intellectual property belong to their respective owners.

Pokeori is made by fans for educational and entertainment purposes. Please do not present it as an official Pokémon product or use it to imply endorsement by the Pokémon rights holders.

## Data, sprites, audio, and card sources

Thank you to the maintainers and contributors of these community projects and services:

- [PokeAPI](https://pokeapi.co/) and the [PokeAPI repository](https://github.com/PokeAPI/pokeapi) for structured Pokémon data and API access.
- [PokeAPI sprites](https://github.com/PokeAPI/sprites) for the sprite repository used by the data and asset workflows.
- [PokeAPI cries](https://github.com/PokeAPI/cries) for the Pokémon cry source repository.
- [Pokémon TCG API](https://pokemontcg.io/) and [PokemonTCG/pokemon-tcg-data](https://github.com/PokemonTCG/pokemon-tcg-data) for community-maintained Pokémon TCG set and card data.
- [Pokémon TCG image service](https://images.pokemontcg.io/) for card image delivery used by the TCG workflows.

Pokémon-related names, characters, artwork, sprites, sounds, card designs, and trademarks remain owned by their respective rights holders. Check upstream repositories and services for their current terms before using or redistributing any derived data or assets.

The Lucas and Dawn overworld sheets in `public/games/trainers/` were supplied by the project owner as `NPC_198_Lucas.png` and `NPC_201_Dawn.png`. Pokémon character and sprite rights remain with their respective owners; no separate upstream source or license was supplied with these files.

## Pokémon overworld sprites

The Ditto, Rattata and Voltorb overworld sheets in `public/games/overworld/` come from [Following Pokémon EX 2.5.1 on Eevee Expo](https://eeveeexpo.com/resources/516/), downloaded 8 September 2026. The full 256×256 sheets are unchanged; `*-idle.png` files extract the first 64×64 downward-facing frame. The resource requests credit when used: NoNonever, Golisopod User, Help-14, zingzags, Rayd12smitty, mej71, PurpleZaffre, Akizakura16, Thundaga, Armin (Fairies Resource Pack), and Maruno. No separate open-source artwork license is stated; Pokémon rights remain with their respective owners.

## Open-source software

Pokeori is built with and thanks the maintainers of:

- [Bun](https://bun.sh/)
- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/)
- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Payload CMS](https://payloadcms.com/)
- [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide](https://lucide.dev/)
- [Biome](https://biomejs.dev/)
- [Sharp](https://sharp.pixelplumbing.com/)

Each dependency remains under its own license. Their license texts are available from their respective repositories or package distributions.

## Tile and environment packs

- **Pokeori Basic Cave tile set** — supplied 16×16 test tiles arranged under `public/games/grid-tiles/basic-cave`, with existing Pokeori boulder, filled-hole, goal, and player artwork retained for gameplay compatibility.
- **Pokeori Grass Field tile set** — supplied 16×16 and 32×32 grass test tiles arranged under `public/games/grid-tiles/grass`, with existing Pokeori gameplay artwork retained where the grass pack has no equivalent.

Every sprite set records its source, creator, link, license, and required notice in `src/data/games/grid-tiles`. External packs must be added both to that registry, which feeds the in-app Credits & Legal dialog, and to this file before their assets are used.

## Pokeori-original material

Unless a file or source is identified above as third-party or generated from third-party data, Pokeori-authored code, documentation, interface styling, and original artwork are covered by the MIT License. Generated files may include source metadata or references that should remain intact.
