import type { State } from "../types";
import { logError, logGreenBright } from "../utils/index.js";

const DEFAULT_URL_LOCATION = "https://pokeapi.co/api/v2/location-area/";

/**
 * Fetches a list of location names from the Pokémon API and log it.
 * @param state - Current application state with API interface and pagination URLs.
 * @returns Promise<void>
 */
export async function commandMap(state: State, ...args: string[]) {
	const url = state.nextLocationsURL || DEFAULT_URL_LOCATION;
	const locations = await state.pokeAPI.fetchLocations(url);
	if (!locations) {
		logError("Failed to fetch locations from the Pokédex API.");
		return;
	}

	state.nextLocationsURL = locations.next;
	state.prevLocationsURL = locations.previous;
	locations.results.forEach((result) => {
		logGreenBright(result.name);
	});
}
