/* eslint-disable @typescript-eslint/no-empty-object-type */
import { toggleIconProps } from '@/components/Icon/mixins/iconProps.ts';
import type { TBsToggleIcon, TToggleIconOptionProps } from '@/components/Icon/types';
import { cssPrefix } from '@/mixins/CommonApi.ts';
import type { UpdateModelValueEventProps, UpdateModelValueEventPublic } from '@/types/internals.ts';
import type {
  ComponentOptionsMixin,
  ComponentProvideOptions,
  ComputedOptions,
  DefineComponent,
  ExtractDefaultPropTypes,
  MethodOptions,
  PublicProps,
} from 'vue';
import { defineComponent, h } from 'vue';
import BsIconSvg from './BsSvgIcon.ts';

export default defineComponent<TBsToggleIcon>({
  name: 'BsToggleIcon',
  props: toggleIconProps,
  emits: ['update:model-value'],
  setup(props, { emit }) {
    const thisProps = props as Readonly<TToggleIconOptionProps>;

    return () =>
      h(
        'span',
        {
          class: [`${cssPrefix}toggle-icon`, 'items-center', 'justify-center'],
          onClick: () => emit('update:model-value', !thisProps.modelValue),
        },
        h(BsIconSvg, {
          icon: thisProps.modelValue ? thisProps.toggleIcon : thisProps.icon,
          filled: thisProps.filled,
          height: thisProps.size,
          width: thisProps.size,
        })
      );
  },
}) as DefineComponent<
  TBsToggleIcon,
  {},
  {},
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  UpdateModelValueEventProps<boolean>,
  string,
  PublicProps,
  Readonly<TToggleIconOptionProps> & Readonly<UpdateModelValueEventPublic<boolean>>,
  ExtractDefaultPropTypes<TBsToggleIcon>,
  {},
  {},
  {},
  string,
  ComponentProvideOptions,
  false,
  never
>;
