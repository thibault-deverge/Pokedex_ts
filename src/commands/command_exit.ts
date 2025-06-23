import type { State } from "../types";
import { logMagentaBold, logYellow } from "../utils/index.js";

/**
 * Handles the exit command for the application.
 * @param state - The current application state.
 */
export async function commandExit(state: State, ...args: string[]) {
	logYellow("Saving your Pokedex...");
	logMagentaBold("Logging out. See you next time, Trainer!👋");
	process.exit(0);
}
