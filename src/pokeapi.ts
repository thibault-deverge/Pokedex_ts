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
	id: number;
	name: string;
	areas: {
		name: string;
		url: string;
	}[];
};

export class PokeAPI {
	private static readonly baseURL = "https://pokeapi.co/api/v2";
	#cache = new Cache(10000);

	async fetchLocations(pageURL?: string): Promise<ShallowLocations | undefined> {
		const url = pageURL ? pageURL : `${PokeAPI.baseURL}/location-area/`;
		const data: ShallowLocations | undefined = await this.#fetchAndCache(url);

		if (data) {
			const cleanedData = {
				count: data.count,
				next: data.next,
				previous: data.previous,
				results: data.results,
			};
			if (!this.#cache.get(url)) {
				this.#cache.add<ShallowLocations>(url, cleanedData);
			}
			return cleanedData;
		}
	}

	async fetchLocation(locationName: string): Promise<Location | undefined> {
		const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
		const data: Location | undefined = await this.#fetchAndCache(url);

		if (data) {
			if (!this.#cache.get(url)) {
				this.#cache.add<Location>(url, data);
			}
			return data;
		}
	}

	async #fetchAndCache<T>(url: string): Promise<T | undefined> {
		const cache = this.#cache.get<T>(url);
		if (cache) return cache;

		try {
			const res = await fetch(url);
			if (!res.ok) {
				throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
			}

			const data: T = await res.json();
			return data;
		} catch (error) {
			error instanceof Error && console.error("Error:", error);
			return;
		}
	}
}
