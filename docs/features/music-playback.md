# Music playback

`AudioProvider` owns background music alongside sound effects and Pokémon cries. Music paths can point to audio files supported by the browser or to Standard MIDI files using `.mid` or `.midi`. MIDI files are fetched and sequenced through the Web Audio API with a small synthesized piano voice, so playback does not need a bundled soundfont or a large converted audio file. MIDI tempo, note timing, velocity, looping, muting, resume after an autoplay block, and fade stops are handled by the client player.

Research mini-games use `/music/minigame.midi` when their entry has no custom track. Pallet Town Explore uses `/music/seaside.midi`; the Test area and Celadon Game Corner use the shared mini-game track. Areas and battles without an authored track remain silent until a track is added.

The MIDI player currently supports format 0 and format 1 Standard MIDI files with ticks-per-quarter-note timing. SMPTE-timed files and format 2 sequences are not supported. The current tracks use the General MIDI Acoustic Grand Piano program.
