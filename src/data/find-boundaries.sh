#!/bin/bash
# Find exact boundaries for each generation
file="pokemon-data.ts"

echo "Finding generation boundaries..."

for id in 151 251 386 493 649 721 809 905 1025; do
  # Find the closing brace for this species
  line=$(grep -n "\"id\": $id," "$file" -A 100 | grep -n "^[0-9]*:  },$" | head -1 | cut -d: -f1)
  if [ -n "$line" ]; then
    # Calculate actual line number
    start_line=$(grep -n "\"id\": $id," "$file" | head -1 | cut -d: -f1)
    actual_line=$((start_line + line - 1))
    echo "Species $id ends at line: $actual_line"
  fi
done
