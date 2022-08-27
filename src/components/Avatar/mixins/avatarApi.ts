import {h, VNode} from "vue";
import {useShapeClasses} from "../../Basic/mixins/imageApi";
import {useGetCalcSize, useSizeStyles} from "../../Icon/mixins/iconApi";
import {TSizeOptionProps} from "../../Icon/types";
import {TAvatarIconProps, TImageOptionProps} from "../types";

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

export function useCreateIconProps(props: Readonly<TAvatarIconProps>) {
    return {
        icon: props.icon,
        spin: props.iconSpin,
        pulse: props.iconPulse,
        flip: props.iconFlip,
        rotate: props.iconRotation,
    }
}

export function useRenderAvatarImage(props: Readonly<TImageOptionProps>): VNode {
    return h('img', {
        class: useShapeClasses(props.circle, props.rounded),
        style: useSizeStyles(props as Readonly<TImageOptionProps>),
        src: props.imgSrc,
    });
}
