import {ComponentOptionsMixin, ComputedOptions, defineComponent, EmitsOptions, h, Prop} from "vue";
import {useShapeClasses} from "../Basic/mixins/imageApi";
import {useGetCalcSize, useSizeStyles} from "../Icon/mixins/iconApi";
import {useAvatarIconSize, useCreateIconProps, useRenderAvatarImage} from "./mixins/avatarApi";
import {cssPrefix, useRenderSlot} from "../../mixins/CommonApi";
import {avatarProps} from "./mixins/avatarProps";
import {BsIcon} from "../Icon";
import {TAvatarOptionProps, TBsAvatar} from "./types";
import {TRecord} from "../../types";
import Helper from "../../utils/Helper";
import {TBsIcon} from "../Icon/types";

export default defineComponent<TBsAvatar, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: 'BsAvatar',
    props: avatarProps,
    setup(props, {slots}) {
        const cmpProps = props as Readonly<TAvatarOptionProps>

        return () =>
            h('div',
                {
                    class: {
                        [`${cssPrefix}avatar`]: true,
                        'p-2': useGetCalcSize(cmpProps) > 72,
                        ...useShapeClasses(cmpProps.circle, cmpProps.rounded),
                    },
                    style: useSizeStyles(cmpProps),
                }, useRenderSlot(
                    slots, 'default', {key: Helper.uuid()},
                    (
                        (cmpProps.imgSrc && cmpProps.imgSrc !== '')
                            ? useRenderAvatarImage(cmpProps)
                            : (cmpProps.icon && cmpProps.icon !== '')
                                ? h<TBsIcon>(BsIcon, {
                                    size: <Prop<number>>useAvatarIconSize(cmpProps),
                                    ...useCreateIconProps(cmpProps),
                                })
                                : h('span',
                                    {class: [`${cssPrefix}avatar-text`]},
                                    cmpProps.text || '?',
                                )
                    )
                )
            )
    }
});
