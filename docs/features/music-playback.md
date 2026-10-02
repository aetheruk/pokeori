# Music playback

`AudioProvider` plays regular audio files through the browser's native media player. Background music uses AAC-LC in an MP4/M4A container. Mini-games use their authored track, then the active sub-region's track, then `/music/minigame.m4a`. Location encounters prefer their authored track, then the sub-region track, then `/music/battle.m4a`. Trainer battles use `/music/rocket-battle.m4a` for Rocket opponents, then an authored battle track, the sub-region track, and `/music/battle.m4a`. Battle Bets uses the Rocket theme because its simulated trainers are both Rocket Grunts.

The current Kanto set has a recording for each authored area, including separate tracks for Rock Tunnel and Digletts Cave. Pallet Town uses `/music/seaside.m4a`; the Test area uses `/music/minigame.m4a`. During the Saffron takeover blackout, the `???` area continues to use `/music/saffron-takeover.m4a`, the sole retained track from the previous set. Music files in the ignored local `original music/future/` folder are reserved for later content and are not shipped or assigned.

The refreshed source recordings in `original music/` are Opus streams in M4A containers. Transcode them to browser-compatible stereo AAC-LC at 160 kbps and 48 kHz, strip source metadata, and move the M4A index to the front for streaming. This keeps the new music substantially closer to the source quality than the previous 48 kbps exports. Map the source names to runtime names as follows: `battle-theme` to `battle`, `pallet` to `seaside`, `vermillion` to `vermilion`, `rock tunnel` to `rock-tunnel`, and `digletts-cave` to `digletts-cave`; the other source names map directly, with spaces changed to hyphens where needed.

For example:

```sh
ffmpeg -i "original music/battle-theme.m4a" -map_metadata -1 -vn -c:a aac -profile:a aac_low -b:a 160k -ac 2 -ar 48000 -movflags +faststart public/music/battle.m4a
```

Do not copy files from `original music/future/` until those tracks have an authored in-game use. The `saffron-takeover.m4a` asset is intentionally kept as-is. The previous unassigned `event-battle.m4a`, generic `cave.m4a`, and legacy MIDI soundtrack files are not part of the refreshed runtime set.

Repeated requests for the currently playing music URL reuse the active player instead of seeking back to the beginning, so entering a battle or catch encounter on the same area track preserves playback position. Activity replays refresh their session in-app and remount only the activity UI, keeping the shared audio provider alive. Music loops, fades, mute state, and autoplay-resume behavior are managed by `AudioProvider`.
