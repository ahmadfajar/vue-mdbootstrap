import Helper from "../utils/Helper";

export const cssPrefix = "md";

export const isServer = typeof window === 'undefined';

/**
 * Generate component's ID.
 *
 * @returns {string} The generated ID
 */
export function useGenerateId(): string {
    return 'bs-' + Helper.uuid(true);
}

/**
 * Check whether IE browser is used or not.
 * @return {boolean} Returns `true` if IE browser is used otherwise `false`.
 */
export function useBrowserIE() {
    return !isServer && navigator.userAgent.toLowerCase().includes('trident')
}
