# Trainer journal

The Trainer destination at `/game` is a field-journal hub. Its `section` query parameter can select `profile`, `decks`, `trainers`, `friends`, `gift`, or `rankings`; unavailable sections return to the profile when Kid Mode or inventory gates apply.

Registry results, friends, and Rankings use one compact trainer-row pattern and open the same full-screen public field note. It uses the shared scenic result frame with a large identity icon and white close control at every viewport. It shows only public identity, collection totals, skills, and a safe battle-team summary containing Pokémon name, species/form, level, rarity treatment, and team position.

Public trainer summaries are assembled in three batched state reads for the whole result set: TCG cards, Pokédex records, and assigned battle-team Pokémon. Friends therefore expose the same truthful data as registry and ranking results without per-trainer state queries.

Kid Mode continues to hide and server-block the registry, friends, Mystery Gift, and rankings. TCG deck management remains visible only when the player owns a Deck Box.
