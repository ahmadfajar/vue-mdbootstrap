import type { TRecord, TSizeOptionProps, TSizeProps } from '@/types';
import Helper from '@/utils/Helper';

/**
 * Normalize icon name by trimming spaces and make it lowercase. The returns
 * value is a proper icon name and can be used to resolve its theme and style.
 *
 * @param name Raw name or alias name
 */
export function useNormalizeIconName(name: string): string {
    return name.trim().toLowerCase().replaceAll(' ', '_').replaceAll('-', '_');
}

/**
 * Resolve icon real name.
 *
 * @param name Icon name with suffix `_outlined`, `_rounded`, `_sharp`, `_filled`, `_outlined_filled`,
 * `_rounded_filled`, or `_sharp_filled` and has been normalized.
 */
export function useResolveRealIconName(name: string): string {
    return name.replace(
        /(_outlined_filled|_rounded_filled|_sharp_filled|_filled|_outlined|_rounded|_sharp)$/,
        ''
    );
}

/**
 * Resolve the icon theme from the given name.
 *
 * @param name Icon name with suffix `_outlined`, `_rounded`, `_sharp`, `_filled`, `_outlined_filled`,
 * `_rounded_filled`, or `_sharp_filled` and has been normalized.
 */
export function useResolveIconTheme(name: string): string {
    const strIcon = name.replace(/(_filled)$/, '');

    return strIcon.endsWith('_rounded')
        ? 'rounded'
        : strIcon.endsWith('_sharp')
          ? 'sharp'
          : 'outlined';
}

export function useFilledIconStyle(name: string): boolean {
    return name.endsWith('_filled');
}

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
        return (props.size as TSizeProps).height;
    } else {
        return props.height || props.size;
    }
}

export function useSizeWidth(props: Readonly<TSizeOptionProps>): string | number | undefined {
    if (props.size && Helper.isObject(props.size)) {
        return (props.size as TSizeProps).width;
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
    };
}
