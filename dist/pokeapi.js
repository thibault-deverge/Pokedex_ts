import { Cache } from "./pokecache.js";
export class PokeAPI {
    static baseURL = "https://pokeapi.co/api/v2";
    #cache = new Cache(10000);
    async fetchLocations(pageURL) {
        const url = pageURL ? pageURL : `${PokeAPI.baseURL}/location-area/`;
        const data = await this.#fetchAndCache(url);
        if (data) {
            const cleanedData = {
                count: data.count,
                next: data.next,
                previous: data.previous,
                results: data.results,
            };
            if (!this.#cache.get(url)) {
                this.#cache.add(url, cleanedData);
            }
            return cleanedData;
        }
    }
    async fetchLocation(locationName) {
        const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
        const data = await this.#fetchAndCache(url);
        if (data) {
            if (!this.#cache.get(url)) {
                this.#cache.add(url, data);
            }
            return data;
        }
    }
    async #fetchAndCache(url) {
        const cache = this.#cache.get(url);
        if (cache)
            return cache;
        try {
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
            }
            const data = await res.json();
            return data;
        }
        catch (error) {
            error instanceof Error && console.error("Error:", error);
            return;
        }
    }
}
