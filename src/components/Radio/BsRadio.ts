/* eslint-disable @typescript-eslint/no-empty-object-type */
import {
  useCreateInputRadioOrCheckbox,
  useRadioClasses,
  useRenderRadioOrCheckbox,
} from '@/components/Radio/mixins/radioApi.ts';
import { radioProps } from '@/components/Radio/mixins/radioProps.ts';
import type { TBsRadio, TRadioOptionProps } from '@/components/Radio/types';
import type { Numberish } from '@/types';
import type {
  UpdateModelValueEventProps,
  UpdateModelValueEventPublic,
  VoidDefaultSlots,
} from '@/types/internals.ts';
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
import { computed, defineComponent, nextTick, ref } from 'vue';

export default defineComponent<TBsRadio>({
  name: 'BsRadio',
  props: radioProps,
  emits: ['checked', 'update:model-value'],
  setup(props, { emit, slots }) {
    const thisProps = props as Readonly<TRadioOptionProps>;
    const rippleActive = ref<boolean>(false);
    const radioClasses = computed(() => useRadioClasses(thisProps));

    const toggleCheckHandler = async (): Promise<void> => {
      if (!thisProps.disabled && !thisProps.readonly) {
        const isEqual = thisProps.value === thisProps.modelValue;
        rippleActive.value = true;
        emit('update:model-value', isEqual ? null : thisProps.value);

        await nextTick().then(() => {
          emit('checked', !isEqual);
        });
      }
    };

    return () =>
      useRenderRadioOrCheckbox(
        slots,
        thisProps,
        radioClasses,
        rippleActive,
        'radio',
        useCreateInputRadioOrCheckbox(thisProps, 'radio'),
        toggleCheckHandler
      );
  },
}) as DefineComponent<
  TBsRadio,
  {},
  {},
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  RadioEventProps,
  string,
  PublicProps,
  Readonly<TRadioOptionProps> & Readonly<RadioEventPublic>,
  ExtractDefaultPropTypes<TBsRadio>,
  SlotsType<VoidDefaultSlots>,
  {},
  {},
  string,
  ComponentProvideOptions,
  false,
  never
>;

declare type RadioEventProps = UpdateModelValueEventProps<Numberish | boolean | null> & {
  /**
   * Fired when this Radio component's "checked" state is updated.
   */
  checked?: (checked: boolean) => void;
};

declare interface RadioEventPublic extends UpdateModelValueEventPublic<Numberish | boolean | null> {
  /**
   * Fired when this Radio component's "checked" state is updated.
   */
  onChecked?: (checked: boolean) => void;

  /**
   * Fired when this Radio component's "checked" state is updated.
   */
  '@checked'?: (checked: boolean) => void;
}
