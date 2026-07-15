# Mini-Games UX/UI Audit Document

**Date:** May 7, 2026

---

## Executive Summary

This document provides an audit of all mini-games in the Pokeori application. It covers UX/UI patterns, common issues, and areas for improvement aligned with the app's config-based approach.

---

## 1. Games Inventory

### Implemented Mini-Games (19 games)

| Game Type | File | Category | Notes |
|----------|------|----------|-------|
| Fishing | `fishing.tsx` | Timing | Rod selection + reaction mechanic |
| Slots | `slots.tsx` | Luck | 3-reel slot machine |
| Match3 | `match3.tsx` | Puzzle | Crystal matching |
| Pachinko | `pachinko.tsx` | Physics | Plinko ball drop |
| Prize Wheel | `prize-wheel.tsx` | Luck | Spinning wheel |
| Rhythm | `rhythm.tsx` | Timing | Note hitting |
| Flap | `flap.tsx` | Skill | Flappy bird clone |
| Run | `run.tsx` | Endless | Side-scroller |
| Mining | `mining.tsx` | Clicker | Click mining |
| Sliding Puzzle | `sliding-puzzle.tsx` | Puzzle | 8/15 puzzle |
| Pokemon Snap | `pokemon-snap.tsx` | Timing | Photo capture |
| Identify | `quick-identify.tsx` | Knowledge | Quick tap |
| Compare | `research-compare.tsx` | Knowledge | Stat comparison |
| Spelling | `spelling.tsx` | Knowledge | Name spelling |
| Whos That | `whos-that-pokemon.tsx` | Knowledge | Silhouette reveal |
| Cry Recognition | `cry-recognition.tsx` | Knowledge | Sound ID |
| Rock Push | `rock-push.tsx` | Physics | Push rocks |
| Fishing | `fishing.tsx` | Timing | Multiple rods |

---

## 2. Common UX/UI Patterns

### 2.1 Game Entry Point Pattern
All games follow a consistent entry pattern:

```tsx
interface GameProps {
  encounter: GameConfig
  initialState?: any
}

export function Game({ encounter, initialState }: GameProps) {
  useGameMusic(encounter)
  const { playSfx } = useAudio()
  // ... game state
}
```

**Status:** Consistent across all games ✅

### 2.2 State Management Pattern
Most games use these React hooks:

| Pattern | Usage | Games |
|---------|-------|-------|
| useState | Game phase, score, timer | All |
| useRef | Animation frames, physics | Physics games |
| useCallback | Event handlers | All |
| useEffect | Game loop, timers | All |

**Status:** Consistent ✅

### 2.3 Timer Pattern
Most games use `GameTimer` component with similar patterns:

```tsx
const [timeLeft, setTimeLeft] = useState(encounter.settings.timeLimit || 60)
```

**Status:** Consistent ✅

### 2.4 Result Overlay Pattern
All games use `RewardResultOverlay`:

```tsx
{result && (
  <RewardResultOverlay
    result={result}
    onContinue={() => router.push('/game/research')}
  />
)}
```

**Status:** Consistent ✅

### 2.5 Input Handling Pattern

| Game Type | Input Method | Mobile Support |
|----------|-------------|---------------|
| Timing | Click/Tap | ✅ |
| Puzzle | Drag/Touch | ⚠️ Partial |
| Rhythm | Keyboard/Tap | ✅ |
| Physics | Click/Tap | ✅ |
| Knowledge | Keyboard/Search | ⚠️ Partial |

---

## 3. Current UX/UI Issues

### 3.1 Mobile/Touch Issues

#### Issue: Touch Drag Not Optimized
**Files:** `match3.tsx`, `sliding-puzzle.tsx`
**Problem:** Drag operations don't account for touch precisely on mobile
**Severity:** Medium

**Recommendation:** Add touch-action CSS and optimize drag thresholds:

```css
.touch-draggable {
  touch-action: none;
  touch-drag-threshold: 10px;
}
```

#### Issue: Keyboard Required for Some Games
**Files:** `whos-that-pokemon.tsx`, `spelling.tsx`
**Problem:** Mobile keyboard covers game area
**Severity:** High

**Recommendation:** Add mobile input mode selector (multiple choice vs typing)

#### Issue: Small Tap Targets
**Files:** `rhythm.tsx`, `pachinko.tsx`
**Problem:** Hit areas too small on mobile devices
**Severity:** Medium

**Recommendation:** Increase minimum tap target to 44x44px

### 3.2 Visual Issues

#### Issue: Inconsistent Animations
**Files:** Most games
**Problem:** No standardized animation durations
**Severity:** Low

**Recommendation:** Create shared animation constants:

```typescript
// data/games/shared/constants.ts
export const GAME_ANIMATIONS = {
  POP_IN: 200,
  FADE_OUT: 150,
  SCORE_TICK: 80,
  RESULT_DISPLAY: 400,
} as const
```

#### Issue: No Loading States for Assets
**Files:** All games
**Problem:** Assets load after game starts causing jank
**Severity:** Medium

**Recommendation:** Add PreloadGuard component

#### Issue: Screen Size Not Handled
**Files:** `flap.tsx`, `run.tsx`, `fishing.tsx`
**Problem:** Canvas doesn't scale properly on different screens
**Severity:** High

**Recommendation:** Use responsive canvas with fixed aspect ratio

### 3.3 Audio/Sensory Issues

#### Issue: No Audio Toggle in Game
**Files:** All games
**Problem:** Users can't adjust game audio separately
**Severity:** Low

**Recommendation:** Add quick audio toggle in game HUD

#### Issue: Cry Recognition Relies on Network
**Files:** `cry-recognition.tsx`
**Problem:** Uses remote URLs that may fail
**Severity:** High

**Recommendation:** Cache cries locally for PWA offline support

### 3.4 Game Loop Issues

#### Issue: requestAnimationFrame Not Paused
**Files:** `flap.tsx`, `run.tsx`, `rhythm.tsx`
**Problem:** Game loop continues when tab inactive
**Severity:** High

**Recommendation:** Use visibility API:

```typescript
useEffect(() => {
  const handleVisibility = () => {
    if (document.hidden) {
      pauseGame()
    }
  }
  document.addEventListener('visibilitychange', handleVisibility)
  return () => document.removeEventListener('visibilitychange', handleVisibility)
}, [])
```

#### Issue: Timer Not Paused on Inactive
**Files:** Most games
**Problem:** Timer continues when app backgrounded
**Severity:** High

**Recommendation:** Pause timer on visibility change

### 3.5 Config Issues

#### Issue: Types Not Centralized
**Files:** `data/games/*/types.ts`
**Problem:** Each game has its own type definitions
**Severity:** Low

**Recommendation:** Create unified `GameConfig` union type

---

## 4. Feature-Specific Issues

### 4.1 Fishing Game
- Rod selection UI could be more prominent on mobile
- Reaction timer may be too fast on low-end devices
- Bubble animation creates performance issues on older phones

### 4.2 Slots Game
- Spin animation timing varies by device
- No haptic feedback on win/loss
- Payline visualization could be clearer

### 4.3 Match3 Game
- Cascade animations cause jank on mobile
- Grid size not responsive
- Touch and drag conflict with scroll

### 4.4 Rhythm Game
- Keyboard required for best experience
- Touch tap has input lag on some devices
- No visual cue for upcoming beats on mobile

### 4.5 Flap/Run Games
- Canvas doesn't resize properly
- No pause mechanism
- Score not persisted on crash

### 4.6 Knowledge Games (Compare, Spelling, etc.)
- Keyboard required makes them mobile-unfriendly
- Search/autocomplete doesn't work in PWA offline mode
- Timer should pause when keyboard is open on mobile

### 4.7 Physics Games (Pachinko, Rock Push)
- Ball physics not deterministic across devices
- No replay feature
- Collision detection issues on edge cases

---

## 5. Recommendations by Priority

### High Priority (Fix Now)

1. **Visibility API Integration**
   - Pause all game loops when tab hidden
   - Pause timers when app backgrounded
   - Files: All physics and timing games

2. **Mobile Touch Optimization**
   - Increase tap targets to 44x44px minimum
   - Add touch-action: none to drag elements
   - Files: match3, rhythm, pachinko

3. **Offline Asset Caching**
   - Cache all game assets locally
   - Files: cry-recognition, all games with images

4. **Screen Size Responsiveness**
   - Use responsive canvas with aspect ratio
   - Scale game elements proportionally

### Medium Priority (Next Sprint)

5. **Unified Loading States**
   - Add loading skeleton while assets load
   - Preload critical assets before game starts

6. **Audio Toggle**
   - Add in-game audio mute/unmute
   - Separate game music from SFX controls

7. **Mobile Input Modes**
   - Add multiple choice fallback for typing games
   - Optimize search input for mobile

8. **Animation Standards**
   - Create shared animation constants
   - Standardize transition durations

### Low Priority (Backlog)

9. **Haptic Feedback**
   - Add vibration on key interactions
   - Win/loss feedback patterns

10. **Replay System**
    - Allow replays without score penalty
    - Save game state for crash recovery

11. **Leaderboard Integration**
    - Per-game high scores
    - Regional/global rankings

12. **Tutorial Overlays**
    - First-time user guidance
    - Game-specific hints

---

## 6. Config-Based Improvements

### 6.1 Extendable Game Config Schema

Current schema works well but could be extended:

```typescript
interface GameSettings {
  // Existing fields
  timeLimit?: number
  winScore?: number
  
  // New fields for consistency
  responsiveSettings?: {
    minTapSize: number
    maxCanvasWidth: number
    aspectRatio: number
  }
  audioSettings?: {
    required: boolean
    defaultMuted: boolean
  }
  mobileSettings?: {
    inputModes: ('touch' | 'keyboard' | 'multiple-choice')[]
    defaultInputMode: 'touch' | 'keyboard' | 'multiple-choice'
  }
  visibilitySettings?: {
    pauseOnHidden: boolean
    pauseTimerOnHidden: boolean
  }
}
```

### 6.2 Game Component Registry

Add a registry for config-based rendering:

```typescript
// data/games/registry.ts
import { FishingGame } from './fishing'
import { SlotsGame } from './slots'
// ...

const GAME_COMPONENTS = {
  fishing: FishingGame,
  slots: SlotsGame,
  // ...
} as const

export function getGameComponent(gameType: string) {
  return GAME_COMPONENTS[gameType] || null
}
```

---

## 7. Testing Checklist

### Mobile Testing (Required)
- [ ] iOS Safari (latest)
- [ ] iOS PWA mode
- [ ] Android Chrome (latest)
- [ ] Android PWA mode
- [ ] Low-end Android device (2GB RAM)

### Accessibility Testing (Required)
- [ ] VoiceOver/iOS
- [ ] TalkBack/Android
- [ ] Keyboard-only navigation

### Network Testing (Required)
- [ ] Offline mode (cached)
- [ ] Slow 3G simulation
- [ ] Connection drop mid-game

---

## 8. Appendix: File Reference

### Games Directory Structure
```
src/app/(frontend)/game/research/encounter/
├── fishing.tsx           # Fishing game
├── slots.tsx            # Slot machine
├── match3.tsx           # Match-3 puzzle
├── pachinko.tsx         # Pachinko/Plinko
├── prize-wheel.tsx        # Prize wheel
├── rhythm.tsx            # Rhythm game
├── flap.tsx             # Flappy bird clone
├── run.tsx              # Endless runner
├── mining.tsx            # Click mining
├── sliding-puzzle.tsx    # Sliding puzzle
├── pokemon-snap.tsx      # Pokemon Snap
├── quick-identify.tsx     # Quick identify
├── research-compare.tsx  # Stat compare
├── spelling.tsx         # Name spelling
├── whos-that-pokemon.tsx # Whos that Pokemon
├── cry-recognition.tsx  # Cry recognition
├── rock-push.tsx        # Rock push
└── actions.ts           # Shared actions
```

### Game Configs
```
src/data/games/*/
├── types.ts             # Type definitions
├── index.ts            # All game configs
└── entries/           # Region-specific configs
```

---

**Document Status:** Draft
**Last Updated:** May 7, 2026