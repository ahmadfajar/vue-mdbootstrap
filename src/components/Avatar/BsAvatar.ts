import {
  useAvatarIconSize,
  useCreateIconProps,
  useRenderAvatarImage,
  useShapeClasses,
} from '@/components/Avatar/mixins/avatarApi.ts';
import { avatarProps } from '@/components/Avatar/mixins/avatarProps.ts';
import { BsIcon } from '@/components/Icon';
import { useGetCalcSize, useSizeStyles } from '@/components/Icon/mixins/iconApi.ts';
import { cssPrefix, useRenderSlot } from '@/mixins/CommonApi.ts';
import type { TAvatarOptionProps, TBsAvatar, TBsIcon } from '@/types';
import Helper from '@/utils/Helper.ts';
import { defineComponent, h, type Prop, toDisplayString } from 'vue';

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
            relative: true,
            'inline-flex': true,
            'items-center': true,
            'justify-center': true,
            'max-w-full': true,
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
                  size: useAvatarIconSize(thisProps) as Prop<number>,
                  ...useCreateIconProps(thisProps),
                })
              : h(
                  'span',
                  {
                    class: [
                      `${cssPrefix}avatar-text`,
                      'flex',
                      'items-center',
                      'justify-center',
                      'h-full',
                      'w-full',
                      'overflow-hidden',
                    ],
                  },
                  toDisplayString(thisProps.text) || '?'
                ),
        ])
      );
  },
});
