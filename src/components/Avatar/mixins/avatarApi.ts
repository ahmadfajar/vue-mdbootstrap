import type { Prop, VNode } from 'vue';
import { h } from 'vue';
import type {
    TAvatarImageOptionProps,
    TFlipMode,
    TIconProps,
    TRecord,
    TSizeOptionProps,
} from '../../../types';
import Helper from '../../../utils/Helper';
import { useGetCalcSize, useSizeStyles } from '../../Icon/mixins/iconApi';

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
    return {
        icon: props.icon as Prop<string | undefined>,
        spin: props.iconSpin,
        pulse: props.iconPulse,
        flip: props.iconFlip as Prop<TFlipMode>,
        rotate: props.iconRotation as Prop<string | number>,
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
