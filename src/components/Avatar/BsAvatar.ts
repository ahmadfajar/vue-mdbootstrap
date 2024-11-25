import {
    useAvatarIconSize,
    useCreateIconProps,
    useRenderAvatarImage,
    useShapeClasses,
} from '@/components/Avatar/mixins/avatarApi';
import { avatarProps } from '@/components/Avatar/mixins/avatarProps';
import { BsIcon } from '@/components/Icon';
import { useGetCalcSize, useSizeStyles } from '@/components/Icon/mixins/iconApi';
import { cssPrefix, useRenderSlot } from '@/mixins/CommonApi';
import type { TAvatarOptionProps, TBsAvatar, TBsIcon } from '@/types';
import Helper from '@/utils/Helper';
import { defineComponent, h } from 'vue';

export default defineComponent<TBsAvatar>({
    name: 'BsAvatar',
    props: avatarProps,
    setup(props, { slots }) {
        const thisProps = props as Readonly<TAvatarOptionProps>;

        return () =>
            h(
                'div',
                {
                    class: {
                        [`${cssPrefix}avatar`]: true,
                        [`border-${thisProps.borderColor}`]: thisProps.borderColor,
                        'overflow-hidden': thisProps.circle || thisProps.rounded,
                        'p-2': useGetCalcSize(thisProps) > 72,
                        ...useShapeClasses(thisProps.circle, thisProps.rounded),
                    },
                    style: {
                        ...useSizeStyles(thisProps),
                        borderStyle: thisProps.border ? 'solid' : undefined,
                        borderWidth: thisProps.border
                            ? Helper.cssUnit(thisProps.border) + ' !important'
                            : undefined,
                    },
                },
                useRenderSlot(slots, 'default', { key: Helper.uuid() }, [
                    !Helper.isEmpty(thisProps.imgSrc)
                        ? useRenderAvatarImage(thisProps)
                        : !Helper.isEmpty(thisProps.icon)
                          ? h<TBsIcon>(BsIcon, {
                                // @ts-ignore
                                size: useAvatarIconSize(thisProps),
                                ...useCreateIconProps(thisProps),
                            })
                          : h(
                                'span',
                                { class: [`${cssPrefix}avatar-text`] },
                                thisProps.text || '?'
                            ),
                ])
            );
    },
});
