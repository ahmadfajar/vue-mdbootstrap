import {
  useCreateInputRadioOrCheckbox,
  useRadioClasses,
  useRenderRadioOrCheckbox,
} from '@/components/Radio/mixins/radioApi.ts';
import { radioProps } from '@/components/Radio/mixins/radioProps.ts';
import type { TBsRadio, TRadioOptionProps } from '@/components/Radio/types';
import { computed, defineComponent, nextTick, ref } from 'vue';

export default defineComponent<TBsRadio>({
  name: 'BsRadio',
  props: radioProps,
  emits: ['checked', 'update:model-value'],
  setup(props, { emit, slots }) {
    const thisProps = props as Readonly<TRadioOptionProps>;
    const rippleActive = ref<boolean>(false);
    const radioClasses = computed(() => useRadioClasses(thisProps));

    const toggleCheckHandler = (): void => {
      if (!thisProps.disabled && !thisProps.readonly) {
        const checked = thisProps.value === thisProps.modelValue;
        rippleActive.value = true;
        emit('update:model-value', checked ? null : thisProps.value);
        nextTick().then(() => {
          emit('checked', !checked);
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
});
