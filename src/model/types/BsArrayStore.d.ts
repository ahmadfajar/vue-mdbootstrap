import type { AxiosResponse } from 'axios';
import type { IArrayStore, IBsModel, TRecord, TSortDirection, TSortOption } from '.././../types';
import AbstractStore from './AbstractStore';

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
 * @since  13/03/2019 modified: 24/06/2023 14:07
 */
export default class BsArrayStore extends AbstractStore implements IArrayStore {
    /**
     * Class constructor.
     *
     * @param data   Collection of records to be assigned
     * @param config The configuration properties
     */
    constructor(data: unknown[], config?: TRecord);

    get dataItems(): IBsModel[];

    aggregateAvg(field: string): number;

    aggregateCountBy(field: string, value: unknown): number;

    aggregateSum(field: string): number;

    append(item: never, sorted?: boolean): void;

    assignData(data: unknown[] | unknown, silent?: boolean): void;

    load(data?: never[] | never): Promise<IBsModel[] | AxiosResponse>;

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
    sort(options: string | string[] | TSortOption | TSortOption[], direction?: TSortDirection): IBsModel[];
}
