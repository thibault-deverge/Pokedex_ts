export class PokeAPI {
    static baseURL = "https://pokeapi.co/api/v2";
    constructor() { }
    async fetchLocations(pageURL) {
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
        }
        catch (error) {
            error instanceof Error && console.error("Error:", error);
            return;
        }
    }
    async fetchLocation(locationName) {
        const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
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
