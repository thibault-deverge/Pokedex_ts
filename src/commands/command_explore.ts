import type { State } from "../types";
import { logError, logGray, logGreenBright, printPokemonFound } from "../utils/index.js";

/**
 * Displays all Pokemon that can be found in a given location
 * @param state - Current app state with PokeAPI
 * @param args - Location name argument
 */
export async function commandExplore(state: State, ...args: string[]) {
	if (args.length !== 1) {
		logError("You must specify one location to explore. Try again, Trainer!");
		return;
	}

	const locationName = args[0];
	const locationData = await state.pokeAPI.fetchLocation(locationName);

	if (locationData && locationData.length > 0) {
		printPokemonFound(locationName);

		for (const pokemonName of locationData) {
			logGreenBright(` - ${pokemonName}`);
		}
	} else {
		locationData && logGray("No Pokemon found in this area. 🤔");
	}
}
