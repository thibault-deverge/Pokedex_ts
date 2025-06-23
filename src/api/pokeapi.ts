import type { ShallowLocations, Location, Pokemon } from "../types/index.js";
import { Cache } from "./pokecache.js";
import { logError } from "../utils/index.js";

/**
 * A class to interact with the PokéAPI and handle caching of responses.
 *
 * - Uses an in-memory cache to reduce unnecessary network calls.
 * - Handles fetching Pokémon, location areas, and Pokémon found in specific areas.
 */
export class PokeAPI {
	private static readonly baseURL = "https://pokeapi.co/api/v2";
	#cache = new Cache(10000);

	// Fetch detailed data for a given Pokémon by name
	async fetchPokemon(pokemonName: string) {
		const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;
		const data: Pokemon | undefined = await this.#fetchAndCache<Pokemon>(url);
		return data;
	}

	// Fetch a paginated list of location areas
	async fetchLocations(pageURL?: string): Promise<ShallowLocations | undefined> {
		const url = pageURL ? pageURL : `${PokeAPI.baseURL}/location-area/`;
		const data: ShallowLocations | undefined =
			await this.#fetchAndCache<ShallowLocations>(url);
		return data;
	}

	// Fetch the list of Pokémon names encountered in a specific location
	async fetchLocation(locationName: string): Promise<string[] | undefined> {
		const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
		const data: Location | undefined = await this.#fetchAndCache<Location>(url);

		return data ? data.pokemon_encounters.map((entry) => entry.pokemon.name) : undefined;
	}

	// Generic fetcher with cache and error handling
	async #fetchAndCache<T>(url: string): Promise<T | undefined> {
		const cache = this.#cache.get<T>(url);
		if (cache) return cache;

		try {
			const res = await fetch(url);

			if (!res.ok) {
				if (res.status === 404) {
					logError("That area/pokemon doesn’t exist. Check your spelling, Trainer!");
					return;
				} else {
					throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
				}
			}

			const data: T = await res.json();
			if (!this.#cache.get(url)) {
				this.#cache.add<T>(url, data);
			}
			return data;
		} catch (error) {
			error instanceof Error && console.error(error);
			return;
		}
	}
}
