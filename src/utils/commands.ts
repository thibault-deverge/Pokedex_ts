import type { CLICommand } from "src/state.js";

import { commandExit } from "./command_exit.js";
import { commandHelp } from "./commands_help.js";
import { commandMap } from "./command_map.js";
import { commandMapB } from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js";

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
			callback: commandExit,
		},
		help: {
			name: "help",
			description: "Displays a help message",
			callback: commandHelp,
		},
		map: {
			name: "map",
			description:
				"Display the name of 20 locations areas. Each subsequent call display the next 20 locations, and so on.",
			callback: commandMap,
		},
		mapb: {
			name: "mapb",
			description: "Display the previous 20 locations areas displayed by map.",
			callback: commandMapB,
		},
		explore: {
			name: "explore",
			description:
				"Usage: explore <location>. Display list of all pokemon in a given area.",
			callback: commandExplore,
		},
		catch: {
			name: "catch",
			description: "Usage: catch <pokemon>. Try to catch a specific pokemon.",
			callback: commandCatch,
		},
		inspect: {
			name: "inspect",
			description:
				"Usage: inspect <pokemon>. Inspect a pokemon to have its information (must be catch at least one before).",
			callback: commandInspect,
		},
		pokedex: {
			name: "pokedex",
			description: "Display all the pokemon you've caught. Gotta catch 'em all!",
			callback: commandPokedex,
		},
	};
}
