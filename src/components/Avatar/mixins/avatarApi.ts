import {
    useGetCalcSize,
    useNormalizeIconName,
    useSizeStyles,
} from '@/components/Icon/mixins/iconApi';
import { isEndWith } from '@/mixins/StringHelper';
import type { TAvatarImageOptionProps, TIconProps, TRecord, TSizeOptionProps } from '@/types';
import type { VNode } from 'vue';
import { h } from 'vue';

export function useAvatarIconSize(props: Readonly<TSizeOptionProps>): number {
    const size = useGetCalcSize(props);
    if (size > 72) {
        return size - 20;
    } else if (size > 32) {
        return size - 12;
    } else {
        return size - 8;
    }
}

export function useCreateIconProps(props: Readonly<TIconProps>): TRecord {
    const strIcon = props.icon ? useNormalizeIconName(props.icon) : undefined;
    const hasSuffix = isEndWith(strIcon, [
        '_outlined_filled',
        '_rounded_filled',
        '_sharp_filled',
        '_filled',
        '_outlined',
        '_rounded',
        '_sharp',
    ]);
    const iconName =
        hasSuffix && strIcon ? strIcon : (strIcon && props.iconVariant ? `${strIcon}_${props.iconVariant}` : strIcon);

    return {
        icon: iconName,
        spin: props.iconSpin,
        pulse: props.iconPulse,
        flip: props.iconFlip,
        rotate: props.iconRotation,
    };
}

export function useShapeClasses(
    circle?: boolean,
    rounded?: boolean
): Record<string, boolean | undefined> {
    return {
        'rounded-circle': circle && !rounded,
        rounded: rounded,
    };
}

export function useRenderAvatarImage(props: Readonly<TAvatarImageOptionProps>): VNode {
    return h('img', {
        class: useShapeClasses(props.circle, props.rounded),
        style: useSizeStyles(props),
        src: props.imgSrc,
        alt: '',
    });
}
