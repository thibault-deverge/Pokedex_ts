import chalk from "chalk";
import { Cache } from "./pokecache.js";

export type ShallowLocations = {
	count: number;
	next: string;
	previous: string | null;
	results: {
		name: string;
		url: string;
	}[];
};

export type Location = {
	pokemon_encounters: {
		pokemon: {
			name: string;
			url: string;
		};
	}[];
};

export type Pokemon = {
	name: string;
	base_experience: number;
	height: string;
	weight: string;
	stats: {
		base_stat: number;
		stat: {
			name: string;
		};
	}[];
	types: {
		type: {
			name: string;
		};
	}[];
};

export class PokeAPI {
	private static readonly baseURL = "https://pokeapi.co/api/v2";
	#cache = new Cache(10000);

	async fetchPokemon(pokemonName: string) {
		const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;
		const data: Pokemon | undefined = await this.#fetchAndCache<Pokemon>(url);
		return data;
	}

	async fetchLocations(pageURL?: string): Promise<ShallowLocations | undefined> {
		const url = pageURL ? pageURL : `${PokeAPI.baseURL}/location-area/`;
		const data: ShallowLocations | undefined =
			await this.#fetchAndCache<ShallowLocations>(url);
		return data;
	}

	async fetchLocation(locationName: string): Promise<string[] | undefined> {
		const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
		const data: Location | undefined = await this.#fetchAndCache<Location>(url);

		return data ? data.pokemon_encounters.map((entry) => entry.pokemon.name) : undefined;
	}

	async #fetchAndCache<T>(url: string): Promise<T | undefined> {
		const cache = this.#cache.get<T>(url);
		if (cache) return cache;

		try {
			const res = await fetch(url);

			if (!res.ok) {
				if (res.status === 404) {
					logUnknowLocation();
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

function logUnknowLocation() {
	console.error(
		chalk.redBright("❌ That area/pokemon doesn’t exist. Check your spelling, Trainer!")
	);
}
