# Music playback

`AudioProvider` plays regular audio files through the browser's native media player. Background music assets use AAC-LC in an MP4/M4A container: this preserves the original performance and is broadly playable across the browsers and devices used by the PWA. Mini-games default to `/music/minigame.m4a`; Pallet Town uses `/music/seaside.m4a`; Viridian City uses `/music/viridian.m4a`; Lavender Town and Pokemon Tower use their matching tracks. The Test area and Celadon Game Corner share the mini-game track. Battles and location encounters use `/music/battle.m4a` when no custom track is authored. Other areas without a custom track remain silent.

The local originals in `original music/` report Opus audio streams, so transcode them instead of renaming them or converting them to MIDI. That source folder is ignored by Git; only the compressed runtime assets are committed. MIDI playback remains available for explicit `.mid`/`.midi` URLs, but its lightweight synthesized voice cannot reproduce the original recording or instrument timbres.

The mini-game and seaside tracks use 64 kbps AAC-LC and are about 198 KiB and 482 KiB. The longer battle and Viridian tracks use 48 kbps and are approximately 852 KiB and 1.06 MiB. Lavender Town and Pokemon Tower also use 48 kbps and are about 1.24 MiB each. Convert local originals with FFmpeg:

```sh
ffmpeg -i "original music/minigame.m4a" -map_metadata -1 -vn -c:a aac -profile:a aac_low -b:a 64k -ac 2 -ar 48000 -movflags +faststart public/music/minigame.m4a
ffmpeg -i "original music/seaside town.m4a" -map_metadata -1 -vn -c:a aac -profile:a aac_low -b:a 64k -ac 2 -ar 48000 -movflags +faststart public/music/seaside.m4a
ffmpeg -i "original music/battle.m4a" -map_metadata -1 -vn -c:a aac -profile:a aac_low -b:a 48k -ac 2 -ar 48000 -movflags +faststart public/music/battle.m4a
ffmpeg -i "original music/viridian.m4a" -map_metadata -1 -vn -c:a aac -profile:a aac_low -b:a 48k -ac 2 -ar 48000 -movflags +faststart public/music/viridian.m4a
ffmpeg -i "original music/lavender.m4a" -map_metadata -1 -vn -c:a aac -profile:a aac_low -b:a 48k -ac 2 -ar 48000 -movflags +faststart public/music/lavender.m4a
ffmpeg -i "original music/pokemon-tower.m4a" -map_metadata -1 -vn -c:a aac -profile:a aac_low -b:a 48k -ac 2 -ar 48000 -movflags +faststart public/music/pokemon-tower.m4a
```

Keep stereo unless the source is intentionally mono. Music loops, fades, mute state, and autoplay-resume behavior are managed by `AudioProvider`.
