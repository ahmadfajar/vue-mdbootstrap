import { AbstractStore } from '@/model';
import type {
  IArrayStore,
  IBsModel,
  TDataStoreConfig,
  TSortDirection,
  TSortOption,
} from '@/model/types';
import type { TRecord } from '@/types';
import Helper from '@/utils/Helper.ts';
import type { AxiosResponse } from 'axios';
import { meanBy, sumBy } from 'lodash-es';

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
 * @since  13/03/2019 modified: 19/10/2025 05:00
 */
// @ts-expect-error: export class BsArrayStore
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
