import readline from "readline";
import chalk from "chalk";

import type { State } from "./state.js";
import { commandExit } from "./utils/command_exit.js";

export function startREPL(state: State) {
	const { rl, registry } = state;
	rl.prompt();

	rl.on("line", async (input: string) => {
		const words = cleanInput(input);

		if (words.length !== 0) {
			if (words[0]) {
				const commands = registry;
				const command = commands[words[0]];

				if (command) {
					await command.callback(state);
				} else {
					logUnknownCommand();
				}
			}
		}
		rl.prompt();
	});

	rl.on("close", () => {
		console.log("");
		commandExit(state);
	});
}

/**
 * Cleans and normalizes a user input string by trimming whitespace,
 * converting to lowercase, splitting into words, and filtering out empty strings.
 *
 * @param input - The raw input string to be cleaned.
 * @returns An array of non-empty, lowercase words from the input.
 */
export function cleanInput(input: string): string[] {
	const cleanInput = input
		.trim()
		.toLowerCase()
		.split(" ")
		.filter((input) => input.length > 0);

	return cleanInput;
}

function logUnknownCommand() {
	console.log(
		chalk.redBright("❌ Unknown command. Type 'help' to see available options. 🧭")
	);
}
