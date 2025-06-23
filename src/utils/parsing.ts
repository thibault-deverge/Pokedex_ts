/**
 * Cleans a raw CLI input string by trimming, lowercasing, and splitting it into words.
 *
 * @param input - The raw input string to be cleaned and split.
 * @returns An array of non-empty, lowercase words from the input string.
 */
export function cleanInput(input: string): string[] {
	const cleanInput = input
		.trim()
		.toLowerCase()
		.split(" ")
		.filter((input) => input.length > 0);

	return cleanInput;
}
