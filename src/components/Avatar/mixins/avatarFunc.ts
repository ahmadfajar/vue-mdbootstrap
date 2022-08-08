import {h, VNode} from "vue";
import {TBsAvatarOptionProps} from "./types";
import {useShapeClasses} from "../../Basic/mixins/imageFunc";
import {useGetCalcSize, useSizeStyles} from "../../Icon/mixins/SizeProps";
import {TSizeOptionProps} from "../../Icon/mixins/types";

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

export function useRenderAvatarImage(props: Readonly<TBsAvatarOptionProps>): VNode {
    return h('img', {
        class: useShapeClasses(props.circle, props.rounded),
        style: useSizeStyles(props as Readonly<TBsAvatarOptionProps>),
        src: props.imgSrc,
    });
}
