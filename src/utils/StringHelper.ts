import { camelCase as loCamelCase, kebabCase as loKebabCase } from 'lodash-es';

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
    return outString;
  }

  return outString.padStart(maxLength, fillString);
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
    return outString;
  }

  return outString.padEnd(maxLength, fillString);
}

/**
 * Simple function to transform the input string into "Title Case".
 *
 * @param text The input string to transform.
 * @returns New string that has been transform to "Title Case".
 */
export function titleCase(text?: string): string {
  if (!text) {
    return '';
  }

  return (
    text
      ?.toLowerCase()
      .split(/[-_\s]+/)
      .map(function (word: string) {
        return word.replace(word[0], word[0].toUpperCase());
      })
      .join(' ')
      .trim() ?? ''
  );
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

/**
 * Replace special characters from the given `source` with encoded chars.
 *
 * Double quote will always be encoded to HTML entity unless `excludeDblQuote` is set to `true`.
 *
 * @param source            The input string to encode.
 * @param excludeDblQuote   Optional, don't convert double quote to HTML entity.
 * @param chars             Optional, special characters to encode.
 * @param replaces          Optional, the encoded characters or replacement characters for the given `chars`.
 */
export function encodeSpecialChars(
  source: string,
  excludeDblQuote = false,
  chars?: string[],
  replaces?: string[]
): string {
  const validReps =
    Array.isArray(chars) &&
    Array.isArray(replaces) &&
    chars.length > 0 &&
    chars.length === replaces.length;

  const s1 = validReps ? chars : ['#', '!', '$', '%', '&', '<', '>', '?', '@'];
  const s2 = validReps ? replaces : ['23', '21', '24', '25', '26', '3C', '3E', '3F', '40'];
  const nLength = source.length;
  let retVal = '';

  for (let i = 0; i < nLength; i++) {
    if (source.at(i) === '"' && !excludeDblQuote) {
      retVal += '&#' + source.codePointAt(i) + ';';
    } else if (s1.includes(source.charAt(i))) {
      const n = s1.indexOf(source.charAt(i));

      if (s2[n].startsWith('%')) {
        retVal += s2[n];
      } else {
        retVal += '%' + s2[n];
      }
    } else {
      retVal += source.charAt(i);
    }
  }

  return retVal;
}

/**
 * Simple function to convert the input string into
 * [camel Case](https://en.wikipedia.org/wiki/Camel_case).
 *
 * @param text The input string to convert.
 * @returns New string that has been transform to "camelCase".
 */
export function camelCase(text: string): string {
  return loCamelCase(text);
}

/**
 * Simple function to convert the input string into
 * [kebab-case](https://en.wikipedia.org/wiki/Letter_case#Use_within_programming_languages).
 *
 * @param text The input string to convert.
 * @returns New string that has been transform to "kebab-case".
 */
export function kebabCase(text: string): string {
  return loKebabCase(text);
}

/**
 * Determines whether an input string starts with any of the specified string,
 * returning true or false as appropriate. The test is performed in
 * case-sensitive manner.
 *
 * @param source   The input string.
 * @param searches Collection of string to search at the start of input string.
 * @returns If any of the given string in the collection is found at the start of
 *          the input string then `true` is returned, otherwise `false`.
 */
export function isStartWith(source?: string, searches?: string[]): boolean {
  if (source && searches) {
    return searches.some((s) => source.startsWith(s));
  }

  return false;
}

/**
 * Determines whether an input string ends with any of the specified string,
 * returning true or false as appropriate. The test is performed in
 * case-sensitive manner.
 *
 * @param source   The input string.
 * @param searches Collection of string to search at the end of input string.
 * @returns If any of the given string in the collection is found at the end of
 *          the input string then `true` is returned, otherwise `false`.
 */
export function isEndWith(source?: string, searches?: string[]): boolean {
  if (source && searches) {
    return searches.some((s) => source.endsWith(s));
  }

  return false;
}

/**
 * Determines whether an input string contains any of the specified string,
 * returning true or false as appropriate. The test is performed in
 * case-sensitive manner.
 *
 * @param source   The input string.
 * @param searches Collection of string to be searched.
 * @returns If any of the given string in the collection is found at any position
 *          of the input string then `true` is returned, otherwise `false`.
 */
export function isContains(source?: string, searches?: string[]): boolean {
  if (source && searches) {
    return searches.some((s) => source.includes(s));
  }

  return false;
}
