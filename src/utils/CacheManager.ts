import Helper from '@/utils/Helper.ts';

declare type TCacheInternal = {
  value: unknown;
  expiry: number;
  hits: number;
};

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

// Default cache expiry if none provided
const CACHE_DURATION = 60 * 60 * 1000;

class StorageProxy {
  private readonly _storage: Map<string, TCacheInternal>;

  constructor() {
    this._storage = new Map<string, TCacheInternal>();
  }

  private hasSessionStorage() {
    if (typeof window == 'undefined') {
      return false;
    }

    return !!(window && window.sessionStorage);
  }

  clear(): void {
    if (this.hasSessionStorage()) {
      window.sessionStorage.clear();
    } else {
      this._storage.clear();
    }
  }

  getItem(key: string): TCacheInternal | undefined {
    if (this.hasSessionStorage()) {
      const text = window.sessionStorage.getItem(key);
      if (text) {
        return JSON.parse(text) as TCacheInternal;
      }
    } else {
      return this._storage.get(key);
    }

    return undefined;
  }

  setItem(key: string, value: TCacheInternal): void {
    if (this.hasSessionStorage()) {
      const text = JSON.stringify(value);
      window.sessionStorage.setItem(key, text);
    } else {
      this._storage.set(key, value);
    }
  }

  removeItem(key: string): void {
    if (this.hasSessionStorage()) {
      window.sessionStorage.removeItem(key);
    } else {
      this._storage.delete(key);
    }
  }

  get size(): number {
    if (this.hasSessionStorage()) {
      return window.sessionStorage.length;
    } else {
      return this._storage.size;
    }
  }
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
  readonly size: number;
}

export const CacheManager = {
  /**
   * Register cache internal storage.
   * @internal
   */
  _cacheStorage: new StorageProxy(),

  /**
   * Create cache item.
   * @internal
   */
  _createItem(key: string, value: unknown, expireAt?: Date | number, hits?: number): ICacheItem {
    const item = {
      key,
      value,
      hits: hits ?? 0,
      expiry:
        (expireAt instanceof Date ? expireAt.valueOf() : expireAt) ?? Date.now() + CACHE_DURATION,
      getKey(): string {
        return item.key;
      },
      getValue(): unknown {
        return item.value;
      },
      setValue(v: unknown): void {
        item.value = v;
      },
      getHits(): number {
        return item.hits;
      },
      isExpired(): boolean {
        return item.expiredAt() < Date.now();
      },
      setExpiry(v: number): void {
        item.expiry = v;
      },
      expiredAt(): number {
        return item.expiry;
      },
    };

    return item;
  },

  /**
   * Remove all items in the cache storage.
   */
  clear(): void {
    this._cacheStorage.clear();
  },

  /**
   * Remove an item from the cache storage if exists.
   *
   * @param key The key to delete
   */
  deleteItem(key: string): void {
    this._cacheStorage.removeItem(key);
  },

  /**
   * Remove multiple items from the cache storage.
   *
   * @param keys The keys to delete
   */
  deleteItems(keys: string[]): void {
    const len = keys.length - 1;

    for (let i = len; i >= 0; i--) {
      this.deleteItem(keys[i]);
    }
  },

  /**
   * Returns the cached item that represents the specified key.
   *
   * @param key The key to be used to return the corresponding cached item
   */
  getItem(key: string): ICacheItem | undefined {
    const ret = this._cacheStorage.getItem(key);

    if (ret && ret.expiry > Date.now()) {
      this._cacheStorage.setItem(key, { value: ret.value, expiry: ret.expiry, hits: ret.hits + 1 });
      return this._createItem(key, ret.value, ret.expiry, ret.hits + 1);
    } else {
      this.deleteItem(key);
    }

    return undefined;
  },

  /**
   * Get multiple items from the cache storage and each of them is representing a cached item.
   *
   * @param keys An indexed array of keys to be used to return the corresponding cached items
   */
  getItems(keys: string[]): ICacheItem[] {
    const results = [];
    const len = keys.length - 1;

    for (let i = len; i >= 0; i--) {
      const it = this.getItem(keys[i]);
      it && results.push(it);
    }

    return results;
  },

  /**
   * Confirms if the cache storage contains the specified cached item.
   *
   * @param key The key for which to check its existence.
   */
  hasItem(key: string): boolean {
    const ret = this._cacheStorage.getItem(key);

    if (ret && ret.expiry > Date.now()) {
      return true;
    } else {
      this.deleteItem(key);
      return false;
    }
  },

  /**
   * Persists an item to the cache storage immediately.
   *
   * @param item A data object to be cached
   */
  save(item: TRawCacheItem | ICacheItem): void {
    if (!item) {
      return;
    }

    if ('getKey' in item && Helper.isFunction(item['getKey'])) {
      const it = item;

      this._cacheStorage.setItem(it.getKey(), {
        value: it.getValue(),
        expiry: it.expiredAt(),
        hits: it.getHits(),
      });
    } else {
      const it = item as TRawCacheItem;
      this._cacheStorage.setItem(it.key, {
        value: it.value,
        expiry: it.expiry ?? Date.now() + CACHE_DURATION,
        hits: 0,
      });
    }
  },

  /**
   * Returns the number of items stored in the cache.
   */
  get size(): number {
    return this._cacheStorage.size;
  },
};
