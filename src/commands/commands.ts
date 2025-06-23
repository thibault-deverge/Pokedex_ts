import type { CLICommand } from "../types";

import * as cmd from "../commands/index.js";

/**
 * Returns a record of available CLI commands for the pokedex application.
 *
 * @returns {Record<string, CLICommand>} An object mapping command names to their corresponding CLICommand definitions.
 */
export function getCommands(): Record<string, CLICommand> {
	return {
		exit: {
			name: "exit",
			description: "Exits the pokedex",
			callback: cmd.commandExit,
		},
		help: {
			name: "help",
			description: "Displays a help message",
			callback: cmd.commandHelp,
		},
		map: {
			name: "map",
			description:
				"Display the name of 20 locations areas. Each subsequent call display the next 20 locations, and so on.",
			callback: cmd.commandMap,
		},
		mapb: {
			name: "mapb",
			description: "Display the previous 20 locations areas displayed by map.",
			callback: cmd.commandMapB,
		},
		explore: {
			name: "explore",
			description:
				"Usage: explore <location>. Display list of all pokemon in a given area.",
			callback: cmd.commandExplore,
		},
		catch: {
			name: "catch",
			description: "Usage: catch <pokemon>. Try to catch a specific pokemon.",
			callback: cmd.commandCatch,
		},
		inspect: {
			name: "inspect",
			description:
				"Usage: inspect <pokemon>. Inspect a pokemon to have its information (must be catch at least one before).",
			callback: cmd.commandInspect,
		},
		pokedex: {
			name: "pokedex",
			description: "Display all the pokemon you've caught. Gotta catch 'em all!",
			callback: cmd.commandPokedex,
		},
	};
}
