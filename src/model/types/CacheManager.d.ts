export declare type TRawCacheItem = {
    key: string;
    value: unknown;
    expiry: number;
};

export declare interface ICacheItem {
    /**
     * Returns this cache item key.
     */
    getKey(): string;

    /**
     * Returns this cache item value.
     */
    getValue(): unknown;

    /**
     * Update this cache item value. If the value is changed,
     * it needs to be saved to the cache manager.
     *
     * @param value The value to store
     */
    setValue(value: unknown): void;

    /**
     * Returns this cache item hits counter.
     */
    getHits(): number;

    /**
     * Check whether this cache item is expired or not.
     */
    isExpired(): boolean;

    /**
     * Change this cache item expiry.
     *
     * @param value The timestamp since epoch
     */
    setExpiry(value: number): void;

    /**
     * Returns this cache item expiry timestamp.
     */
    expiredAt(): number;
}

export declare interface ICacheManager {
    /**
     * Delete all items in the cache.
     */
    clear(): void;

    /**
     * Remove an item from the cache.
     *
     * Returns true if an item exists in the cache otherwise false.
     *
     * @param key The key to delete
     */
    deleteItem(key: string): boolean;

    /**
     * Remove multiple items from the cache.
     *
     * @param keys The keys to delete
     */
    deleteItems(keys: string[]): void;

    /**
     * Returns a Cache Item representing the specified key.
     *
     * @param key The key for which to return the corresponding Cache Item
     */
    getItem(key: string): ICacheItem | undefined;

    /**
     * Get multiple items from the cache and each of them is representing a Cache item.
     *
     * @param keys An indexed array of keys of items to retrieve
     */
    getItems(keys: string[]): ICacheItem[];

    /**
     * Confirms if the cache contains specified cache item.
     *
     * @param key The key for which to check existence.
     */
    hasItem(key: string): boolean;

    /**
     * Persists a cache item immediately.
     *
     * @param item The cache item to save
     */
    save(item: TRawCacheItem | ICacheItem): void;

    /**
     * Returns the number of item in the cache.
     */
    size(): number;
}

export const CacheManager: ICacheManager;
