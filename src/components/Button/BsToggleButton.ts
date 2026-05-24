/* eslint-disable @typescript-eslint/no-empty-object-type */
import { useRenderToggleButtonItem } from '@/components/Button/mixins/buttonApi.ts';
import { toggleButtonProps } from '@/components/Button/mixins/buttonProps.ts';
import type {
  TBsToggleButton,
  TInputOptionItem,
  TToggleButtonOptionProps,
} from '@/components/Button/types';
import { cssPrefix, useGenerateId } from '@/mixins/CommonApi.ts';
import type { MaybeNumberish, TRecord } from '@/types';
import type { UpdateModelValueEventProps, UpdateModelValueEventPublic } from '@/types/internals.ts';
import type {
  ComponentOptionsMixin,
  ComponentProvideOptions,
  ComputedOptions,
  DefineComponent,
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
    const localValue = ref<MaybeNumberish | boolean | unknown[]>(
      props.modelValue as MaybeNumberish | boolean | unknown[]
    );

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
  {},
  {},
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  ToggleButtonEventProps,
  string,
  PublicProps,
  Readonly<TToggleButtonOptionProps> &
    Readonly<UpdateModelValueEventPublic<MaybeNumberish | unknown[]>>,
  ExtractDefaultPropTypes<TBsToggleButton>,
  SlotsType<ToggleButtonSlots>,
  {},
  {},
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;

declare type ToggleButtonEventProps = UpdateModelValueEventProps<MaybeNumberish | unknown[]>;

declare interface ToggleButtonSlots {
  /**
   * The default slot used to place the ToggleButton's label.
   */
  label?: (item: TInputOptionItem) => VNode[] | VNode;

  /**
   * Additional slot used to place the ToggleButton's icon.
   */
  icon?: (item: TInputOptionItem) => VNode[] | VNode;
}
