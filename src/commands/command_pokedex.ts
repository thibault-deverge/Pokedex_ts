import chalk from "chalk";
import type { State } from "../types";
import {
	logBrightYellow,
	logError,
	logMagentaBold,
	logSeparator,
} from "../utils/index.js";

/**
 * Displays all Pokémon caught by the player in the Pokédex.
 *
 * @param state - The current application state containing the player's Pokédex.
 */
export async function commandPokedex(state: State, ...args: string[]) {
	const pokemonList: string[] = [];
	for (const pokemon of Object.keys(state.pokedex)) {
		pokemonList.push(state.pokedex[pokemon].name);
	}

	if (!pokemonList.length) {
		logError("Your Pokédex is empty... Catch some Pokémon, lazy Trainer! 🐾");
		return;
	}

	logMagentaBold("\n📘 Your Pokédex:");
	logSeparator();
	pokemonList.forEach((name, index) => {
		const num = chalk.gray(`#${index + 1}`);
		const label = chalk.yellowBright(name);
		console.log(`${num} ${label}`);
	});
	console.log();
}
