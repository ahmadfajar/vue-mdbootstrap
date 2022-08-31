import {TSizeOptionProps} from "../types";
import Helper from "../../../utils/Helper";

export function useGetCalcSize(props: Readonly<TSizeOptionProps>): number {
    if (!props.size && !props.height && !props.width) {
        return 0;
    } else if (props.size && parseInt(<string>props.size, 10) > 0) {
        return parseInt(<string>props.size, 10)
    } else if (props.height && parseInt(<string>props.height, 10) > 0) {
        return parseInt(<string>props.height, 10)
    } else {
        return parseInt(<string>props.width, 10)
    }
}

export function useSizeHeight(props: Readonly<TSizeOptionProps>): string | number | undefined {
    return props.size && (props.size as number) > 0 ? props.size : props.height;
}

export function useSizeWidth(props: Readonly<TSizeOptionProps>): string | number | undefined {
    return props.size && (props.size as number) > 0 ? props.size : props.width;
}

export function useSizeStyles(props: Readonly<TSizeOptionProps>): object {
    const szHeight = useSizeHeight(props);
    const szWidth = useSizeWidth(props);

    return {
        height: Helper.sizeUnit(szHeight),
        width: Helper.sizeUnit(szWidth),
    }
}
