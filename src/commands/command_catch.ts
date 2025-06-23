import type { State } from "../types";
import {
	logError,
	printCaughtMessage,
	printEscapeMessage,
	printPokeballThrow,
} from "../utils/index.js";

const SCALE_NUM = 300;

/**
 * Attempts to catch a Pokémon by name and adds it to the user's Pokédex if successful.
 *
 * This command simulates a capture attempt using the Pokémon's base experience
 * to determine the success rate. The caught Pokémon is stored in pokedex (in state).
 *
 * @param state - The global application state containing the Pokédex and API handler.
 * @param args - An array where the first element is the name of the Pokémon to catch.
 */
export async function commandCatch(state: State, ...args: string[]) {
	if (args.length !== 1) {
		logError("You must specify one pokemon to catch. Try again, Trainer!");
		return;
	}

	const pokemonName = args[0];
	const pokemonData = await state.pokeAPI.fetchPokemon(pokemonName);

	if (pokemonData) {
		printPokeballThrow(pokemonName);
		const base_experience = pokemonData.base_experience;
		const randomNumber = Math.random();
		const catchNumber = (SCALE_NUM - base_experience) / SCALE_NUM;

		if (randomNumber <= catchNumber) {
			printCaughtMessage(pokemonName);
			state.pokedex[pokemonName] = pokemonData;
		} else {
			printEscapeMessage(pokemonName);
		}
	}
}
