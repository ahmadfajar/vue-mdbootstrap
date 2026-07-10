import { toggleIconProps } from '@/components/Icon/mixins/iconProps.ts';
import type { TBsToggleIcon, TToggleIconOptionProps } from '@/components/Icon/types';
import { cssPrefix } from '@/mixins/CommonApi.ts';
import type { TRecord } from '@/types';
import type { UpdateModelValueEventProps, UpdateModelValueEventPublic } from '@/types/internals.ts';
import type {
  Component,
  ComponentOptionsMixin,
  ComponentProvideOptions,
  ComputedOptions,
  DefineComponent,
  Directive,
  ExtractDefaultPropTypes,
  MethodOptions,
  PublicProps,
  SlotsType,
  VNode,
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
  () => VNode,
  TRecord,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  UpdateModelValueEventProps<boolean>,
  string,
  PublicProps,
  Readonly<TToggleIconOptionProps> & Readonly<UpdateModelValueEventPublic<boolean>>,
  ExtractDefaultPropTypes<TBsToggleIcon>,
  SlotsType,
  Record<string, Component>,
  Record<string, Directive>,
  string,
  ComponentProvideOptions,
  true,
  TRecord,
  never
>;
