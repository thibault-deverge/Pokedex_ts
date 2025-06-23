import readline from "readline";
import chalk from "chalk";
import { PokeAPI } from "./pokeapi.js";
import { getCommands } from "./utils/commands.js";
/**
 * Initializes the application state by creating a readline interface for user input
 * and retrieving the command registry.
 *
 * @returns {State} The initial state object containing the readline interface and command registry.
 */
export function initState() {
    return {
        rl: readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: chalk.magentaBright.bold("🧭 Pokedex > "),
        }),
        pokeAPI: new PokeAPI(),
        pokedex: {},
        registry: getCommands(),
        nextLocationsURL: "https://pokeapi.co/api/v2/location-area/",
        prevLocationsURL: null,
    };
}
