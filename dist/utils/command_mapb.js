import chalk from "chalk";
/**
 * Navigates to the previous page of locations in the Pokédex and displays them.
 *
 * @param state - The current application state, containing pagination URLs and the Pokédex API client.
 * @returns A promise that resolves when the operation is complete.
 */
export async function commandMapB(state) {
    const url = state.prevLocationsURL;
    if (!url) {
        console.log(chalk.red("❌ You're on the first page already."));
        return;
    }
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
