import { describe, expect, test } from "vitest";
import { cleanInput } from "src/utils";

describe.each([
	{
		input: "  hello  world  ",
		expected: ["hello", "world"],
	},
	{
		input: "   Pikachu   ",
		expected: ["pikachu"],
	},
	{
		input: " Pika Pika-chuuu DracoFEu",
		expected: ["pika", "pika-chuuu", "dracofeu"],
	},
	{
		input: " ",
		expected: [],
	},
	{
		input: "",
		expected: [],
	},
	{
		input: "snorlax",
		expected: ["snorlax"],
	},
])("cleanInput($input)", ({ input, expected }) => {
	test(`Expected: ${expected}`, () => {
		const actual = cleanInput(input);
		expect(actual).toHaveLength(expected.length);
		for (const i in expected) {
			expect(actual[i]).toBe(expected[i]);
		}
	});
});
