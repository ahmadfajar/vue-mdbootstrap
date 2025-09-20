import { useCheckboxClasses, useToggleChecked } from '@/components/Checkbox/mixins/checkboxApi.ts';
import { checkboxProps } from '@/components/Checkbox/mixins/checkboxProps.ts';
import type { TBsCheckbox, TCheckboxOptionProps } from '@/components/Checkbox/types';
import {
  useCreateInputRadioOrCheckbox,
  useRenderRadioOrCheckbox,
} from '@/components/Radio/mixins/radioApi.ts';
import { computed, defineComponent, ref } from 'vue';

export default defineComponent<TBsCheckbox>({
  name: 'BsCheckbox',
  props: checkboxProps,
  emits: ['checked', 'update:model-value'],
  setup(props, { emit, slots }) {
    const thisProps = props as Readonly<TCheckboxOptionProps>;
    const rippleActive = ref<boolean>(false);
    const checkboxClasses = computed(() => useCheckboxClasses(thisProps));

    const toggleCheckHandler = () => useToggleChecked(emit, thisProps, rippleActive);

    return () =>
      useRenderRadioOrCheckbox(
        slots,
        thisProps,
        checkboxClasses,
        rippleActive,
        'checkbox',
        useCreateInputRadioOrCheckbox(thisProps, 'checkbox', {
          indeterminate: props.indeterminate,
          'true-value': true,
          'false-value': false,
        }),
        toggleCheckHandler
      );
  },
});
