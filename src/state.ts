import readline from "readline";
import chalk from "chalk";

import type { Interface } from "readline";
import { PokeAPI, Pokemon } from "./pokeapi.js";
import { getCommands } from "./utils/commands.js";

export type State = {
	rl: Interface;
	pokeAPI: PokeAPI;
	pokedex: Record<string, Pokemon>;
	registry: Record<string, CLICommand>;
	nextLocationsURL: string | null;
	prevLocationsURL: string | null;
};

export type CLICommand = {
	name: string;
	description: string;
	callback: (state: State, ...args: string[]) => Promise<void>;
};

/**
 * Initializes the application state by creating a readline interface for user input
 * and retrieving the command registry.
 *
 * @returns {State} The initial state object containing the readline interface and command registry.
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
