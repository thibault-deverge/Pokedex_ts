import figlet from "figlet";
import chalk from "chalk";
import { startREPL } from "./repl.js";
import { initState } from "./state.js";

function main() {
	figlet("Pokedex", (err, data) => {
		if (err) {
			console.log("Something went wrong with figlet...");
			return;
		}
		console.log(chalk.yellow(data));
		console.log(chalk.bold.yellowBright("📘 Welcome to the Pokedex!"));

		const state = initState();
		startREPL(state);
	});
}

main();
