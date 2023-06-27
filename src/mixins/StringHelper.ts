export { kebabCase, camelCase } from 'lodash';

/**
 * Pads the input string with a given string (possibly repeated) so that the resulting string
 * reaches a given length. The padding is applied from the start (left) of the input string.
 *
 * @param str        The string to Pad.
 * @param maxLength  The length of the resulting string once the current string has
 *                   been padded. If this parameter is smaller than the current
 *                   string's length, the current string will be returned as it is.
 * @param fillString The string to pad the current string with.
 *                   If this string is too long, it will be truncated and the left-most
 *                   part will be applied. The default value for this parameter is " " (U+0020).
 * @returns New String that has been padded on the left side.
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
 * @param str        The string to Pad.
 * @param maxLength  The length of the resulting string once the current string has
 *                   been padded. If this parameter is smaller than the current
 *                   string's length, the current string will be returned as it is.
 * @param fillString The string to pad the current string with.
 *                   If this string is too long, it will be truncated and the left-most
 *                   part will be applied. The default value for this parameter is " " (U+0020).
 * @returns New String that has been padded on the right side.
 */
export function padRight(str: string | number, maxLength = 2, fillString = '0'): string {
    const outString = String(str);

    if (outString.length >= maxLength) {
        return outString
    }

    return outString.padEnd(maxLength, fillString)
}

/**
 * Simple function to transform the input string into Title Case.
 *
 * @param text The input string.
 * @returns New string that has been transform to Title Case.
 */
export function titleCase(text: string): string {
    return text.toLowerCase()
        .split(/[-_\s]+/)
        .map(function (word: string) {
            return word?.replace(word[0], word[0]?.toUpperCase())
        }).join(' ').trim();
}

/**
 * Create an array of chunked strings.
 *
 * @param source The input string.
 * @param size   The number of characters within a chunk.
 * @returns Array of chunked strings.
 */
export function chunk(source: string, size = 1): string[] {
    const chunked: string[] = [];

    for (let i = 0; i < source.length; i += size) {
        chunked.push(source.substring(i, size + i));
    }

    return chunked;
}
