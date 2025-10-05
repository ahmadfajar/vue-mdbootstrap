import { isEndWith } from '@/utils/StringHelper.ts';

/**
 * Class Helper with static functions.
 *
 * @author Ahmad Fajar
 * @since  05/07/2018, modified: 21/09/2025 18:30
 */
export default class Helper {
  /**
   * Creates range of number.
   *
   * @param length Range length
   * @returns Array of numbers
   */
  static createRange(length: number): number[] {
    return Array.from({ length }, (_v, k) => k);
  }

  /**
   * Defer or delay execution of a function.
   *
   * @param callback   The function to execute
   * @param delay      Number of delay in ms
   * @param args       Optional arguments which are passed through the `callback`
   * @returns {number} The returned **timeoutID** is a positive integer value
   * which identifies the timer created by the call to **setTimeout()**.
   * This value can be passed to [clearTimeout]{@link https://developer.mozilla.org/en-US/docs/Web/API/clearTimeout}
   * to cancel the timeout.
   */
  static defer(callback: CallableFunction, delay: number, ...args: unknown[]): number {
    return setTimeout(callback, delay, ...args);
  }

  /**
   * Get a value from an Object property.
   *
   * @param obj         The object to check
   * @param path        Array of field name
   * @param fallbackFn  The fallback function
   * @returns The object property value
   */
  static getNestedValue(
    obj: unknown,
    path: string[],
    fallbackFn?: CallableFunction
  ): CallableFunction | never | unknown {
    if (!Array.isArray(path)) {
      return fallbackFn;
    }

    const last = path.length - 1;
    let _temp: unknown = obj;

    if (last < 0) {
      return obj ?? fallbackFn;
    }

    for (let i = 0; i < last; i++) {
      if (_temp == null) {
        return fallbackFn;
      }
      // @ts-expect-error: Overwrite variable
      _temp = _temp[path[i]!];
    }

    if (_temp == null) {
      return fallbackFn;
    }

    // @ts-expect-error: Returning object property value
    return _temp[path[last]] ?? fallbackFn;
  }

  /**
   * Get a value from an Object property.
   *
   * @param obj        The object to evaluate
   * @param path       The property name
   * @param fallbackFn The fallback function
   * @returns The object property value
   */
  static getObjectValueByPath(obj: unknown, path: string, fallbackFn?: CallableFunction): unknown {
    if (!path) {
      return fallbackFn;
    }
    // convert indexes to properties
    path = path.replace(/\[(\w+)]/g, '.$1');
    // strip leading dot
    path = path.replace(/^\./, '');

    return Helper.getNestedValue(obj, path.split('.'), fallbackFn);
  }

  /**
   * Check a value is empty or not.
   *
   * @param value             The value to check
   * @param allowEmptyString  Allow empty string or not
   * @returns TRUE if value is empty otherwise False
   */
  static isEmpty(value: unknown, allowEmptyString = false): value is null | undefined | [] | '' {
    return (
      value == null ||
      typeof value === 'undefined' ||
      (!allowEmptyString ? value === '' : false) ||
      (Array.isArray(value) && value.length === 0)
    );
  }

  /**
   * Check a value is an empty object or not.
   *
   * @param value The value to check
   * @returns TRUE if value is empty otherwise False
   */
  static isEmptyObject(value: unknown): value is null | undefined {
    return (
      value == null ||
      typeof value === 'undefined' ||
      (Helper.isObject(value) && Object.entries(value).length === 0)
    );
  }

  /**
   * Check the type of value is Array or not. NULL value is considered as not an Array.
   *
   * @param value The value to check
   * @returns TRUE if the given value is an Array otherwise FALSE
   */
  static isArray(value: unknown): value is unknown[] {
    return value != null && Array.isArray(value);
  }

  /**
   * Check the type of value is Function or not. NULL or UNDEFINED is considered as not a Function.
   *
   * @param value The value to check
   * @returns TRUE if the given value is a Function otherwise FALSE
   */
  static isFunction(value: unknown): value is CallableFunction {
    return value != null && typeof value === 'function';
  }

  /**
   * Check the type of value, whether it is a number or not.
   *
   * @param value The value to check
   * @returns TRUE if the given value is a Number otherwise FALSE
   */
  static isNumber(value: unknown): value is number {
    return value != null && typeof value === 'number';
  }

  /**
   * Check the type of value is Object or not. NULL value is considered as not an object.
   *
   * @param value The value to check
   * @returns TRUE if the given value is an object otherwise FALSE
   */
  static isObject(value: unknown): value is object {
    return value != null && typeof value === 'object';
  }

  /**
   * Check the type of value, whether it is primitive type or not.
   *
   * @param value The value to check
   * @returns TRUE if the data type is primitive otherwise False
   */
  static isPrimitive(value: unknown): value is string | number | boolean | symbol {
    return (
      value != null &&
      (typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean' ||
        typeof value === 'symbol')
    );
  }

  /**
   * Check the type of value, whether it is a string or not.
   *
   * @param value The value to check
   * @returns TRUE if the given value is a String otherwise FALSE
   */
  static isString(value: unknown): value is string {
    return value != null && typeof value === 'string';
  }

  /**
   * Round floating point value to the nearest decimal.
   *
   * @param value         The floating point value to be rounded
   * @param fractionDigit Maximum fraction/decimal digit
   * @returns The rounded value
   */
  static roundNumber(value: number, fractionDigit: number): number {
    return Number(Math.round(Number(value + 'e' + fractionDigit)) + 'e-' + fractionDigit);
  }

  static parseFloatLoose(value: string): number | undefined {
    const result = parseFloat(value);
    return isNaN(result) ? undefined : result;
  }

  static parseIntLoose(value: string): number | undefined {
    const result = parseInt(value);
    return isNaN(result) ? undefined : result;
  }

  /**
   * Convert Number or String to any valid html css unit size.
   *
   * @param value The value to convert
   * @param unit  The dimension to add
   * @returns Css inline dimension
   */
  static cssUnit(
    value: string | number | undefined | null,
    unit?: string | null
  ): string | undefined {
    const _px = unit || 'px';

    if (Helper.isString(value)) {
      if (value.toLowerCase() === 'auto') {
        return value;
      } else if (isEndWith(value, ['px', 'em', 'rem', '%'])) {
        return value;
      } else {
        return value + _px;
      }
    } else if (Helper.isNumber(value)) {
      return value + _px;
    }

    return undefined;
  }

  /**
   * Sort an array of object.
   *
   * @param items        Array of object
   * @param key          Field name or key to sort
   * @param isDescending Sort desc or asc
   * @returns The sorted array
   */
  static sortArrayObj(items: Array<object>, key: string, isDescending = false) {
    if (key == null) {
      return items;
    }

    return items.sort((a, b) => {
      let sortA = Helper.getObjectValueByPath(a, key) as never;
      let sortB = Helper.getObjectValueByPath(b, key) as never;

      if (isDescending) {
        [sortA, sortB] = [sortB, sortA];
      }

      // Check if both are numbers
      if (!isNaN(sortA) && !isNaN(sortB)) {
        return sortA - sortB;
      }

      // Check if both cannot be evaluated
      if (sortA == null && sortB == null) {
        return 0;
      }

      // @ts-expect-error Unsafe destructuring object and assignment
      [sortA, sortB] = [sortA, sortB].map((s) => String(s || '').toLocaleLowerCase());

      if (sortA > sortB) {
        return 1;
      }
      if (sortA < sortB) {
        return -1;
      }

      return 0;
    });
  }

  /**
   * Generate simple/random UID or standard UUID v4.
   *
   * @param standard If `true` then generate standard UUID v4 otherwise generate random UID
   * @returns UUID v4 or random UID
   */
  static uuid(standard = false): string {
    if (standard) {
      if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        return crypto.randomUUID();
      } else {
        let value = Date.now();
        if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
          value = performance.now(); // use high-precision timer if available
        }

        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
          const r = (value + Math.random() * 16) % 16 | 0;
          value = Math.floor(value / 16);

          return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
        });
      }
    }

    return Math.random().toString(36).slice(4);
  }
}
