import Helper from "../utils/Helper";

export const cssPrefix = "md";

export const booleanProp = {
    type: Boolean,
    default: false
}

/**
 * Generate component's ID.
 *
 * @returns {string} The generated ID
 */
export function generateId(): string {
    return 'bs-' + Helper.uuid(true);
}
