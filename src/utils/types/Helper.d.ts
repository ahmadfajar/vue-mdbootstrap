/**
 * Class Helper with static functions.
 *
 * @author Ahmad Fajar
 * @since  05/07/2018, modified: 26/02/2024 03:41
 */
export default class Helper {
    /**
     * Creates range of number.
     *
     * @param length Range length
     * @returns Array of numbers
     */
    static createRange(length: number): number[];
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
    static defer(callback: CallableFunction, delay: number, ...args: unknown[]): number;
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
    ): CallableFunction | never | unknown;
    /**
     * Get a value from an Object property.
     *
     * @param obj        The object to evaluate
     * @param path       The property name
     * @param fallbackFn The fallback function
     * @returns The object property value
     */
    static getObjectValueByPath(obj: unknown, path: string, fallbackFn?: CallableFunction): unknown;
    /**
     * Check a value is empty or not.
     *
     * @param value             The value to check
     * @param allowEmptyString  Allow empty string or not
     * @returns TRUE if value is empty otherwise False
     */
    static isEmpty(value: unknown, allowEmptyString?: boolean): value is null | undefined | [] | '';
    /**
     * Check a value is an empty object or not.
     *
     * @param value The value to check
     * @returns TRUE if value is empty otherwise False
     */
    static isEmptyObject(value: unknown): value is null | undefined;
    /**
     * Check the type of value is Array or not. NULL value is considered as not an Array.
     *
     * @param value The value to check
     * @returns TRUE if the given value is an Array otherwise FALSE
     */
    static isArray(value: unknown): value is any[];
    /**
     * Check the type of value is Function or not. NULL or UNDEFINED is considered as not a Function.
     *
     * @param value The value to check
     * @returns TRUE if the given value is a Function otherwise FALSE
     */
    static isFunction(value: unknown): value is CallableFunction;
    /**
     * Check the type of value, whether it is a number or not.
     *
     * @param value The value to check
     * @returns TRUE if the given value is a Number otherwise FALSE
     */
    static isNumber(value: unknown): value is number;
    /**
     * Check the type of value is Object or not. NULL value is considered as not an object.
     *
     * @param value The value to check
     * @returns TRUE if the given value is an object otherwise FALSE
     */
    static isObject(value: unknown): value is object;
    /**
     * Check the type of value, whether it is primitive type or not.
     *
     * @param value The value to check
     * @returns TRUE if the data type is primitive otherwise False
     */
    static isPrimitive(value: unknown): value is string | number | boolean | symbol;
    /**
     * Check the type of value, whether it is a string or not.
     *
     * @param value The value to check
     * @returns TRUE if the given value is a String otherwise FALSE
     */
    static isString(value: unknown): value is string;
    /**
     * Round floating point value to the nearest decimal.
     *
     * @param value         The floating point value to be rounded
     * @param fractionDigit Maximum fraction/decimal digit
     * @returns The rounded value
     */
    static roundNumber(value: number, fractionDigit: number): number;
    static parseFloatLoose(value: string): number | undefined;
    static parseIntLoose(value: string): number | undefined;
    /**
     * Convert Number or String to any valid html css unit size.
     *
     * @param value The value to convert
     * @param unit  The dimension to add
     * @returns Css inline dimension
     */
    static cssUnit(
        value: string | number | undefined | null,
        unit?: string | undefined | null
    ): string | undefined;
    /**
     * Sort an array of object.
     *
     * @param items        Array of object
     * @param key          Field name or key to sort
     * @param isDescending Sort desc or asc
     * @returns The sorted array
     */
    static sortArrayObj(items: Array<object>, key: string, isDescending?: boolean): object[];
    /**
     * Generate simple/random UUID or standard UUID v4.
     *
     * @param standard If `true` then generate standard UUID v4 otherwise generate random UUID
     * @returns UUID v4 or random UUID
     */
    static uuid(standard?: boolean): string;
}
