import moment from "moment";

const INVALID_DATE = "Invalid date value";

/**
 * Check if the given array can be constructed as Date object.
 *
 * @param {number[]} values Array of numbers
 * @returns {boolean} TRUE if can be converted to Date otherwise FALSE
 */
function isArrayDateValid(values) {
    if (values.length > 0) {
        const year  = values[0].length === 4;
        const month = values.length > 1 && values[1] > -1;
        const day   = values.length > 2 && values[2] > 0;

        return (values.length === 1 && year) || (year && month) || (year && month && day);
    }

    return false;
}

/**
 * Parse the given DateString in ISO-8601 format.
 *
 * @param {string} value The valid date string
 * @returns {Date} The Date value
 */
function parseDateString(value) {
    const _split   = value.split('-');
    const _hasTime = value.indexOf(':') > -1;

    if (_split[0].length !== 4) {
        throw new Error(INVALID_DATE);
    } else if (_split.length > 1 && isNaN(parseInt(_split[1], 10))) {
        throw new Error(INVALID_DATE);
    } else if (_split.length > 2 && !_hasTime && isNaN(parseInt(_split[2], 10))) {
        throw new Error(INVALID_DATE);
    }

    return _hasTime ? new Date(value) : new Date(`${value}T00:00:00+00:00`);
}

/**
 * Parse the given date value.
 * If the given value is a Date or Moment object instance then no parsing is required.
 * Otherwise it will parse the given value and returns a Date object if valid.
 *
 * @param {moment.Moment|Date|string|number|[number]} value A valid date value
 * @returns {Date} The date value
 */
function parseDate(value) {
    if (value instanceof moment) {
        return value.toDate();
    } else if (value instanceof Date) {
        return value;
    } else if (Array.isArray(value) && isArrayDateValid(value)) {
        return new Date(value);
    } else if (typeof value === 'number') {
        return new Date(value);
    } else if (typeof value === 'string') {
        return parseDateString(value);
    }

    throw new Error(INVALID_DATE);
}

/**
 * Parse the given date value and returns date string in ISO-8601 format.
 *
 * @param {string} value Valid date string
 * @returns {string} ISO-8601 formatted date
 */
function makeIsoDate(value) {
    try {
        const _date = parseDate(value);
        return _date.toISOString();
    } catch (e) {
        return new Date().toISOString();
    }
}

export default (locale, options, {start, length} = {start: 0, length: 0}) => {
    try {
        const intlFormatter = new Intl.DateTimeFormat(locale || undefined, options);
        return value => intlFormatter.format(parseDate(value));
    } catch (e) {
        return (start || length) ? value => makeIsoDate(value).substr(start, length) : value => makeIsoDate(value).substr(0, 10);
    }
}
