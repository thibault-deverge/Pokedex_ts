import { describe, test, expect } from "vitest";
import { Cache } from "src/api/pokecache.js";

describe("Cache", () => {
	test("should return cached value if not expired", () => {
		const cache = new Cache(5000);
		cache.add("test-key", "test-value");
		const result = cache.get("test-key");
		expect(result).toBe("test-value");
	});

	test.concurrent.each([
		["key1", "val1"],
		["key2", "val2"],
		["key3", "val3"],
	])("should cache %s correctly", (key, value) => {
		const cache = new Cache(5000);
		cache.add(key, value);
		expect(cache.get(key)).toBe(value);
	});

	test("should delete cache after expiration", async () => {
		const cache = new Cache(100);
		cache.add("foo", "bar");
		await new Promise((resolve) => setTimeout(resolve, 400));
		const result = cache.get("foo");
		expect(result).toBe(undefined);
	});

	test.concurrent.each([
		{
			key: "https://example.com",
			val: "testdata",
			interval: 500, // 1/2 second
		},
		{
			key: "https://example.com/path",
			val: "moretestdata",
			interval: 1000, // 1 second
		},
	])("Test Caching $interval ms", async ({ key, val, interval }) => {
		const cache = new Cache(interval);

		cache.add(key, val);
		const cached = cache.get(key);
		expect(cached).toBe(val);

		await new Promise((resolve) => setTimeout(resolve, interval + 100));
		const reaped = cache.get(key);
		expect(reaped).toBe(undefined);

		cache.stopReapLoop();
	});
});
