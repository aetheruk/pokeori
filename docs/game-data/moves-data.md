# Moves Data

Structure of move data in `src/data/moves/`.

## Move Module Example
```typescript
export const movesData = {
  "tackle": {
    name: "Tackle",
    type: "normal",
    power: 40,
    accuracy: 100,
    pp: 35,
    category: "physical",
    priority: 0,
    target: "selected",
    effect: null
  }
}
```

## Fields
| Field | Type | Description |
|-------|------|-------------|
| name | string | Move display name |
| type | string | Move type (fire, water, etc.) |
| power | number | Base power (0 for status moves) |
| accuracy | number | Accuracy percentage (0 for always hit) |
| pp | number | Max PP |
| category | string | "physical", "special", "status" |
| priority | number | Move priority (-7 to 7) |
| target | string | "selected", "self", "all", etc. |
| effect | string | Status effect applied |

## Type Chart
Located in `src/utilities/battle/engine/type-chart.ts`:
- 0: No effect
- 0.5: Not very effective
- 1: Normal effectiveness
- 2: Super effective
