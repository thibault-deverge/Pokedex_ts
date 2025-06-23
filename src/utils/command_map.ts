import chalk from "chalk";
import type { State } from "src/state";

const DEFAULT_URL_LOCATION = "https://pokeapi.co/api/v2/location-area/";

/**
 * Fetches a list of locations from the Pokémon API and logs their names.
 * This function retrieves the next set of locations using the provided state,
 *
 * @param state - The current application state, which includes the Pokémon API interface and pagination URLs.
 * @returns A promise that resolves when the operation is complete.
 */
export async function commandMap(state: State, ...args: string[]) {
	const url = state.nextLocationsURL || DEFAULT_URL_LOCATION;
	const locations = await state.pokeAPI.fetchLocations(url);
	if (!locations) {
		console.log(chalk.red("❌ Failed to fetch locations from the Pokédex API."));
		return;
	}

	state.nextLocationsURL = locations.next;
	state.prevLocationsURL = locations.previous;
	locations.results.forEach((result) => {
		console.log(chalk.greenBright(result.name));
	});
}
