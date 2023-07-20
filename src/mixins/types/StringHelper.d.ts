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
export declare function padLeft(str: string | number, maxLength?: number, fillString?: string): string;

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
export declare function padRight(str: string | number, maxLength?: number, fillString?: string): string;

/**
 * Simple function to transform the input string into Title Case.
 *
 * @param text The input string to transform.
 * @returns New string that has been transform to Title Case.
 */
export declare function titleCase(text: string): string;

/**
 * Simple function to transform the input string into [camel Case](https://en.wikipedia.org/wiki/Camel_case).
 *
 * @param text The input string to transform.
 * @returns New string that has been transform to "camelCase".
 */
export declare function camelCase(text: string): string;

/**
 * Simple function to transform the input string into [kebab-case](https://en.wikipedia.org/wiki/Letter_case#Use_within_programming_languages).
 *
 * @param text The input string to transform.
 * @returns New string that has been transform to "kebab-case".
 */
export declare function kebabCase(text: string): string;

/**
 * Create an array of chunked strings.
 *
 * @param source The input string.
 * @param size   The number of characters within a chunk.
 * @returns Array of chunked strings.
 */
export declare function chunk(source: string, size?: number): string[];
