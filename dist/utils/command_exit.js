import chalk from "chalk";
/**
 * Handles the exit command for the application.
 * @param state - The current application state.
 */
export async function commandExit(state, ...args) {
    console.log(chalk.yellow("Saving your Pokédex..."));
    console.log(chalk.magentaBright.bold("Logging out. See you next time, Trainer!👋"));
    process.exit(0);
}
