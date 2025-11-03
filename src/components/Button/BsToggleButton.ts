import { useRenderToggleButtonItem } from '@/components/Button/mixins/buttonApi.ts';
import { toggleButtonProps } from '@/components/Button/mixins/buttonProps.ts';
import type {
  TBsToggleButton,
  TInputOptionItem,
  TToggleButtonOptionProps,
} from '@/components/Button/types';
import { cssPrefix, useGenerateId } from '@/mixins/CommonApi.ts';
import type { MaybeNumberish } from '@/types';
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
});
