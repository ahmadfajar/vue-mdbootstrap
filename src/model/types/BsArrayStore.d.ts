import type { AxiosResponse } from 'axios';
import type { TRecord } from '../../types';
import type { AbstractStore, IAbstractStore, TBsModel, TSortDirection, TSortOption } from '../types';

export declare interface IArrayStore extends IAbstractStore {
    /**
     * Returns dataset from the active page.
     *
     * If a filter or sorter has been applied before,
     * then the returned dataset will also be affected by it.
     */
    get dataItems(): TBsModel[];

    /**
     * Calculate means or average value based on the given field.
     *
     * @param field The field name of the dataset to calculate
     */
    aggregateAvg(field: string): number;

    /**
     * Count number of items in the internal dataset specified by the given criteria.
     *
     * @param field The grouping field name criteria
     * @param value  The grouping value criteria
     */
    aggregateCountBy(field: string, value: unknown): number;

    /**
     * Calculate the SUM or total value based on the given field.
     *
     * @param field The field name to be used when calculating value
     */
    aggregateSum(field: string): number;

    /**
     * Append an item to the internal dataset and sorted if needed.
     *
     * @param item    Data to append to the Store
     * @param sorted  Sort dataset after appended
     */
    append(item: never, sorted: boolean): void;

    /**
     * Replace the dataset with new data.
     *
     * @param data   The new data to be assigned
     * @param silent Append the data silently and don't trigger data conversion
     */
    assignData(data: never[] | never, silent: boolean): void;

    /**
     * Sorts the internal dataset with the given criteria and returns
     * the reference of the internal dataset.
     *
     * @example
     * // sort by a single field
     * let results = myStore.sort('myField', 'asc');
     *
     * // sorting by multiple fields
     * let results = myStore.sort([
     *  {property: 'age', direction: 'desc'},
     *  {property: 'name', direction: 'asc'}
     * ]);
     *
     * @param options   The field for sorting or `TSortOption` objects
     * @param direction The sort direction
     */
    sort(
        options: string | string[] | TSortOption | TSortOption[],
        direction: TSortDirection,
    ): TBsModel[];
}

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
 */
export declare class BsArrayStore extends AbstractStore implements IArrayStore {
    /**
     * Class constructor.
     *
     * @param data   Collection of records to be assigned
     * @param config The configuration properties
     */
    constructor(data: unknown[], config?: TRecord);

    get dataItems(): TBsModel[];

    aggregateAvg(field: string): number;

    aggregateCountBy(field: string, value: unknown): number;

    aggregateSum(field: string): number;

    append(item: never, sorted?: boolean): void;

    assignData(data: unknown[] | unknown, silent?: boolean): void;

    load(data?: never[] | never): Promise<TBsModel[] | AxiosResponse>;

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
    sort(options: string | string[] | TSortOption | TSortOption[], direction?: TSortDirection): TBsModel[];
}
