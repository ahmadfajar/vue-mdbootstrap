import { AbstractStore } from '@/model';
import type { TDataStoreConfig, TSortDirection, TSortOption } from '@/model/AbstractStore.ts';
import type { IBsModel } from '@/model/BsModel.ts';
import type { TRecord } from '@/types';
import Helper from '@/utils/Helper';
import type { AxiosResponse } from 'axios';
import meanBy from 'lodash-es/meanBy';
import sumBy from 'lodash-es/sumBy';

export declare interface IArrayStore extends AbstractStore {
  /**
   * Returns dataset from the active page.
   *
   * If a filter or sorter has been applied before,
   * then the returned dataset will also be affected by it.
   */
  get dataItems(): IBsModel[];

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
  append(item: TRecord, sorted?: boolean): void;

  /**
   * Replace the dataset with new data.
   *
   * @param data   The new data to be assigned
   * @param silent Append the data silently and don't trigger data transformer
   */
  assignData(data: unknown, silent?: boolean): void;

  /**
   * Load and replace internal dataset with the given data.
   *
   * @param data The new data to replace the internal dataset.
   */
  load(data?: unknown): Promise<IBsModel[] | AxiosResponse>;

  /**
   * Sorts the internal dataset with the given criteria and returns
   * the reference of the internal dataset.
   *
   * @param options    The field for sorting or `TSortOption` objects
   * @param direction  The sort direction
   * @returns The sorted dataset.
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
   */
  sort(
    options: string | string[] | TSortOption | TSortOption[],
    direction?: TSortDirection
  ): IBsModel[];
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
 *
 * @author Ahmad Fajar
 * @since  13/03/2019 modified: 16/09/2025 02:45
 */
export class BsArrayStore extends AbstractStore implements IArrayStore {
  /**
   * Construct new {@link BsArrayStore} object instance.
   *
   * @param data   Collection of records to be assigned
   * @param config The configuration properties
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
  constructor(data: unknown[], config: TDataStoreConfig = {}) {
    super(config);

    if (Array.isArray(data) && data.length > 0) {
      this.assignData(data);
    }
  }

  get dataItems(): IBsModel[] {
    const page =
      this.currentPage > 0 && this.currentPage <= this.totalPages ? this.currentPage - 1 : 0;
    const offset = this.pageSize > 0 ? page * this.pageSize : 0;
    let result: IBsModel[];

    if (this.filters.length > 0) {
      this._filteredItems = this.localFilter();
      result = this._filteredItems.slice(
        offset,
        this.pageSize > 0 ? offset + this.pageSize : undefined
      );
    } else {
      result = this._items.slice(offset, this.pageSize > 0 ? offset + this.pageSize : undefined);
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

  load(data?: unknown): Promise<IBsModel[] | AxiosResponse> {
    this._state.loading = true;

    return new Promise((resolve) => {
      if (data && !Helper.isEmpty(data)) {
        this.assignData(data, false);
      } else if (this.sorters.length > 0) {
        this._items = this.localSort();
        this._onLoadingSuccess();
      } else {
        this._onLoadingSuccess();
      }

      resolve(this._items);
    });
  }

  sort(
    options: string | string[] | TSortOption | TSortOption[],
    direction: TSortDirection = 'asc'
  ): IBsModel[] {
    this.createSorters(options, direction, true);
    this._items = this.localSort();

    return this._items;
  }
}
