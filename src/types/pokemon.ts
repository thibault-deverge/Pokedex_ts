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
