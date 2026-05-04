/* eslint-disable @typescript-eslint/no-empty-object-type */
import {
  useAvatarIconSize,
  useCreateIconProps,
  useRenderAvatarImage,
  useShapeClasses,
} from '@/components/Avatar/mixins/avatarApi.ts';
import { avatarProps } from '@/components/Avatar/mixins/avatarProps.ts';
import type { TAvatarOptionProps, TBsAvatar } from '@/components/Avatar/types';
import { BsIcon } from '@/components/Icon';
import { useGetCalcSize, useSizeStyles } from '@/components/Icon/mixins/iconApi.ts';
import { cssPrefix, useRenderSlot } from '@/mixins/CommonApi.ts';
import type { TRecord } from '@/types';
import type { VoidDefaultSlots } from '@/types/internals.ts';
import Helper from '@/utils/Helper.ts';
import type {
  ComponentOptionsMixin,
  ComponentProvideOptions,
  ComputedOptions,
  DefineComponent,
  ExtractDefaultPropTypes,
  MethodOptions,
  PublicProps,
  SlotsType,
} from 'vue';
import { defineComponent, h, toDisplayString } from 'vue';

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
            border: thisProps.border,
            [`border-${thisProps.borderColor}`]: thisProps.borderColor,
            'overflow-hidden': thisProps.circle || thisProps.rounded,
            'p-2': useGetCalcSize(thisProps) > 72 && Helper.isEmpty(props.imgSrc),
            ...useShapeClasses(thisProps.circle, thisProps.rounded),
          },
          style: {
            ...useSizeStyles(thisProps),
            borderWidth: thisProps.border
              ? Helper.cssUnit(thisProps.border) + ' !important'
              : undefined,
          },
        },
        useRenderSlot(slots, 'default', { key: Helper.uuid() }, [
          !Helper.isEmpty(thisProps.imgSrc)
            ? useRenderAvatarImage(thisProps)
            : !Helper.isEmpty(thisProps.icon)
              ? h(BsIcon, {
                  size: useAvatarIconSize(thisProps),
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
}) as DefineComponent<
  TBsAvatar,
  {},
  {},
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  {},
  string,
  PublicProps,
  Readonly<TAvatarOptionProps> & Readonly<{}>,
  ExtractDefaultPropTypes<TBsAvatar>,
  SlotsType<VoidDefaultSlots>,
  {},
  {},
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;
