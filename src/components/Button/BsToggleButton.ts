import { useRenderToggleButtonItem } from '@/components/Button/mixins/buttonApi.ts';
import { toggleButtonProps } from '@/components/Button/mixins/buttonProps.ts';
import type {
  TBsToggleButton,
  TInputOptionItem,
  ToggleButtonEventProps,
  ToggleButtonSlots,
  TToggleButtonOptionProps,
} from '@/components/Button/types';
import { cssPrefix, useGenerateId } from '@/mixins/CommonApi.ts';
import type { MaybeNumberish, TRecord } from '@/types';
import type { UpdateModelValueEventPublic } from '@/types/internals.ts';
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
import { defineComponent, h, ref } from 'vue';

export default defineComponent<TBsToggleButton>({
  name: 'BsToggleButton',
  props: toggleButtonProps,
  emits: ['update:model-value'],
  setup(props, { emit, slots }) {
    const thisProps = props as Readonly<TToggleButtonOptionProps>;
    const localValue = ref<MaybeNumberish | boolean | unknown[]>(thisProps.modelValue);

    return () => {
      return h(
        'div',
        {
          class: [
            `${cssPrefix}segmented-button`,
            thisProps.disabled ? 'disabled' : '',
            thisProps.readonly ? 'readonly' : '',
            thisProps.required ? 'required' : '',
          ],
          id: props.id,
          role: 'group',
          'data-multiple': thisProps.multiple ? 'true' : undefined,
          'data-segmented-button': thisProps.disabled
            ? 'disabled'
            : thisProps.readonly
              ? 'readonly'
              : undefined,
        },
        thisProps.items?.map((item: TInputOptionItem, idx: number) => {
          item.id ??= useGenerateId();

          return useRenderToggleButtonItem(slots, emit, thisProps, localValue, item, idx);
        })
      );
    };
  },
}) as DefineComponent<
  TBsToggleButton,
  () => VNode,
  TRecord,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  ToggleButtonEventProps,
  string,
  PublicProps,
  Readonly<TToggleButtonOptionProps> &
    Readonly<UpdateModelValueEventPublic<MaybeNumberish | boolean | unknown[]>>,
  ExtractDefaultPropTypes<TBsToggleButton>,
  SlotsType<ToggleButtonSlots>,
  Record<string, Component>,
  Record<string, Directive>,
  string,
  ComponentProvideOptions,
  true,
  TRecord,
  never
>;
