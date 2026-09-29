# Music playback

`AudioProvider` plays regular audio files through the browser's native media player. Background music assets use AAC-LC in an MP4/M4A container: this preserves the original performance and is broadly playable across the browsers and devices used by the PWA. Mini-games use their authored track, then the active sub-region's track, then `/music/minigame.m4a`. Location encounters prefer their authored track, then the sub-region track, then `/music/battle.m4a`. Trainer battles use `/music/rocket-battle.m4a` for Rocket opponents, then an authored battle track, the sub-region track, and `/music/battle.m4a`. Battle Bets explicitly uses the Rocket theme because its simulated trainers are both Rocket Grunts. This keeps area music playing across ordinary battles, catches, and research activities while giving Rocket battles their own theme.

The final Kanto area tracks are assigned as follows: Pewter School uses `/music/pewter-school.m4a`; Power Plant uses `/music/power-plant.m4a`; Cycling Road uses `/music/cycling-road.m4a`; Rocket Factory uses `/music/rocket-factory.m4a`; Silph Co uses `/music/silph-co.m4a`; Seafoam Islands uses `/music/seafoam.m4a`; Cinnabar Island uses `/music/cinnabar.m4a`; Pokemon Mansion uses `/music/pokemon-mansion.m4a`; Cerulean Cave uses `/music/cerulean-cave.m4a`; Victory Road uses `/music/victory-road.m4a`; and Indigo Plateau uses `/music/indigo-plateau.m4a`. The new Viridian City recording replaces `/music/viridian.m4a`. During the Saffron takeover blackout, the `???` area plays `/music/saffron-takeover.m4a`. Rocket Factory is a locked future Kanto sub-region with its own `/backgrounds/rocket-factory.avif` scene artwork; it remains inaccessible until its story access requirement is authored.

Pallet Town uses `/music/seaside.m4a`; Viridian Forest, Pewter City, Cerulean City, Celadon City, Lavender Town, Pokemon Tower, Fuchsia City, Safari Zone, Saffron City, Vermilion City, Mt. Moon, Kanto Underground, Rock Tunnel, Digletts Cave, Celadon Game Corner, and the Test area keep their previously assigned tracks. The Test area shares the mini-game track. The `/music/event-battle.m4a` asset remains prepared for later use and is not assigned.

Repeated requests for the currently playing music URL reuse the active player instead of seeking back to the beginning, so entering a battle or catch encounter on the same area track preserves playback position.

Activity replays refresh their session in-app and remount only the activity UI, keeping the shared audio provider alive so replay does not interrupt its music. Arcade mini-games use the same in-app refresh rather than a full browser reload.

The local originals in `original music/` report Opus audio streams, so transcode them instead of renaming them or converting them to MIDI. The source folder is ignored by Git; only the compressed runtime assets are committed. The tracks in `original music/new/` were exported as stereo 48 kbps AAC-LC at 48 kHz with metadata stripped and the M4A index moved to the front for streaming. For example:

```sh
ffmpeg -i "original music/new/vermilion new.m4a" -map_metadata -1 -vn -c:a aac -profile:a aac_low -b:a 48k -ac 2 -ar 48000 -movflags +faststart public/music/vermilion.m4a
```

MIDI playback remains available for explicit `.mid`/`.midi` URLs, but its lightweight synthesized voice cannot reproduce the original recording or instrument timbres.

The mini-game and seaside tracks use 64 kbps AAC-LC and are about 198 KiB and 482 KiB. The refreshed battle, cave, Celadon, Cerulean, Fuchsia, Vermilion, and Viridian Forest tracks use 48 kbps and range from 0.68 MiB to 1.41 MiB. Mt. Moon is 1.33 MiB, Kanto Underground 0.90 MiB, and the unused event-battle track 0.99 MiB. Lavender Town and Pokemon Tower also use 48 kbps and are about 1.24 MiB each. Game Corner and Pewter range from 0.96 MiB to 1.19 MiB. Safari Zone is 0.81 MiB and Saffron is 0.83 MiB. Convert local originals with FFmpeg:

```sh
ffmpeg -i "original music/minigame.m4a" -map_metadata -1 -vn -c:a aac -profile:a aac_low -b:a 64k -ac 2 -ar 48000 -movflags +faststart public/music/minigame.m4a
ffmpeg -i "original music/seaside town.m4a" -map_metadata -1 -vn -c:a aac -profile:a aac_low -b:a 64k -ac 2 -ar 48000 -movflags +faststart public/music/seaside.m4a
ffmpeg -i "original music/battle.m4a" -map_metadata -1 -vn -c:a aac -profile:a aac_low -b:a 48k -ac 2 -ar 48000 -movflags +faststart public/music/battle.m4a
ffmpeg -i "original music/viridian.m4a" -map_metadata -1 -vn -c:a aac -profile:a aac_low -b:a 48k -ac 2 -ar 48000 -movflags +faststart public/music/viridian.m4a
ffmpeg -i "original music/lavender.m4a" -map_metadata -1 -vn -c:a aac -profile:a aac_low -b:a 48k -ac 2 -ar 48000 -movflags +faststart public/music/lavender.m4a
ffmpeg -i "original music/pokemon-tower.m4a" -map_metadata -1 -vn -c:a aac -profile:a aac_low -b:a 48k -ac 2 -ar 48000 -movflags +faststart public/music/pokemon-tower.m4a
ffmpeg -i "original music/cave.m4a" -map_metadata -1 -vn -c:a aac -profile:a aac_low -b:a 48k -ac 2 -ar 48000 -movflags +faststart public/music/cave.m4a
ffmpeg -i "original music/celadon.m4a" -map_metadata -1 -vn -c:a aac -profile:a aac_low -b:a 48k -ac 2 -ar 48000 -movflags +faststart public/music/celadon.m4a
ffmpeg -i "original music/cerulean.m4a" -map_metadata -1 -vn -c:a aac -profile:a aac_low -b:a 48k -ac 2 -ar 48000 -movflags +faststart public/music/cerulean.m4a
ffmpeg -i "original music/game corner.m4a" -map_metadata -1 -vn -c:a aac -profile:a aac_low -b:a 48k -ac 2 -ar 48000 -movflags +faststart public/music/game-corner.m4a
ffmpeg -i "original music/pewter.m4a" -map_metadata -1 -vn -c:a aac -profile:a aac_low -b:a 48k -ac 2 -ar 48000 -movflags +faststart public/music/pewter.m4a
ffmpeg -i "original music/viridian forest.m4a" -map_metadata -1 -vn -c:a aac -profile:a aac_low -b:a 48k -ac 2 -ar 48000 -movflags +faststart public/music/viridian-forest.m4a
ffmpeg -i "original music/fuschia.m4a" -map_metadata -1 -vn -c:a aac -profile:a aac_low -b:a 48k -ac 2 -ar 48000 -movflags +faststart public/music/fuchsia.m4a
ffmpeg -i "original music/safari-zone.m4a" -map_metadata -1 -vn -c:a aac -profile:a aac_low -b:a 48k -ac 2 -ar 48000 -movflags +faststart public/music/safari-zone.m4a
ffmpeg -i "original music/saffron.m4a" -map_metadata -1 -vn -c:a aac -profile:a aac_low -b:a 48k -ac 2 -ar 48000 -movflags +faststart public/music/saffron.m4a
ffmpeg -i "original music/vermilion.m4a" -map_metadata -1 -vn -c:a aac -profile:a aac_low -b:a 48k -ac 2 -ar 48000 -movflags +faststart public/music/vermilion.m4a
```

Keep stereo unless the source is intentionally mono. Location encounter retries keep the shared audio provider mounted and restart the active location track from the Play Again action. Music loops, fades, mute state, and autoplay-resume behavior are managed by `AudioProvider`.
