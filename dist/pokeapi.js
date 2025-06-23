import chalk from "chalk";
import { Cache } from "./pokecache.js";
export class PokeAPI {
    static baseURL = "https://pokeapi.co/api/v2";
    #cache = new Cache(10000);
    async fetchPokemon(pokemonName) {
        const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;
        const data = await this.#fetchAndCache(url);
        return data;
    }
    async fetchLocations(pageURL) {
        const url = pageURL ? pageURL : `${PokeAPI.baseURL}/location-area/`;
        const data = await this.#fetchAndCache(url);
        return data;
    }
    async fetchLocation(locationName) {
        const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
        const data = await this.#fetchAndCache(url);
        return data ? data.pokemon_encounters.map((entry) => entry.pokemon.name) : undefined;
    }
    async #fetchAndCache(url) {
        const cache = this.#cache.get(url);
        if (cache)
            return cache;
        try {
            const res = await fetch(url);
            if (!res.ok) {
                if (res.status === 404) {
                    logUnknowLocation();
                    return;
                }
                else {
                    throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
                }
            }
            const data = await res.json();
            if (!this.#cache.get(url)) {
                this.#cache.add(url, data);
            }
            return data;
        }
        catch (error) {
            error instanceof Error && console.error(error);
            return;
        }
    }
}
function logUnknowLocation() {
    console.error(chalk.redBright("❌ That area/pokemon doesn’t exist. Check your spelling, Trainer!"));
}
