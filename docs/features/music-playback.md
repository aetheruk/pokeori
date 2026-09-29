# Music playback

`AudioProvider` plays regular audio files through the browser's native media player. Background music assets use AAC-LC in an MP4/M4A container: this preserves the original performance and is broadly playable across the browsers and devices used by the PWA. Mini-games use their authored track, then the active sub-region's track, then `/music/minigame.m4a`. Location encounters and battles similarly prefer their authored track, then the sub-region track, then `/music/battle.m4a`. This keeps area music playing across battles, catches, and research activities. Pallet Town uses `/music/seaside.m4a`; Viridian City, Viridian Forest, Pewter City, Cerulean City, Celadon City, Lavender Town, Pokemon Tower, Fuchsia City, Safari Zone, Saffron City, and Vermilion City use their matching tracks. Mt. Moon uses `/music/mt-moon.m4a`, Kanto Underground uses `/music/kanto-underground.m4a`, and Rock Tunnel, Digletts Cave, Seafoam Islands, Victory Road, and Cerulean Cave use `/music/cave.m4a`. Celadon Game Corner uses `/music/game-corner.m4a`. The Test area shares the mini-game track. The new `/music/event-battle.m4a` asset is prepared for later use and is not assigned yet.

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
