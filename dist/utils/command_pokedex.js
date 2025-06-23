import chalk from "chalk";
export async function commandPokedex(state, ...args) {
    const pokemonList = [];
    for (const pokemon of Object.keys(state.pokedex)) {
        pokemonList.push(state.pokedex[pokemon].name);
    }
    if (!pokemonList.length) {
        console.log(chalk.redBright("Your Pokédex is empty... Catch some Pokémon, lazy Trainer! 🐾"));
        return;
    }
    console.log("Your Pokedex:");
    pokemonList.forEach((name, index) => {
        const num = chalk.gray(`#${index + 1}`);
        const label = chalk.yellowBright(name);
        console.log(`${num} ${label}`);
    });
}
