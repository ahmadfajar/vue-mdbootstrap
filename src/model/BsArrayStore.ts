import type { AxiosResponse } from 'axios';
import meanBy from 'lodash/meanBy';
import sumBy from 'lodash/sumBy';
import { AbstractStore } from '../model';
import type { TRecord } from '../types';
import Helper from '../utils/Helper';
import type { TBsModel, TDataStoreConfig, TSortDirection, TSortOption } from './types';

/**
 * Data store class to work with collection of entity objects locally.
 *
 * @example
 * const myStore = new BsArrayStore(
 *   [
 *     {id: 1, name: 'Sandra Adams'},
 *     {id: 2, name: 'Ali Connors'},
 *     {id: 3, name: 'Trevor Hansen'},
 *     {id: 4, name: 'Tucker Smith'},
 *     {id: 5, name: 'Britta Holt'},
 *     {id: 6, name: 'Jane Smith'},
 *     {id: 7, name: 'John Smith'},
 *     {id: 8, name: 'Sandra Williams'}
 *   ], {
 *     idProperty: 'id'
 *   }
 * );
 *
 * @author Ahmad Fajar
 * @since  13/03/2019 modified: 21/03/2024 00:41
 */
export default class BsArrayStore extends AbstractStore {
    /**
     * Construct new {@link BsArrayStore} object instance.
     *
     * @param data   Collection of records to be assigned
     * @param config The configuration properties
     */
    constructor(data: unknown[], config: TDataStoreConfig = {}) {
        super(config);

        if (Array.isArray(data) && data.length > 0) {
            this.assignData(data);
        }
    }

    get dataItems(): TBsModel[] {
        const page =
            this.currentPage > 0 && this.currentPage <= this.totalPages ? this.currentPage - 1 : 0;
        const offset = this.pageSize > 0 ? page * this.pageSize : 0;
        let result: TBsModel[];

        if (this.filters.length > 0) {
            this._filteredItems = this.localFilter();
            result = this._filteredItems.slice(
                offset,
                this.pageSize > 0 ? offset + this.pageSize : undefined
            );
        } else {
            result = this._items.slice(
                offset,
                this.pageSize > 0 ? offset + this.pageSize : undefined
            );
        }

        this._state.length = result.length;
        return result;
    }

    aggregateAvg(field: string): number {
        return meanBy(this._items, field);
    }

    aggregateCountBy(field: string, value: unknown): number {
        const results = this._items.filter(
            (item) => value === Helper.getObjectValueByPath(item, field)
        );

        return results.length;
    }

    aggregateSum(field: string): number {
        return sumBy(this._items, field);
    }

    append(item: TRecord, sorted = false): void {
        if (!Helper.isEmpty(item)) {
            this._append(item, false);

            if (sorted && this.sorters.length > 0) {
                this._items = this.localSort();
            }
        }
    }

    assignData(data: unknown, silent = false): void {
        this._assignData(data, silent);
        if (this.sorters.length > 0) {
            this._items = this.localSort();
        }
        this._onLoadingSuccess();
    }

    load(data?: unknown): Promise<TBsModel[] | AxiosResponse> {
        this._state.loading = true;

        return new Promise((resolve) => {
            if (data && !Helper.isEmpty(data)) {
                this.assignData(data, false);
            } else if (this.sorters.length > 0) {
                this._items = this.localSort();
                this._onLoadingSuccess();
            }
            
            resolve(this._items);
        });
    }

    /**
     * Sorts the internal dataset with the given criteria and returns
     * the reference of the internal dataset.
     *
     * @example
     * // sort by a single field
     * const results = myStore.sort('myField', 'asc');
     *
     * // sorting by multiple fields
     * const results = myStore.sort([
     *  {property: 'age', direction: 'desc'},
     *  {property: 'name', direction: 'asc'}
     * ]);
     *
     * @param options    The field for sorting or `TSortOption` objects
     * @param direction  The sort direction
     * @returns The sorted dataset.
     */
    sort(
        options: string | string[] | TSortOption | TSortOption[],
        direction: TSortDirection = 'asc'
    ): TBsModel[] {
        this.createSorters(options, direction, true);
        this._items = this.localSort();

        return this._items;
    }
}
