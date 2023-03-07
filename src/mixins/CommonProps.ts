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

export const numberProp = {
    type: Number,
    default: undefined,
}

export const dateProp = {
    type: Date,
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

export const stringOrArrayProp = {
    type: [String, Array],
    default: undefined
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
    default: "default"
};

export const primaryColorProp = {
    type: String,
    default: "primary"
};

export const whiteColorProp = {
    type: String,
    default: "white"
};

export const defaultTransitionProp = {
    type: String,
    default: "fade"
};

export const routerProps = {
    activeClass: stringProp,
    /**
     * Internal, router or navigation path.
     * @type {string}
     */
    path: stringProp,
    /**
     * Navigation url.
     * @type {string}
     */
    url: stringProp
}
