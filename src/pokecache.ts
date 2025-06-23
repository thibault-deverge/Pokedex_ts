export type CacheEntry<T> = {
	createdAt: number;
	val: T;
};

export class Cache {
	#cache = new Map<string, CacheEntry<any>>();
	#reapIntervalId: NodeJS.Timeout | undefined = undefined;
	#interval: number;

	constructor(intervalTime: number) {
		this.#interval = intervalTime;
		this.#startReapLoop();
	}

	add<T>(key: string, val: T) {
		const entry: CacheEntry<T> = {
			createdAt: Date.now(),
			val,
		};

		this.#cache.set(key, entry);
	}

	get<T>(key: string): T | undefined {
		const entry = this.#cache.get(key);
		if (!entry) return undefined;

		if (entry.createdAt < Date.now() - this.#interval) {
			this.#cache.delete(key);
			return undefined;
		}
		return entry.val;
	}

	stopReapLoop() {
		clearInterval(this.#reapIntervalId);
		this.#reapIntervalId = undefined;
	}

	#reap() {
		for (const [key, value] of this.#cache) {
			if (value.createdAt < Date.now() - this.#interval) {
				this.#cache.delete(key);
			}
		}
	}

	#startReapLoop() {
		this.#reapIntervalId = setInterval(() => {
			this.#reap();
		}, this.#interval);
	}
}
