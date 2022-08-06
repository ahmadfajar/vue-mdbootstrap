interface ISizeOptionProps {
    size: number,
    height: number,
    width: number,
}

export const size = {
    type: [String, Number],
    validator: (value: string): boolean => !isNaN(parseInt(value, 10))
}

export const height = {
    type: [String, Number],
    default: 24,
    validator: (value: string): boolean => !isNaN(parseInt(value, 10))
}

export const width = {
    type: [String, Number],
    default: 24,
    validator: (value: string): boolean => !isNaN(parseInt(value, 10))
}

export function useSizeHeight(props: ISizeOptionProps): number {
    return props.size && props.size > 0 ? props.size : props.height;
}

export function useSizeWidth(props: ISizeOptionProps): number {
    return props.size && props.size > 0 ? props.size : props.width;
}
