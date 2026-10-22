export type StartGameRequestArguments = [
  gameId: string,
  forceReset?: boolean,
  consumedPokemonIds?: string[],
  gridAdventureObjectKey?: string,
]

export function getStartGameRequestArguments(
  args: StartGameRequestArguments,
  firstAttempt: boolean,
): StartGameRequestArguments {
  return [args[0], firstAttempt ? args[1] : false, args[2], args[3]]
}
