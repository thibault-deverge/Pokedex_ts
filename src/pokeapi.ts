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

	constructor() {}

	async fetchLocations(pageURL?: string): Promise<ShallowLocations | undefined> {
		const url = pageURL ? pageURL : `${PokeAPI.baseURL}/location-area/`;
		try {
			const res = await fetch(url);
			if (!res.ok) {
				throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
			}

			const data = await res.json();
			return {
				count: data.count,
				next: data.next,
				previous: data.previous,
				results: data.results,
			};
		} catch (error: unknown) {
			error instanceof Error && console.error("Error:", error);
			return;
		}
	}

	async fetchLocation(locationName: string): Promise<Location | undefined> {
		const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
		try {
			const res = await fetch(url);
			if (!res.ok) {
				throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
			}

			const data = await res.json();
			return data;
		} catch (error: unknown) {
			error instanceof Error && console.error("Error:", error);
			return;
		}
	}
}
