import Helper from "../utils/Helper";

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

export const validStringOrFloatProp = {
    type: [String, Number],
    default: undefined,
    validator: (value: string): boolean => !isNaN(parseFloat(value)),
}

export const tagProp = {
    type: String,
    default: "div",
}

export const defaultColorProp = {
    type: String,
    default: 'default'
};

export const primaryColorProp = {
    type: String,
    default: 'primary'
};

export const defaultTransitionProp = {
    type: String,
    default: 'fade'
};

export const inputProps = {
    /**
     * This input field element ID.
     * @type {string}
     */
    id: {
        type: String,
        default() {
            return 'bs-' + Helper.uuid(true);
        }
    },
    /**
     * This input field element name.
     * @type {string|number}
     */
    name: stringOrNumberProp,
    /**
     * This input field state.
     * @type {boolean}
     */
    disabled: booleanProp,
    /**
     * This input field state.
     * @type {boolean}
     */
    readonly: booleanProp,
    /**
     * Whether this input field is required or not.
     * @type {boolean}
     */
    required: booleanProp
}
