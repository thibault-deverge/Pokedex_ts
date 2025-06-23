import chalk from "chalk";
export async function commandExplore(state, ...args) {
    if (args.length !== 1) {
        console.log(chalk.redBright("❌ You must specify one location to explore. Try again, Trainer!"));
        return;
    }
    const locationName = args[0];
    const locationData = await state.pokeAPI.fetchLocation(locationName);
    if (locationData && locationData.length > 0) {
        console.log(chalk.bold.cyanBright(`📍 Pokémon found in ${chalk.yellowBright(locationName)}:`));
        for (const pokemon of locationData) {
            console.log(chalk.greenBright(` - ${pokemon}`));
        }
    }
    else {
        locationData && console.log(chalk.gray("No Pokémon found in this area. 🤔"));
    }
}
