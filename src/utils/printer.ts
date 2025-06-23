import chalk from "chalk";

// -------- POKEMON --------
export function printPokeballThrow(name: string): void {
	console.log(
		chalk.cyanBright(`You throw a Pokéball at ${chalk.yellowBright.bold(name)}... 🎯`)
	);
}

export function printCaughtMessage(name: string): void {
	console.log(chalk.greenBright(`Gotcha! ${chalk.bold(name)} was caught! 🥳`));
}

export function printEscapeMessage(name: string): void {
	console.log(chalk.red(`Oh no! ${chalk.bold(name)} escaped... Try again! 💨`));
}

// ------ STATS POKEMON ------
export function printInspectingMessage(name: string): void {
	console.log(chalk.bold.cyanBright(`\n🔎 Inspecting ${chalk.yellowBright.bold(name)}:`));
}

export function printPokemonBasicInfos(type: string, info: string): void {
	console.log(`${chalk.bold(type)}: ${info}`);
}

export function printPokemonStat(statName: string, value: number): void {
	console.log(` - ${chalk.green(statName)}: ${chalk.whiteBright(value)}`);
}

export function printPokemonType(statName: string): void {
	console.log(` - ${chalk.yellowBright(statName)}`);
}

// -------- LOCATIONS --------
export function printPokemonFound(locationName: string): void {
	console.log(
		chalk.bold.cyanBright(`📍 Pokémon found in ${chalk.yellowBright(locationName)}:`)
	);
}
