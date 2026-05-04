export declare type FilterLogic = 'AND' | 'OR';

export declare type FilterOperator =
  | 'eq'
  | 'neq'
  | 'gt'
  | 'gte'
  | 'lt'
  | 'lte'
  | 'contains'
  | 'fts'
  | 'tsquery'
  | 'startsWith'
  | 'startswith'
  | 'startWith'
  | 'startwith'
  | 'endsWith'
  | 'endswith'
  | 'endWith'
  | 'endwith'
  | 'notin'
  | 'in';

export declare type FilterOptions = {
  /**
   * Field name attribute for filter operation.
   */
  property: string;

  /**
   * Filter value.
   */
  value: string | number | boolean;

  /**
   * Filter operator, default: `eq`.
   */
  operator: FilterOperator;

  /**
   * ORM custom data type, ex: 'ulid'.
   */
  type?: string;

  /**
   * Optional logic operator to be used when combined with another filters.
   * If it is not defined, global filter logic will be used.
   */
  logic?: FilterLogic;

  /**
   * Optional, indicate the `value` is an expression or field expression.
   */
  expression?: boolean;
};

export declare type SortDirection = 'asc' | 'desc';

export declare type SortOption = {
  /**
   * Field name attribute for sorting operation.
   */
  property: string;

  /**
   * @deprecated
   * Use `property` instead.
   */
  field?: string;

  /**
   * Sort direction, valid values: `asc`, `desc`.
   */
  direction: SortDirection;
};

export declare type HttpMethod =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
  | 'purge'
  | 'PURGE';

export declare type UrlMethod = {
  url: string;
  method: HttpMethod;
};

export declare type RestMethodOptions = {
  browse: HttpMethod;
  fetch: HttpMethod;
  save: HttpMethod;
  update: HttpMethod;
  delete: HttpMethod;
};

export declare type RestPropConfig = {
  [P in keyof RestMethodOptions]?: UrlMethod | string;
};

export declare type RestKey = Record<string, HttpMethod>;

export declare type RestConfig = Record<keyof RestMethodOptions | string, string>;

export declare type CSRFConfig = {
  url?: string;
  tokenName?: string;
  dataField?: string;
  /**
   * @deprecated
   * Backward compatibility.
   */
  responseField?: string;
  suffix?: boolean;
};

export declare type QueryParameter = {
  page?: number;
  limit?: number;
  filters?: FilterOptions[];
  sorts?: SortOption[];
  logic: FilterLogic;
};

export declare interface ObjectBase {
  /**
   * Cleaning up resources and dispose each property before destroying this object.
   */
  destroy(): void;
}
