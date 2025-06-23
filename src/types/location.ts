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
