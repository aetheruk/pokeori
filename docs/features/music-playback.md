# Music playback

`AudioProvider` plays regular audio files through the browser's native media player. Background music assets use AAC-LC in an MP4/M4A container: this preserves the original performance and is broadly playable across the browsers and devices used by the PWA. Mini-games default to `/music/minigame.m4a`; Pallet Town uses `/music/seaside.m4a`. The Test area and Celadon Game Corner share the mini-game track. Areas and battles without an authored track remain silent.

The root-level `.m4a` sources report an Opus audio stream, so transcode them instead of renaming them or converting them to MIDI. MIDI playback remains available for explicit `.mid`/`.midi` URLs, but its lightweight synthesized voice cannot reproduce the original recording or instrument timbres.

The current 64 kbps exports are about 198 KiB for the 24-second mini-game track and 482 KiB for the 60-second seaside track. To recreate them from the root sources with FFmpeg:

```sh
ffmpeg -i minigame.m4a -map_metadata -1 -vn -c:a aac -profile:a aac_low -b:a 64k -ac 2 -ar 48000 -movflags +faststart public/music/minigame.m4a
ffmpeg -i "seaside town.m4a" -map_metadata -1 -vn -c:a aac -profile:a aac_low -b:a 64k -ac 2 -ar 48000 -movflags +faststart public/music/seaside.m4a
```

For smaller assets, `-b:a 48k` yields about 149 KiB and 365 KiB respectively; listen for artifacts before replacing the 64 kbps versions. Keep stereo unless the source is intentionally mono. Music loops, fades, mute state, and autoplay-resume behavior are managed by `AudioProvider`.
