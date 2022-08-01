/**
 * Pads the input string with a given string (possibly repeated) so that the resulting string
 * reaches a given length. The padding is applied from the start (left) of the input string.
 *
 * @param {string|number} str       The string to Pad.
 * @param {number} maxLength The length of the resulting string once the current string has
 *                           been padded. If this parameter is smaller than the current
 *                           string's length, the current string will be returned as it is.
 * @param {string} fillString The string to pad the current string with.
 *                            If this string is too long, it will be truncated and the left-most
 *                            part will be applied. The default value for this parameter is " " (U+0020).
 * @returns {string} New String that has been padded on the left side.
 */
export function padLeft(str: string | number, maxLength = 2, fillString = '0'): string {
    const outString = String(str);

    if (outString.length >= maxLength) {
        return outString
    }

    return outString.padStart(maxLength, fillString)
}

/**
 * Pads the input string with a given string (possibly repeated) so that the resulting string
 * reaches a given length. The padding is applied from the end (right) of the input string.
 *
 * @param {string|number} str       The string to Pad.
 * @param {number} maxLength The length of the resulting string once the current string has
 *                           been padded. If this parameter is smaller than the current
 *                           string's length, the current string will be returned as it is.
 * @param {string} fillString The string to pad the current string with.
 *                            If this string is too long, it will be truncated and the left-most
 *                            part will be applied. The default value for this parameter is " " (U+0020).
 * @returns {string} New String that has been padded on the right side.
 */
export function padRight(str: string | number, maxLength = 2, fillString = '0'): string {
    const outString = String(str);
    if (outString.length >= maxLength) {
        return outString
    }

    return outString.padEnd(maxLength, fillString)
}
