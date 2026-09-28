# Music playback

`AudioProvider` plays regular audio files through the browser's native media player. Background music assets use AAC-LC in an MP4/M4A container: this preserves the original performance and is broadly playable across the browsers and devices used by the PWA. Mini-games use their authored track, then the active sub-region's track, then `/music/minigame.m4a`. Location encounters and battles similarly prefer their authored track, then the sub-region track, then `/music/battle.m4a`. This keeps area music playing across battles, catches, and research activities. Pallet Town uses `/music/seaside.m4a`; Viridian City, Viridian Forest, Pewter City, Cerulean City, Celadon City, Lavender Town, Pokemon Tower, Fuchsia City, Safari Zone, Saffron City, and Vermilion City use their matching tracks. Mt. Moon, Rock Tunnel, Digletts Cave, and Kanto Underground share `/music/cave.m4a`; Celadon Game Corner uses `/music/game-corner.m4a`. The Test area shares the mini-game track.

The local originals in `original music/` report Opus audio streams, so transcode them instead of renaming them or converting them to MIDI. That source folder is ignored by Git; only the compressed runtime assets are committed. MIDI playback remains available for explicit `.mid`/`.midi` URLs, but its lightweight synthesized voice cannot reproduce the original recording or instrument timbres.

The mini-game and seaside tracks use 64 kbps AAC-LC and are about 198 KiB and 482 KiB. The longer battle and Viridian tracks use 48 kbps and are approximately 852 KiB and 1.06 MiB. Lavender Town and Pokemon Tower also use 48 kbps and are about 1.24 MiB each. The cave, Celadon, Cerulean, Game Corner, Pewter, and Viridian Forest tracks use 48 kbps and range from 0.96 MiB to 1.19 MiB. Fuchsia is about 1.19 MiB; Safari Zone 0.81 MiB; Saffron 0.83 MiB; and Vermilion 0.74 MiB, all at 48 kbps. Convert local originals with FFmpeg:

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

Keep stereo unless the source is intentionally mono. Music loops, fades, mute state, and autoplay-resume behavior are managed by `AudioProvider`.
