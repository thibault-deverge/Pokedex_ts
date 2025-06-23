import readline from "readline";
import chalk from "chalk";

import type { State } from "./types";
import { PokeAPI } from "./api/pokeapi.js";
import { getCommands } from "./commands/commands.js";

/**
 * Initializes and returns the global application state.
 * Sets up the readline interface, API handler, command registry, and initial Pokédex data.
 *
 * @returns The initialized application state object.
 */
export function initState(): State {
	return {
		rl: readline.createInterface({
			input: process.stdin,
			output: process.stdout,
			prompt: chalk.magentaBright.bold("🧭 Pokedex > "),
		}),
		pokeAPI: new PokeAPI(),
		pokedex: {},
		registry: getCommands(),
		nextLocationsURL: "https://pokeapi.co/api/v2/location-area/",
		prevLocationsURL: null,
	};
}
