export class Cache {
    #cache = new Map();
    #reapIntervalId = undefined;
    #interval;
    constructor(intervalTime) {
        this.#interval = intervalTime;
        this.#startReapLoop();
    }
    add(key, val) {
        const entry = {
            createdAt: Date.now(),
            val,
        };
        this.#cache.set(key, entry);
    }
    get(key) {
        const entry = this.#cache.get(key);
        if (!entry)
            return undefined;
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
