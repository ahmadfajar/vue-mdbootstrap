import {h, Prop, VNode} from "vue";
import {useShapeClasses} from "../../Basic/mixins/imageApi";
import {useGetCalcSize, useSizeStyles} from "../../Icon/mixins/iconApi";
import type {TAvatarIconProps, TAvatarImageOptionProps, TRecord, TSizeOptionProps} from "../../../types";

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

export function useCreateIconProps(props: Readonly<TAvatarIconProps>): TRecord {
    return {
        icon: <Prop<string | undefined>>props.icon,
        // @ts-ignore
        spin: <Prop<boolean>>props.iconSpin,
        // @ts-ignore
        pulse: <Prop<boolean>>props.iconPulse,
        flip: <Prop<boolean>>props.iconFlip,
        rotate: <Prop<string | number>>props.iconRotation,
    }
}

export function useRenderAvatarImage(props: Readonly<TAvatarImageOptionProps>): VNode {
    return h('img', {
        class: useShapeClasses(props.circle, props.rounded),
        style: useSizeStyles(props),
        src: props.imgSrc,
    });
}
