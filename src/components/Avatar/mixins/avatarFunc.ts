import {h, VNode} from "vue";
import {TImageOptionProps} from "./types";
import {TSizeOptionProps} from "../../Icon/mixins/types";
import {useShapeClasses} from "../../Basic/mixins/imageFunc";
import {useGetCalcSize, useSizeStyles} from "../../Icon/mixins/SizeProps";

export function useAvatarIconSize(props: TSizeOptionProps): number {
    const size = useGetCalcSize(props);
    if (size > 72) {
        return size - 20;
    } else if (size > 32) {
        return size - 12;
    } else {
        return size - 8;
    }
}

export function useRenderAvatarImage(props: Readonly<TImageOptionProps>): VNode {
    return h('img', {
        class: useShapeClasses(props.circle, props.rounded),
        style: useSizeStyles(props as Readonly<TImageOptionProps>),
        src: props.imgSrc,
    });
}
