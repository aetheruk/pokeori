type MidiEvent =
  | { tick: number; order: number; type: 'tempo'; microsecondsPerBeat: number }
  | { tick: number; order: number; type: 'program'; channel: number; program: number }
  | { tick: number; order: number; type: 'note-on'; channel: number; note: number; velocity: number }
  | { tick: number; order: number; type: 'note-off'; channel: number; note: number }

interface MidiNote {
  startTime: number
  duration: number
  note: number
  velocity: number
  program: number
}

interface MidiSequence {
  notes: MidiNote[]
  duration: number
}

export interface MidiMusicPlayer {
  resume: () => Promise<void>
  isRunning: () => boolean
  stop: (fadeMs?: number, onStopped?: () => void) => void
}

const MINIMUM_GAIN = 0.0001

function readVariableLength(data: DataView, position: number, end: number) {
  let value = 0

  for (let count = 0; count < 4; count += 1) {
    if (position >= end) throw new Error('Unexpected end of MIDI data')
    const byte = data.getUint8(position)
    position += 1
    value = (value << 7) | (byte & 0x7f)

    if ((byte & 0x80) === 0) return { value, position }
  }

  throw new Error('Invalid MIDI variable length value')
}

function readTrack(
  data: DataView,
  start: number,
  end: number,
  order: { value: number },
) {
  const events: MidiEvent[] = []
  let position = start
  let tick = 0
  let runningStatus = 0

  while (position < end) {
    const delta = readVariableLength(data, position, end)
    tick += delta.value
    position = delta.position

    let status = data.getUint8(position)
    if (status & 0x80) {
      position += 1
      if (status < 0xf0) runningStatus = status
    } else {
      status = runningStatus
      if (status === 0) throw new Error('MIDI event is missing a status byte')
    }

    if (status === 0xff) {
      if (position >= end) throw new Error('Unexpected end of MIDI metadata')
      const metaType = data.getUint8(position)
      position += 1
      const length = readVariableLength(data, position, end)
      position = length.position
      if (position + length.value > end) {
        throw new Error('MIDI metadata extends beyond its track')
      }

      if (metaType === 0x51 && length.value >= 3) {
        const microsecondsPerBeat =
          (data.getUint8(position) << 16) |
          (data.getUint8(position + 1) << 8) |
          data.getUint8(position + 2)
        events.push({
          tick,
          order: order.value++,
          type: 'tempo',
          microsecondsPerBeat,
        })
      }

      position += length.value
      if (metaType === 0x2f) break
      continue
    }

    if (status === 0xf0 || status === 0xf7) {
      const length = readVariableLength(data, position, end)
      position = length.position + length.value
      if (position > end) throw new Error('MIDI system-exclusive data is invalid')
      continue
    }

    if (status >= 0xf0) {
      const dataByteCount = status === 0xf1 || status === 0xf3 ? 1 : status === 0xf2 ? 2 : 0
      if (position + dataByteCount > end) {
        throw new Error('MIDI system event extends beyond its track')
      }
      position += dataByteCount
      runningStatus = 0
      continue
    }

    const command = status & 0xf0
    const channel = status & 0x0f
    const dataByteCount = command === 0xc0 || command === 0xd0 ? 1 : 2
    if (position + dataByteCount > end) {
      throw new Error('MIDI event extends beyond its track')
    }

    const first = data.getUint8(position)
    const second = dataByteCount === 2 ? data.getUint8(position + 1) : 0
    position += dataByteCount

    if (command === 0xc0) {
      events.push({
        tick,
        order: order.value++,
        type: 'program',
        channel,
        program: first,
      })
    } else if (command === 0x90 && second > 0) {
      events.push({
        tick,
        order: order.value++,
        type: 'note-on',
        channel,
        note: first,
        velocity: second,
      })
    } else if (command === 0x80 || (command === 0x90 && second === 0)) {
      events.push({
        tick,
        order: order.value++,
        type: 'note-off',
        channel,
        note: first,
      })
    }
  }

  return { events, endTick: tick }
}

function parseMidiSequence(buffer: ArrayBuffer): MidiSequence {
  const data = new DataView(buffer)
  if (data.byteLength < 14 || data.getUint32(0) !== 0x4d546864) {
    throw new Error('The file is not a Standard MIDI file')
  }

  const headerLength = data.getUint32(4)
  const format = data.getUint16(8)
  const trackCount = data.getUint16(10)
  const division = data.getUint16(12)
  if (headerLength < 6 || format > 1 || trackCount < 1) {
    throw new Error('Unsupported Standard MIDI format')
  }
  if (division & 0x8000) {
    throw new Error('SMPTE-timed MIDI files are not supported')
  }

  let position = 8 + headerLength
  const allEvents: MidiEvent[] = []
  let endTick = 0
  const order = { value: 0 }

  for (let trackIndex = 0; trackIndex < trackCount; trackIndex += 1) {
    if (position + 8 > data.byteLength || data.getUint32(position) !== 0x4d54726b) {
      throw new Error('MIDI track header is invalid')
    }
    const trackLength = data.getUint32(position + 4)
    const trackStart = position + 8
    const trackEnd = trackStart + trackLength
    if (trackEnd > data.byteLength) throw new Error('MIDI track is incomplete')

    const track = readTrack(data, trackStart, trackEnd, order)
    allEvents.push(...track.events)
    endTick = Math.max(endTick, track.endTick)
    position = trackEnd
  }

  allEvents.sort((left, right) => left.tick - right.tick || left.order - right.order)

  const activeNotes = new Map<string, MidiNote[]>()
  const programs = new Array<number>(16).fill(0)
  const notes: MidiNote[] = []
  let currentTick = 0
  let currentTime = 0
  let tempo = 500_000

  for (const event of allEvents) {
    currentTime += ((event.tick - currentTick) * tempo) / (division * 1_000_000)
    currentTick = event.tick

    if (event.type === 'tempo') {
      tempo = event.microsecondsPerBeat || tempo
    } else if (event.type === 'program') {
      programs[event.channel] = event.program
    } else if (event.type === 'note-on') {
      const key = `${event.channel}:${event.note}`
      const active = activeNotes.get(key) ?? []
      active.push({
        startTime: currentTime,
        duration: 0,
        note: event.note,
        velocity: event.velocity / 127,
        program: programs[event.channel],
      })
      activeNotes.set(key, active)
    } else {
      const key = `${event.channel}:${event.note}`
      const active = activeNotes.get(key)
      const note = active?.shift()
      if (!note) continue
      const duration = currentTime - note.startTime
      notes.push({
        startTime: note.startTime,
        duration: Math.max(duration, 0.025),
        note: note.note,
        velocity: note.velocity,
        program: note.program,
      })
      if (active?.length === 0) activeNotes.delete(key)
    }
  }

  const duration =
    currentTime + ((endTick - currentTick) * tempo) / (division * 1_000_000)
  for (const active of activeNotes.values()) {
    for (const note of active) {
      notes.push({
        startTime: note.startTime,
        duration: Math.max(duration - note.startTime, 0.025),
        note: note.note,
        velocity: note.velocity,
        program: note.program,
      })
    }
  }

  if (notes.length === 0 || duration <= 0) {
    throw new Error('The MIDI file does not contain playable notes')
  }

  return { notes, duration }
}

function getPianoWave(context: AudioContext) {
  const real = new Float32Array(8)
  const imaginary = new Float32Array(8)
  imaginary[1] = 1
  imaginary[2] = 0.48
  imaginary[3] = 0.22
  imaginary[4] = 0.1
  imaginary[5] = 0.045
  imaginary[6] = 0.02
  imaginary[7] = 0.01
  return context.createPeriodicWave(real, imaginary)
}

export async function createMidiMusicPlayer(
  url: string,
  options: { loop: boolean; volume: number },
): Promise<MidiMusicPlayer> {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Unable to load MIDI music: ${response.status}`)

  const sequence = parseMidiSequence(await response.arrayBuffer())
  const context = new AudioContext()
  const masterGain = context.createGain()
  masterGain.gain.value = options.volume
  masterGain.connect(context.destination)

  const pianoWave = getPianoWave(context)
  const activeVoices = new Set<OscillatorNode>()
  let loopTimer: ReturnType<typeof setTimeout> | null = null
  let stopTimer: ReturnType<typeof setTimeout> | null = null
  let stopped = false
  let onStopped: (() => void) | undefined

  const scheduleSequence = (startAt: number) => {
    for (const note of sequence.notes) {
      const noteStart = startAt + note.startTime
      const noteEnd = noteStart + note.duration
      const oscillator = context.createOscillator()
      const envelope = context.createGain()
      const peak = Math.max(0.012, note.velocity * 0.17)

      oscillator.setPeriodicWave(pianoWave)
      oscillator.frequency.setValueAtTime(
        440 * 2 ** ((note.note - 69) / 12),
        noteStart,
      )
      envelope.gain.setValueAtTime(MINIMUM_GAIN, noteStart)
      envelope.gain.exponentialRampToValueAtTime(peak, noteStart + 0.012)
      if (note.duration > 0.025) {
        envelope.gain.setTargetAtTime(
          peak * 0.3,
          Math.min(noteStart + 0.075, noteEnd),
          0.2,
        )
      }
      envelope.gain.setTargetAtTime(MINIMUM_GAIN, noteEnd, 0.055)
      oscillator.connect(envelope)
      envelope.connect(masterGain)
      oscillator.onended = () => {
        activeVoices.delete(oscillator)
        oscillator.disconnect()
        envelope.disconnect()
      }
      activeVoices.add(oscillator)
      oscillator.start(noteStart)
      oscillator.stop(noteEnd + 0.28)
    }

    if (options.loop && !stopped) {
      const nextStart = startAt + sequence.duration
      const delayMs = Math.max((nextStart - context.currentTime - 0.06) * 1000, 0)
      loopTimer = setTimeout(() => {
        if (stopped) return
        scheduleSequence(Math.max(nextStart, context.currentTime + 0.06))
      }, delayMs)
    }
  }

  scheduleSequence(context.currentTime + 0.06)

  const stopImmediately = () => {
    stopped = true
    if (loopTimer) clearTimeout(loopTimer)
    if (stopTimer) clearTimeout(stopTimer)
    loopTimer = null
    stopTimer = null
    for (const voice of activeVoices) {
      try {
        voice.stop()
      } catch {
        // A voice may already have ended.
      }
    }
    void context.close().catch(() => {})
    onStopped?.()
    onStopped = undefined
  }

  return {
    resume: () => context.resume(),
    isRunning: () => !stopped && context.state === 'running',
    stop: (fadeMs = 0, onComplete) => {
      if (stopped) {
        onComplete?.()
        return
      }
      onStopped = onComplete
      if (fadeMs <= 0 || context.state !== 'running') {
        stopImmediately()
        return
      }

      stopped = true
      if (loopTimer) clearTimeout(loopTimer)
      loopTimer = null
      masterGain.gain.cancelScheduledValues(context.currentTime)
      masterGain.gain.setTargetAtTime(
        MINIMUM_GAIN,
        context.currentTime,
        Math.max(fadeMs / 4000, 0.01),
      )
      stopTimer = setTimeout(stopImmediately, fadeMs)
    },
  }
}
