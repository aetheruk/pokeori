#!/usr/bin/env python3
"""
Splits src/data/evolutions.ts into generation-based modules.
"""

import re
import json
import os

SOURCE_FILE = 'src/data/evolutions.ts'
OUTPUT_DIR = 'src/data/evolutions'

# Generation ranges
GEN_RANGES = [
    ("gen1", 1, 151),
    ("gen2", 152, 251),
    ("gen3", 252, 386),
    ("gen4", 387, 493),
    ("gen5", 494, 649),
    ("gen6", 650, 721),
    ("gen7", 722, 809),
    ("gen8", 810, 905),
    ("gen9", 906, 1025),
]

def load_evolutions():
    with open(SOURCE_FILE, 'r') as f:
        content = f.read()

    # Try simplest regex first
    match = re.search(r'export const EVOLUTIONS[^=]*= ({[\s\S]*});$', content.strip())
    if not match:
        print("Could not find EVOLUTIONS object using strict regex. Trying manual line parsing...")
        return None
    
    print("Found JSON-like content. Attempting to parse...")
    json_str = match.group(1)
    
    # Simple cleanup to make it valid JSON
    # Remove single line comments
    json_str = re.sub(r'//.*$', '', json_str, flags=re.MULTILINE) 
    # Remove trailing commas
    json_str = re.sub(r',(\s*[}\]])', r'\1', json_str)
    
    try:
        return json.loads(json_str)
    except json.JSONDecodeError as e:
        print(f"JSON parse error: {e}")
        return None

def main():
    print("Loading evolutions data...")
    # Skip JSON loading for now and use robust line parsing
    # evolutions = load_evolutions()
    evolutions = None # Force manual parsing path which is safer for TS files
    
    if not evolutions:
        print("Using manual line-by-line parsing...")
        with open(SOURCE_FILE, 'r') as f:
            lines = f.readlines()
            
        gen_buffers = {name: [] for name, _, _ in GEN_RANGES}
        current_gen = "gen1" # Default to gen1 until we see a key
        
        in_object = False
        
        for line in lines:
            if 'export const EVOLUTIONS' in line:
                in_object = True
                continue
            
            if not in_object:
                continue
                
            # Check for start of a new entry: "1": [
            key_match = re.search(r'^\s*"(\d+)": \[', line)
            if key_match:
                species_id = int(key_match.group(1))
                # Find which gen this belongs to
                for name, start, end in GEN_RANGES:
                    if start <= species_id <= end:
                        current_gen = name
                        break
            
            # Additional safety: stop at end of file
            # Only stop if it is the very last line or clearly the end of the export
            if line.rstrip() == '};':
                 # This is the end of the EVOLUTIONS object
                 break

            if current_gen:
                gen_buffers[current_gen].append(line)

        # Write files
        for name, _, _ in GEN_RANGES:
            buffer = gen_buffers[name]
            if not buffer:
                print(f"No data for {name}")
                continue
            

            
            # Remove any trailing closing brace that might have been captured (especially for the last gen)
            if buffer and buffer[-1].strip() in ['}', '};']:
                buffer.pop()

            output_path = os.path.join(OUTPUT_DIR, f'{name}.ts')
            with open(output_path, 'w') as f:
                f.write(f'/**\n * {name.upper()} Evolutions\n */\n')
                f.write("import { Evolution } from './types';\n\n")
                f.write(f"export const {name}Evolutions: Record<number, Evolution[]> = {{\n")
                f.writelines(buffer)
                f.write("\n};\n")
                
            print(f"Created {output_path}")

if __name__ == '__main__':
    main()
