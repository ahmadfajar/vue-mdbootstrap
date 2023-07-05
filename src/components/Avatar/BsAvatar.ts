import type { ComponentOptionsMixin, ComputedOptions, EmitsOptions, MethodOptions, Prop } from 'vue';
import { defineComponent, h } from 'vue';
import { cssPrefix, useRenderSlot } from '../../mixins/CommonApi';
import type { TAvatarOptionProps, TBsAvatar, TBsIcon, TRecord } from '../../types';
import Helper from '../../utils/Helper';
import { BsIcon } from '../Icon';
import { useGetCalcSize, useSizeStyles } from '../Icon/mixins/iconApi';
import { useAvatarIconSize, useCreateIconProps, useRenderAvatarImage, useShapeClasses } from './mixins/avatarApi';
import { avatarProps } from './mixins/avatarProps';

export default defineComponent<TBsAvatar, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>({
    name: 'BsAvatar',
    props: avatarProps,
    setup(props, {slots}) {
        const thisProps = props as Readonly<TAvatarOptionProps>;

        return () =>
            h('div',
                {
                    class: {
                        [`${cssPrefix}avatar`]: true,
                        ...useShapeClasses(thisProps.circle, thisProps.rounded),
                        'p-2': useGetCalcSize(thisProps) > 72,
                        [`border-${thisProps.borderColor}`]: thisProps.borderColor && Helper.isEmpty(thisProps.imgSrc),
                    },
                    style: {
                        ...useSizeStyles(thisProps),
                        border: thisProps.border && Helper.isEmpty(thisProps.imgSrc)
                            ? (Helper.cssUnit(thisProps.border) + ' solid') : undefined
                    },
                }, useRenderSlot(
                    slots, 'default', {key: Helper.uuid()},
                    [
                        !Helper.isEmpty(thisProps.imgSrc)
                            ? useRenderAvatarImage(thisProps)
                            : (
                                !Helper.isEmpty(thisProps.icon)
                                    ? h<TBsIcon>(BsIcon, {
                                        size: <Prop<number>>useAvatarIconSize(thisProps),
                                        ...useCreateIconProps(thisProps),
                                    })
                                    : h('span',
                                        {class: [`${cssPrefix}avatar-text`]},
                                        thisProps.text || '?',
                                    )
                            )
                    ]
                )
            )
    }
});
