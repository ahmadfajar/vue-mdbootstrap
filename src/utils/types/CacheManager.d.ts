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
   * Remove all items in the cache storage.
   */
  clear(): void;

  /**
   * Remove an item from the cache storage if exists.
   *
   * @param key The key to delete
   */
  deleteItem(key: string): void;

  /**
   * Remove multiple items from the cache storage.
   *
   * @param keys The keys to delete
   */
  deleteItems(keys: string[]): void;

  /**
   * Returns the cached item that represents the specified key.
   *
   * @param key The key to be used to return the corresponding cached item
   */
  getItem(key: string): ICacheItem | undefined;

  /**
   * Get multiple items from the cache storage and each of them is representing a cached item.
   *
   * @param keys An indexed array of keys to be used to return the corresponding cached items
   */
  getItems(keys: string[]): ICacheItem[];

  /**
   * Confirms if the cache storage contains the specified cached item.
   *
   * @param key The key for which to check its existence.
   */
  hasItem(key: string): boolean;

  /**
   * Persists an item to the cache storage immediately.
   *
   * @param item A data object to be cached
   */
  save(item: TRawCacheItem | ICacheItem): void;

  /**
   * Returns the number of items stored in the cache.
   */
  get size(): number;
}

export const CacheManager: ICacheManager;
