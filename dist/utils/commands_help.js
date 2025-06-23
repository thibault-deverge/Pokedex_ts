import chalk from "chalk";
/**
 * Displays a formatted list of available commands and their descriptions in the console.
 * @param state - The current application state containing the command registry.
 */
export async function commandHelp(state, ...args) {
    console.log(chalk.cyanBright.bold("\nAvailable commands:"));
    for (const key of Object.keys(state.registry)) {
        const cmd = chalk.greenBright(key.padEnd(12));
        const desc = chalk.gray(state.registry[key].description);
        console.log(`${cmd} ${desc}`);
    }
    console.log("");
}
