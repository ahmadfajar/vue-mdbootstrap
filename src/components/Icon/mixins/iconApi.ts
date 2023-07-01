import type { TRecord, TSizeOptionProps, TSizeProps } from '../../../types';
import Helper from '../../../utils/Helper';

export function useGetCalcSize(props: Readonly<TSizeOptionProps>): number {
    if (!props.size && !props.height && !props.width) {
        return 0;
    } else {
        return (useSizeHeight(props) || useSizeWidth(props) || 0) as number;
    }
}

export function useSizeHeight(props: Readonly<TSizeOptionProps>): string | number | undefined {
    if (props.size && Helper.isObject(props.size)) {
        return (<TSizeProps>props.size).height;
    } else if (props.size && (Helper.isNumber(props.size) || Helper.isString(props.size))) {
        return <string | number>props.size;
    } else {
        return props.height;
    }
}

export function useSizeWidth(props: Readonly<TSizeOptionProps>): string | number | undefined {
    if (props.size && Helper.isObject(props.size)) {
        return (<TSizeProps>props.size).width;
    } else if (props.size && (Helper.isNumber(props.size) || Helper.isString(props.size))) {
        return <string | number>props.size;
    } else {
        return props.width;
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
