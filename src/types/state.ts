import { PokeAPI } from "src/api/pokeapi";

import type { Interface } from "readline";
import type { Pokemon } from "../types";

export type State = {
	rl: Interface;
	pokeAPI: PokeAPI;
	pokedex: Record<string, Pokemon>;
	registry: Record<string, CLICommand>;
	nextLocationsURL: string | null;
	prevLocationsURL: string | null;
};

export type CLICommand = {
	name: string;
	description: string;
	callback: (state: State, ...args: string[]) => Promise<void>;
};
