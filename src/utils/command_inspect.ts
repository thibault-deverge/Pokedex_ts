import chalk from "chalk";
import type { State } from "src/state";

export async function commandInspect(state: State, ...args: string[]) {
	if (args.length !== 1) {
		console.log(
			chalk.redBright("❌ You must specify one pokemon to inspect. Try again, Trainer!")
		);
		return;
	}

	const pokemonName = args[0];
	const pokemon = state.pokedex[pokemonName];

	if (!pokemon) {
		console.log(
			chalk.red("You haven’t caught that Pokémon yet. Try using the 'catch' command! 🧢")
		);
		return;
	}

	console.log(
		chalk.bold.cyanBright(`\n🔎 Inspecting ${chalk.yellowBright.bold(pokemon.name)}:`)
	);
	console.log(chalk.gray("─────────────────────────────"));
	console.log(`${chalk.bold("Height")}: ${pokemon.height}`);
	console.log(`${chalk.bold("Weight")}: ${pokemon.weight}\n`);

	console.log(chalk.bold.magenta("📊 Stats:"));
	for (const stat of pokemon.stats) {
		console.log(
			` - ${chalk.green(stat.stat.name)}: ${chalk.whiteBright(stat.base_stat)}`
		);
	}

	console.log(`\n${chalk.bold.blue("🧬 Type(s):")}`);
	for (const type of pokemon.types) {
		console.log(` - ${chalk.yellowBright(type.type.name)}`);
	}
	console.log();
}
