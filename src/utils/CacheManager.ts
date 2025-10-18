import Helper from '@/utils/Helper.ts';
import type { ICacheItem, TRawCacheItem } from '@/utils/types/CacheManager';

declare type TCacheInternal = {
  value: unknown;
  expiry: number;
  hits: number;
};

// Default cache expiry if none provided
const CACHE_DURATION = 60 * 60 * 1000;

class StorageProxy {
  private readonly _storage: Map<string, TCacheInternal>;

  constructor() {
    this._storage = new Map<string, TCacheInternal>();
  }

  private hasSessionStorage() {
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

export const CacheManager = {
  _cacheStorage: new StorageProxy(),

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

    return item as ICacheItem;
  },
  clear(): void {
    this._cacheStorage.clear();
  },
  deleteItem(key: string): void {
    this._cacheStorage.removeItem(key);
  },
  deleteItems(keys: string[]): void {
    const len = keys.length - 1;

    for (let i = len; i >= 0; i--) {
      this.deleteItem(keys[i]!);
    }
  },
  getItem(key: string): ICacheItem | undefined {
    const ret = this._cacheStorage.getItem(key);

    if (ret && ret.expiry > Date.now()) {
      return this._createItem(key, ret.value, ret.expiry, ret.hits + 1);
    } else {
      this.deleteItem(key);
    }

    return undefined;
  },
  getItems(keys: string[]): ICacheItem[] {
    const results = [];
    const len = keys.length - 1;

    for (let i = len; i >= 0; i--) {
      const it = this.getItem(keys[i]!);
      it && results.push(it);
    }

    return results;
  },
  hasItem(key: string): boolean {
    const ret = this._cacheStorage.getItem(key);

    if (ret && ret.expiry > Date.now()) {
      return true;
    } else {
      this.deleteItem(key);
      return false;
    }
  },
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
  get size(): number {
    return this._cacheStorage.size;
  },
};
