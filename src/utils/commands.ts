import type { CLICommand } from "src/state.js";

import { commandExit } from "./command_exit.js";
import { commandHelp } from "./commands_help.js";
import { commandMap } from "./command_map.js";
import { commandMapB } from "./command_mapb.js";

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
	};
}
