import chalk from "chalk";
import type { State } from "../types";
import {
	logBlueBold,
	logError,
	logMagentaBold,
	logSeparator,
	logWarning,
	printInspectingMessage,
	printPokemonBasicInfos,
	printPokemonStat,
	printPokemonType,
} from "../utils/index.js";

/**
 * Displays detailed information about a caught Pokemon
 * @param state - Current Pokedex state
 * @param args - Pokemon name to inspect
 */
export async function commandInspect(state: State, ...args: string[]) {
	if (args.length !== 1) {
		logError("You must specify one pokemon to inspect. Try again, Trainer!");
		return;
	}

	const pokemonName = args[0];
	const pokemon = state.pokedex[pokemonName];

	if (!pokemon) {
		logWarning("You haven’t caught that Pokémon yet. Try using the 'catch' command! 🧢");
		return;
	}

	printInspectingMessage(pokemonName);
	logSeparator();
	printPokemonBasicInfos("Height", pokemon.height);
	printPokemonBasicInfos("Weight", pokemon.weight);

	logMagentaBold("\n📊 Stats:");
	for (const stat of pokemon.stats) {
		printPokemonStat(stat.stat.name, stat.base_stat);
	}

	logBlueBold(`\n🧬 Type(s):`);
	for (const type of pokemon.types) {
		printPokemonType(type.type.name);
	}
	console.log();
}
