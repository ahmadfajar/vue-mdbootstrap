import Helper from "../utils/Helper";

export const cssPrefix = "md";

export const booleanProp = {
    type: Boolean,
    default: false,
}

export const booleanTrueProp = {
    type: Boolean,
    default: true,
}

export const stringProp = {
    type: String,
    default: undefined,
}

export const stringRequiredProp = {
    type: String,
    default: undefined,
    required: true,
}

export const stringOrNumberProp = {
    type: [String, Number],
    default: undefined,
}

export const validStringOrNumberProp = {
    type: [String, Number],
    default: undefined,
    validator: (value: string): boolean => !isNaN(parseInt(value, 10)),
}

export const tagProp = {
    type: String,
    default: "div",
}

/**
 * Generate component's ID.
 *
 * @returns {string} The generated ID
 */
export function generateId(): string {
    return 'bs-' + Helper.uuid(true);
}
