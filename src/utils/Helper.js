/**
 * Class Helper
 *
 * @author Ahmad Fajar
 * @since  05/07/2018, modified: 05/02/2021 21:19
 */
class Helper {
    /**
     * Creates range of number.
     *
     * @param {int} length Range length
     * @returns {number[]}  Array of numbers
     */
    static createRange(length) {
        return Array.from({length}, (v, k) => k);
    }

    /**
     * Defer execution of a function.
     *
     * @param {Function} callback   The function to execute
     * @param {number} delay        Number of delay in ms
     * @returns {void}
     */
    static defer(callback, delay) {
        setTimeout(callback, delay);
    }

    /**
     * Get a value from an Object property.
     *
     * @param {Object} obj     The object to check
     * @param {Array} path     Array of field name
     * @param {*} [fallbackFn] The fallback function
     * @returns {*} The object property value
     */
    static getNestedValue(obj, path, fallbackFn) {
        if (!Array.isArray(path)) {
            return fallbackFn;
        }

        const last = path.length - 1;
        let _temp  = obj;

        if (last < 0) {
            return obj === undefined ? fallbackFn : obj;
        }

        for (let i = 0; i < last; i++) {
            if (_temp == null) {
                return fallbackFn;
            }
            _temp = _temp[path[i]];
        }

        if (_temp == null) {
            return fallbackFn;
        }

        return _temp[path[last]] === undefined ? fallbackFn : _temp[path[last]];
    }

    /**
     * Get a value from an Object property.
     *
     * @param {Object} obj            The object to evaluate
     * @param {String|function} path  The property name
     * @param {*} [fallbackFn]        The fallback function
     * @returns {*} The object property value
     */
    static getObjectValueByPath(obj, path, fallbackFn) {
        if (!path || (typeof path !== 'string')) {
            return fallbackFn;
        }
        path = path.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
        path = path.replace(/^\./, '');           // strip leading dot

        return Helper.getNestedValue(obj, path.split('.'), fallbackFn);
    }

    /**
     * Check a value is empty or not.
     *
     * @param {*} value                     The value to check
     * @param {boolean} [allowEmptyString]  Allow empty string or not
     * @returns {boolean} True if value is empty otherwise False
     */
    static isEmpty(value, allowEmptyString) {
        return (value === null) || (typeof value === 'undefined') || (!allowEmptyString ? value === '' : false) || (Array.isArray(value) && value.length === 0);
    }

    /**
     * Check a value is an empty object or not.
     *
     * @param {Object} value The value to check
     * @returns {boolean} True if value is empty otherwise False
     */
    static isEmptyObject(value) {
        return !Helper.isObject(value) || (Helper.isObject(value) && Object.entries(value).length === 0);
    }

    /**
     * Check data type of a value is Array or not. NULL value is considered as not an Array.
     *
     * @param {*} value The value to check
     * @returns {boolean} TRUE if the given value is an Array otherwise FALSE
     */
    static isArray(value) {
        return (typeof value !== 'undefined' && value !== null && Array.isArray(value));
    }

    /**
     * Check data type of a value is Function or not. NULL or UNDEFINED is considered as not an Function.
     *
     * @param {*} value The value to check
     * @returns {boolean} TRUE if the given value is a Function otherwise FALSE
     */
    static isFunction(value) {
        return (value !== null && typeof value !== 'undefined' && typeof value === 'function');
    }

    /**
     * Check data type of a value, whether it is a number or not.
     *
     * @param {*} value The value to check
     * @returns {boolean} TRUE if the given value is a Number otherwise FALSE
     */
    static isNumber(value) {
        return typeof value === 'number';
    }

    /**
     * Check data type of a value is Object or not. NULL value is considered as not an object.
     *
     * @param {*} value The value to check
     * @returns {boolean} TRUE if the given value is an object otherwise FALSE
     */
    static isObject(value) {
        return (value !== null && typeof value !== 'undefined' && typeof value === 'object');
    }

    /**
     * Check data type of a value, whether it is primitive or not.
     *
     * @param {string|number|boolean} value The value to check
     * @returns {boolean} True if the data type is primitive otherwise False
     */
    static isPrimitive(value) {
        return (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean');
    }

    /**
     * Check data type of a value, whether it is a string or not.
     *
     * @param {*} value The value to check
     * @returns {boolean} TRUE if the given value is a String otherwise FALSE
     */
    static isString(value) {
        return typeof value === 'string';
    }

    /**
     * Round floating point value to the nearest decimal.
     *
     * @param {number} value         The floating point value to be rounded
     * @param {number} fractionDigit Maximum fraction/decimal digit
     * @returns {number} The rounded value
     */
    static roundNumber(value, fractionDigit) {
        return Number(Math.round(Number(value + 'e' + fractionDigit)) + 'e-' + fractionDigit);
    }

    /**
     * Convert Number or String to any valid html size unit.
     *
     * @param {string|number} value The value to convert
     * @param {string} [unit]       The dimension to add
     * @returns {string|null} Value untuk dipergunakan pada inline css
     */
    static sizeUnit(value, unit = 'px') {
        const _px = unit;

        if (typeof value === 'string') {
            if (value.toLowerCase() === 'auto') {
                return value;
            } else if (value.endsWith(_px) || value.endsWith('em') || value.endsWith('rem') || value.endsWith('%')) {
                return value;
            } else {
                return value + _px;
            }
        } else if (typeof value === 'number') {
            return value + _px;
        }

        return null;
    }

    /**
     * Sort an array of object.
     *
     * @param {Array} items           Array of object
     * @param {string} key            Field name or key to sort
     * @param {boolean} [isDescending]  Sort desc or asc
     * @returns {*} The sorted array
     */
    static sortArrayObj(items, key, isDescending) {
        if (key == null) {
            return items;
        }

        return items.sort((a, b) => {
            let sortA = Helper.getObjectValueByPath(a, key);
            let sortB = Helper.getObjectValueByPath(b, key);

            if (isDescending) {
                [sortA, sortB] = [sortB, sortA]
            }

            // Check if both are numbers
            if (!isNaN(sortA) && !isNaN(sortB)) {
                return sortA - sortB;
            }

            // Check if both cannot be evaluated
            if ((sortA === null && sortB === null) || (typeof sortA === 'undefined' && typeof sortB === 'undefined')) {
                return 0;
            }

            [sortA, sortB] = [sortA, sortB].map(s => (
                (s || '').toString().toLocaleLowerCase()
            ));

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
     * Generate simple/random UUID or standard UUID v4.
     *
     * @param {boolean} [standard] Generate standard UUID v4 or random UUID
     * @returns {string} UUID v4 or random UUID
     */
    static uuid(standard = false) {
        if (standard === true) {
            if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
                return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g,
                    c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
                )
            } else {
                let value = Date.now();
                if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
                    value = performance.now(); // use high-precision timer if available
                }

                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
                    let r = (value + Math.random() * 16) % 16 | 0;
                    value = Math.floor(value / 16);

                    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
                });
            }
        }

        return Math.random().toString(36).slice(4);
    }
}

export default Helper;
