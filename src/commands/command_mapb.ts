import type { State } from "../types";
import { logError, logGreenBright } from "../utils/index.js";

/**
 * Navigates to the previous page of locations in the Pokédex and displays them.
 *
 * @param state - The current application state.
 * @returns A promise that resolves when the operation is complete.
 */
export async function commandMapB(state: State, ...args: string[]) {
	const url = state.prevLocationsURL;
	if (!url) {
		logError("You're on the first page already.");
		return;
	}

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
