export function formatPokemonFaintedMessage(
  ownerName: string,
  pokemonName: string,
  options: { isWildBattle?: boolean } = {},
) {
  if (options.isWildBattle && ownerName === 'Wild Pokemon') {
    return `${pokemonName} fainted!`
  }

  return `${ownerName}'s ${pokemonName} fainted!`
}
