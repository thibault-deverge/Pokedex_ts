import chalk from "chalk";
import type { State } from "../types";
import { logCyanBold, logGray, logGreenBright } from "../utils/index.js";

/**
 * Displays a formatted list of available commands and their descriptions in the console.
 * @param state - The current application state containing the command registry.
 */
export async function commandHelp(state: State, ...args: string[]) {
	logCyanBold("\nAvailable commands:");

	for (const key of Object.keys(state.registry)) {
		const cmd = chalk.greenBright(` - ${key.padEnd(12)}`);
		const desc = chalk.gray(state.registry[key].description);
		console.log(`${cmd} ${desc}`);
	}
	console.log("");
}
