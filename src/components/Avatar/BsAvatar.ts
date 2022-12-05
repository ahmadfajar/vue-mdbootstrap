import type {ComponentOptionsMixin, ComputedOptions, EmitsOptions, Prop} from "vue";
import {defineComponent, h} from "vue";
import {cssPrefix, useRenderSlot} from "../../mixins/CommonApi";
import {useGetCalcSize, useSizeStyles} from "../Icon/mixins/iconApi";
import {useAvatarIconSize, useCreateIconProps, useRenderAvatarImage, useShapeClasses} from "./mixins/avatarApi";
import {avatarProps} from "./mixins/avatarProps";
import {BsIcon} from "../Icon";
import type {TAvatarOptionProps, TBsAvatar, TBsIcon, TRecord} from "../../types";
import Helper from "../../utils/Helper";

export default defineComponent<TBsAvatar, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: 'BsAvatar',
    props: avatarProps,
    setup(props, {slots}) {
        const cmpProps = props as Readonly<TAvatarOptionProps>;

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
                            : (
                                (cmpProps.icon && cmpProps.icon !== '')
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
            )
    }
});
