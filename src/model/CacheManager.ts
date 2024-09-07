import Helper from '../utils/Helper';
import type { ICacheItem, TRawCacheItem } from './types';

declare type TCacheInternal = {
    value: unknown;
    expiry: number;
    hits: number;
};

// Default cache expiry if none provided
const cacheDuration = 60 * 60 * 1000;

export const CacheManager = {
    _cacheItems: new Map<string, TCacheInternal>(),

    _createItem(key: string, value: unknown, expireAt?: Date | number, hits?: number): ICacheItem {
        const item = {
            key,
            value,
            hits: hits ?? 0,
            expiry:
                (expireAt instanceof Date ? expireAt.valueOf() : expireAt) ??
                Date.now() + cacheDuration,
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
                return item.expiry < Date.now();
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
        this._cacheItems.clear();
    },
    deleteItem(key: string): boolean {
        return this._cacheItems.delete(key);
    },
    deleteItems(keys: string[]): void {
        const len = keys.length - 1;
        
        for (let i = len; i >= 0; i--) {
            this._cacheItems.delete(keys[i]);
        }
    },
    getItem(key: string): ICacheItem | undefined {
        const ret = this._cacheItems.get(key);

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
            const it = this.getItem(keys[i]);
            it && results.push(it);
        }

        return results;
    },
    hasItem(key: string): boolean {
        const ret = this._cacheItems.get(key);

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
        if (Helper.isFunction('getKey' in item && item.getKey)) {
            const it = item as ICacheItem;
            this._cacheItems.set(it.getKey(), {
                value: it.getValue(),
                expiry: it.expiredAt(),
                hits: it.getHits(),
            });
        } else {
            const it = item as TRawCacheItem;
            this._cacheItems.set(it.key, {
                value: it.value,
                expiry: it.expiry ?? Date.now() + cacheDuration,
                hits: 0,
            });
        }
    },
    size(): number {
        return this._cacheItems.size;
    },
};
