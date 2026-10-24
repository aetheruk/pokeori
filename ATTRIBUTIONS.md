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

The unchanged FRLG trainer character sheets in
`public/games/trainers/source/` come from the [FRLG Accurate NPC Megapack
(Relic Castle Edition)](https://www.mediafire.com/file/nbr92qe5uhorhlv/FRLG_Accurate_NPC_Megapack_%2528Relic_Castle_Edition%2529.zip/file),
compiled by SoulfulLex and released on 3 October 2021. Its included readme
credits the Bird Keeper sprite to Spherical Ice and the female Psychic sprite
to Kalarie, but does not identify every individual sprite artist or state an
open artwork license. Grid Adventure keeps the original sheets and uses each
sheet's full four-direction walking animation where registered. The pack does
not include a dedicated Channeler sheet. Professor Oak uses the full
four-direction `Anime Samuel Oak.png` sheet, credited to Kalarie in the pack.

The Kanto, Johto, and Sinnoh Gym Leader, Channeler, and several other trainer
walking sheets in `public/games/trainers/source/` come from the
[Gen 4 overworld collection on Eevee Expo](https://eeveeexpo.com/resources/404/).
The named files were shared in the
[v20 name-format archive](https://www.mediafire.com/file/s0b3ss441tlj5mi/OWs_w_v20_name_format.rar/file)
linked from the [Gen 4 and 5 trainer resource](https://eeveeexpo.com/resources/391/).
The collection credits Neo-Spriteman, VanillaSunshine, PurpleZaffre &
Maicerochico, and AtomicReactor. The selected 256×256 sheets are kept intact;
their four-by-four animation frames are 64×64 pixels. The source requests that
the resource pack itself not be redistributed and does not state an open artwork
license. Pokémon artwork and characters remain the property of their respective
rights holders. The matched leader sheets use NPC 63 for Jasmine, NPC 61 for
Morty, NPC 75 for Byron, NPC 76 for Candice, NPC 65 for Clair, and NPC 58 for
Falkner.

The Red and Leaf player walking sheets in `public/games/trainers/source/` were
extracted from [Essentials FRLG v1.1](https://eeveeexpo.com/resources/1797/),
which adapts Pokémon Essentials for FireRed/LeafGreen. The resource author says
their pack does not require direct credit and asks that the Pokémon Essentials
development team be credited. These are Pokémon game sprites; their rights
remain with their respective owners.

The Unova Gym Leader walk sheets in `public/games/trainers/source/` come from
the [Gen 5 Characters in Gen 4 OW style pack](https://eeveeexpo.com/resources/370/)
by DiegoWT. The selected original four-direction sheets are kept intact, with
64×64 animation frames. The source requests credit and asks that the pack not be
redistributed; it does not state an open artwork license. Pokémon characters
and artwork remain the property of their respective rights holders.

## Pokémon overworld sprites

The Ditto, Rattata and Voltorb overworld sheets in `public/games/overworld/` come from [Following Pokémon EX 2.5.1 on Eevee Expo](https://eeveeexpo.com/resources/516/), downloaded 8 September 2026. The full 256×256 sheets are unchanged; `*-idle.png` files extract the first 64×64 downward-facing frame. The resource requests credit when used: NoNonever, Golisopod User, Help-14, zingzags, Rayd12smitty, mej71, PurpleZaffre, Akizakura16, Thundaga, Armin (Fairies Resource Pack), and Maruno. No separate open-source artwork license is stated; Pokémon rights remain with their respective owners.

The Pokémon follower sheets under `public/games/overworld/pokemon-pack/` and the Gengar sheet in `public/games/overworld/gengar.png` come from [Generation 9 Pack v3.3.8](https://www.mediafire.com/file/a44ikbbztunn66m/Generation_9_Pack_v3.3.8.rar/file), compiled by Caruban. The pack credits its Gen 1–5 overworld sprites to MissingLukey, help-14, Kymoyonian, cSc-A7X, 2and2makes5, Pokegirl4ever, Fernandojl, Silver-Skies, TyranitarDark, Getsuei-H, Kid1513, Milomilotic11, Kyt666, kdiamo11, Chocosrawlooid, Syledude, Gallanty, Gizamimi-Pichu, Zyon17, and LarryTurbo; it does not identify individual artists for each sprite or state an open artwork license. Pokémon artwork remains owned by its respective rights holders.

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
- **Pokeori Grassy Route tile set** — grass floor tiles and generated wooden-fence back wall/open passage tiles arranged under `public/games/grid-tiles/grass`, with existing Pokeori gameplay artwork retained where the set has no equivalent.
- **Pokeori Pokémon Tower tile set** — AI-generated plum stone floor and stained-glass shrine wall tiles under `public/games/grid-tiles/pokemon-tower`; shared blockers and gameplay markers reuse the Psychic Quiet Room palette.

Every sprite set records its source, creator, link, license, and required notice in `src/data/games/grid-tiles`. External packs must be added both to that registry, which feeds the in-app Credits & Legal dialog, and to this file before their assets are used.

## Pokeori-original material

Unless a file or source is identified above as third-party or generated from third-party data, Pokeori-authored code, documentation, interface styling, and original artwork are covered by the MIT License. Generated files may include source metadata or references that should remain intact.
