import type { TRecord, TSizeOptionProps, TSizeProps } from '../../../types';
import Helper from '../../../utils/Helper';

export function useGetCalcSize(props: Readonly<TSizeOptionProps>): number {
    if (!props.size && !props.height && !props.width) {
        return 0;
    } else {
        const size = useSizeHeight(props) ?? useSizeWidth(props);
        if (Helper.isString(size)) {
            if (size.endsWith('em') || size.endsWith('rem')) {
                return parseFloat(size) * 16;
            } else if (size.endsWith('px')) {
                return parseInt(size, 10);
            } else {
                return parseFloat(size);
            }
        } else {
            return size as number;
        }
    }
}

export function useSizeHeight(props: Readonly<TSizeOptionProps>): string | number | undefined {
    if (props.size && Helper.isObject(props.size)) {
        return (<TSizeProps>props.size).height;
    } else {
        return props.height || props.size;
    }
}

export function useSizeWidth(props: Readonly<TSizeOptionProps>): string | number | undefined {
    if (props.size && Helper.isObject(props.size)) {
        return (<TSizeProps>props.size).width;
    } else {
        return props.width || props.size;
    }
}

export function useSizeStyles(props: Readonly<TSizeOptionProps>): TRecord {
    const szHeight = useSizeHeight(props);
    const szWidth = useSizeWidth(props);

    return {
        height: Helper.cssUnit(szHeight),
        width: Helper.cssUnit(szWidth),
    }
}
