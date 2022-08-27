import {ComponentOptionsMixin, ComputedOptions, defineComponent, EmitsOptions, h} from "vue";
import {useShapeClasses} from "../Basic/mixins/imageApi";
import {useGetCalcSize, useSizeStyles} from "../Icon/mixins/iconApi";
import {useAvatarIconSize, useCreateIconProps, useRenderAvatarImage} from "./mixins/avatarApi";
import {cssPrefix, useRenderSlot} from "../../mixins/CommonApi";
import {avatarProps} from "./mixins/avatarProps";
import {BsIcon} from "../Icon";
import {TBsAvatar} from "./types";
import Helper from "../../utils/Helper";

export default defineComponent<TBsAvatar, unknown, unknown, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: 'BsAvatar',
    props: avatarProps,
    setup(props, {slots}) {
        return () =>
            h('div',
                {
                    class: {
                        [`${cssPrefix}avatar`]: true,
                        'p-2': useGetCalcSize(props) > 72,
                        ...useShapeClasses(props.circle, props.rounded),
                    },
                    style: useSizeStyles(props),
                }, useRenderSlot(
                    slots, 'default', {key: Helper.uuid()},
                    (
                        (props.imgSrc && props.imgSrc !== '')
                            ? useRenderAvatarImage(props)
                            : (props.icon && props.icon !== '')
                                ? h(BsIcon, {
                                    size: useAvatarIconSize(props),
                                    ...useCreateIconProps(props),
                                })
                                : h('span',
                                    {class: [`${cssPrefix}avatar-text`]},
                                    props.text || '?',
                                )
                    )
                )
                // slots.default
                //     ? slots.default()
                //     : (
                //         (props.imgSrc && props.imgSrc !== '')
                //             ? useRenderAvatarImage(props)
                //             : (props.icon && props.icon !== '')
                //                 ? h(BsIcon, {
                //                     size: useAvatarIconSize(props),
                //                     ...useCreateIconProps(props),
                //                 })
                //                 : h('span',
                //                     {class: [`${cssPrefix}avatar-text`]},
                //                     props.text || '?',
                //                 )
                //     )
            )
    }
});
