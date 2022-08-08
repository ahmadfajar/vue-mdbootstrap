import {TSizeOptionProps} from "./types";
import Helper from "../../../utils/Helper";

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

export function useGetCalcSize(props: Readonly<TSizeOptionProps>): number {
    if (!props.size && !props.height && !props.width) {
        return 0;
    } else if (props.size && parseInt(String(props.size), 10) > 0) {
        return parseInt(String(props.size), 10)
    } else if (props.height && parseInt(String(props.height), 10) > 0) {
        return parseInt(String(props.height), 10)
    } else {
        return parseInt(String(props.width), 10)
    }
}

export function useSizeHeight(props: Readonly<TSizeOptionProps>): number {
    return props.size && props.size > 0 ? props.size : props.height;
}

export function useSizeWidth(props: Readonly<TSizeOptionProps>): number {
    return props.size && props.size > 0 ? props.size : props.width;
}

export function useSizeStyles(props: Readonly<TSizeOptionProps>): object {
    const szHeight = useSizeHeight(props);
    const szWidth = useSizeWidth(props);

    return {
        height: Helper.sizeUnit(szHeight),
        width: Helper.sizeUnit(szWidth),
    }
}
