export const buttonMode = {
    type: String,
    default: "default",
    validator: (value: string): boolean => ["default", "icon", "floating"].includes(value)
}

export const buttonSize = {
    type: String,
    default: undefined,
    validator: (value: string): boolean => ["xs", "sm", "lg"].includes(value)
}

export const buttonType = {
    type: String,
    default: "button",
    validator: (value: string): boolean => ["button", "submit", "reset"].includes(value)
}

export const iconPosition = {
    type: String,
    default: "left",
    validator: (value: string): boolean => ["left", "right"].includes(value)
}
