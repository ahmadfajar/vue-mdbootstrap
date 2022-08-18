import Helper from "../utils/Helper";

export const cssPrefix = "md";

export const isServer = typeof window === 'undefined';

/**
 * Generate component's ID.
 *
 * @returns {string} The generated ID
 */
export function generateId(): string {
    return 'bs-' + Helper.uuid(true);
}
