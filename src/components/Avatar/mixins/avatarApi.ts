import {h, Prop, VNode} from "vue";
import {useShapeClasses} from "../../Basic/mixins/imageApi";
import {useGetCalcSize, useSizeStyles} from "../../Icon/mixins/iconApi";
import {TSizeOptionProps} from "../../Icon/types";
import {TAvatarIconProps, TImageOptionProps} from "../types";
import {TRecord} from "../../../types";

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
        icon: props.icon as Prop<string>,
        spin: props.iconSpin as Prop<boolean>,
        pulse: props.iconPulse as Prop<boolean>,
        flip: props.iconFlip as Prop<boolean>,
        rotate: props.iconRotation as Prop<string|number>,
    }
}

export function useRenderAvatarImage(props: Readonly<TImageOptionProps>): VNode {
    return h('img', {
        class: useShapeClasses(props.circle, props.rounded),
        style: useSizeStyles(props as Readonly<TImageOptionProps>),
        src: props.imgSrc,
    });
}
