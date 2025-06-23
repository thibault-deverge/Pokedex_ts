import chalk from "chalk";
const SCALE_NUM = 300;
export async function commandCatch(state, ...args) {
    if (args.length !== 1) {
        console.log(chalk.redBright("❌ You must specify one pokemon to catch. Try again, Trainer!"));
        return;
    }
    const pokemonName = args[0];
    const pokemonData = await state.pokeAPI.fetchPokemon(pokemonName);
    if (pokemonData) {
        console.log(chalk.cyanBright(`You throw a Pokéball at ${chalk.yellowBright.bold(pokemonName)}... 🎯`));
        const base_experience = pokemonData.base_experience;
        const randomNumber = Math.random();
        const catchNumber = (SCALE_NUM - base_experience) / SCALE_NUM;
        if (randomNumber <= catchNumber) {
            console.log(chalk.greenBright(`Gotcha! ${chalk.bold(pokemonName)} was caught! 🥳`));
            state.pokedex[pokemonName] = pokemonData;
        }
        else {
            console.log(chalk.red(`Oh no! ${chalk.bold(pokemonName)} escaped... Try again! 💨`));
        }
    }
}
