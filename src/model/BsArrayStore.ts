import {meanBy, sumBy} from "lodash";
import AbstractStore from "./AbstractStore";
import Helper from "../utils/Helper";
import type {IArrayStore, IBsModel, TRecord, TSortDirection, TSortOption} from "../types";


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
 * @since  13/03/2019 modified: 13/03/2023 04:34
 */
export default class BsArrayStore extends AbstractStore implements IArrayStore {
    /**
     * Class constructor.
     *
     * @param {Object[]} [data]  Collection of records to be assigned
     * @param {TRecord} [config] The configuration properties
     */
    constructor(data: never[], config: TRecord = {}) {
        super(config);

        if (Array.isArray(data) && data.length > 0) {
            this.assignData(data);
        }
    }

    get dataItems(): IBsModel[] {
        const page = this.currentPage > 0 && this.currentPage <= this.totalPages ? this.currentPage - 1 : 0;
        const offset = page * this.pageSize;

        if (this.filters.length > 0) {
            this._filteredItems = this.localFilter();
            return this._filteredItems.slice(offset, this.pageSize > 0 ? (offset + this.pageSize) : undefined);
        }

        return this._items.slice(offset, this.pageSize > 0 ? (offset + this.pageSize) : undefined);
    }

    aggregateAvg(field: string): number {
        return meanBy(this._items, field);
    }

    aggregateCountBy(field: string, value: unknown): number {
        const results = this._items.filter(item =>
            value === Helper.getObjectValueByPath(item, field)
        );

        return results.length;
    }

    aggregateSum(field: string): number {
        return sumBy(this._items, field);
    }

    append(item: never, sorted = false): void {
        if (!Helper.isEmpty(item)) {
            this._append(item, false);

            if (sorted && this.sorters.length > 0) {
                this._items = this.localSort();
            }
        }
    }

    assignData(data: never[] | never, silent = false): void {
        this._assignData(data, silent);
        if (this.sorters.length > 0) {
            this._items = this.localSort();
        }
        this._onLoadingSuccess();
    }

    load(data?: never[] | never): Promise<IBsModel[]> {
        this._state.loading = true;

        return new Promise((resolve) => {
            if (data && !Helper.isEmpty(data)) {
                this.assignData(data, false);
            } else if (this.sorters.length > 0) {
                this._items = this.localSort();
            }

            resolve(this._items);
            this._onLoadingSuccess();
        });
    }

    /**
     * Sorts the internal dataset with the given criteria and returns it.
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
     * @param {string|string[]|TSortOption|TSortOption[]} options  The field for sorting or `TSortOption` objects
     * @param {'asc'|'desc'} [direction]                           The sort direction
     * @returns {IBsModel[]} The sorted dataset.
     */
    sort(
        options: string | string[] | TSortOption | TSortOption[],
        direction: TSortDirection = 'asc',
    ): IBsModel[] {
        this.createSorters(options, direction, true);
        this._items = this.localSort();

        return this._items;
    }
}
