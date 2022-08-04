export const iconName = {
    type: String,
    required: true
}

export const iconVariant = {
    type: String,
    default: "filled",
    validator: (value: string): boolean => ["outlined", "filled", "round", "sharp"].includes(value),
}

export const flip = {
    type: String,
    default: undefined,
    validator: (value: string): boolean => ['horizontal', 'vertical', 'both'].includes(value),
}

export const rotate = {
    type: [String, Number],
    default: undefined,
    validator: (value: string | number): boolean => [90, 180, 270].includes(parseInt(String(value), 10))
}
