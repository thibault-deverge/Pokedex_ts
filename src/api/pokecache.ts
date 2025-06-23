type CacheEntry<T> = {
	createdAt: number;
	val: T;
};

/**
 * A simple in-memory cache with automatic expiration.
 *
 * - Stores values with a timestamp.
 * - Automatically removes expired entries at a fixed interval.
 */
export class Cache {
	#cache = new Map<string, CacheEntry<any>>();
	#reapIntervalId: NodeJS.Timeout | undefined = undefined;
	#interval: number;

	constructor(intervalTime: number) {
		this.#interval = intervalTime;
		this.#startReapLoop();
	}

	// Adds a value to the cache under a given key
	add<T>(key: string, val: T) {
		const entry: CacheEntry<T> = {
			createdAt: Date.now(),
			val,
		};

		this.#cache.set(key, entry);
	}

	// Retrieves a value from the cache if not expired
	get<T>(key: string): T | undefined {
		const entry = this.#cache.get(key);
		if (!entry) return undefined;

		if (entry.createdAt < Date.now() - this.#interval) {
			this.#cache.delete(key);
			return undefined;
		}
		return entry.val;
	}

	// Stops the internal reap loop (useful for testing or cleanup)
	stopReapLoop() {
		clearInterval(this.#reapIntervalId);
		this.#reapIntervalId = undefined;
	}

	// Deletes expired entries
	#reap() {
		for (const [key, value] of this.#cache) {
			if (value.createdAt < Date.now() - this.#interval) {
				this.#cache.delete(key);
			}
		}
	}

	// Starts the background cleanup loop
	#startReapLoop() {
		this.#reapIntervalId = setInterval(() => {
			this.#reap();
		}, this.#interval);
	}
}
