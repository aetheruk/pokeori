# Trainer journal

The Trainer destination at `/game` is a field-journal hub. Its `section` query parameter can select `profile`, `decks`, `trainers`, `friends`, `gift`, or `rankings`; unavailable sections return to the profile when Kid Mode or inventory gates apply.

Registry results, friends, and skill rankings use one compact trainer-row pattern and open the same responsive public field note. The field note is a bottom sheet on touch layouts and a right-side inspector on wide screens. It shows only public identity, collection totals, skills, and a safe battle-team summary containing Pokémon name, species/form, level, rarity treatment, and team position.

Public trainer summaries are assembled in three batched state reads for the whole result set: TCG cards, Pokédex records, and assigned battle-team Pokémon. Friends therefore expose the same truthful data as registry and ranking results without per-trainer state queries.

Kid Mode continues to hide and server-block the registry, friends, Mystery Gift, and rankings. TCG deck management remains visible only when the player owns a Deck Box.
