import BsButtonInner from '@/components/Button/BsButtonInner';
import {
  useCreateInputElement,
  useCreateInputItemClasses,
  useRenderToggleItemContent,
} from '@/components/Button/mixins/buttonApi';
import { toggleButtonProps } from '@/components/Button/mixins/buttonProps';
import type {
  TBsButtonInner,
  TBsToggleButton,
  TInputOptionItem,
  TToggleButtonOptionProps,
} from '@/components/Button/types';
import { cssPrefix, useGenerateId } from '@/mixins/CommonApi';
import type { Prop } from 'vue';
import { defineComponent, h, ref } from 'vue';

export default defineComponent<TBsToggleButton>({
  name: 'BsToggleButton',
  props: toggleButtonProps,
  emits: [
    /**
     * Callback fired when this component's value is updated.
     */
    'update:model-value',
  ],
  setup(props, { emit, slots }) {
    const thisProps = props as Readonly<TToggleButtonOptionProps>;
    const localValue = ref<string | number | boolean | unknown[] | undefined>(
      props.modelValue as string | number | boolean | unknown[] | undefined
    );

    const rippleOff = (item: TInputOptionItem) => {
      return props.disabled || props.readonly || item.disabled || item.readonly;
    };

    return () => {
      return h(
        'div',
        {
          class: [
            'btn-group',
            thisProps.disabled ? `${cssPrefix}disabled` : '',
            thisProps.readonly ? `${cssPrefix}readonly` : '',
            thisProps.required ? `${cssPrefix}required` : '',
          ],
          id: props.id,
          role: 'group',
        },
        thisProps.items?.map((item: TInputOptionItem, idx: number) => {
          item.id ??= useGenerateId();

          return h(
            'label',
            {
              key: `btn-${idx}`,
              tabIndex: 0,
              class: useCreateInputItemClasses(item, thisProps),
              // onClick: (e: Event) => (<HTMLElement>e.target).focus(),
              onKeydown: (e: KeyboardEvent) => {
                if (['Space', 'Enter'].includes(e.code)) {
                  (e.target as HTMLElement).focus();
                  if (
                    !thisProps.disabled &&
                    !thisProps.readonly &&
                    !item.disabled &&
                    !item.readonly
                  ) {
                    if (thisProps.multiple) {
                      if ((localValue.value as unknown[]).includes(item.value)) {
                        localValue.value = (localValue.value as unknown[]).filter(
                          (it) => it !== item.value
                        );
                      } else {
                        (localValue.value as unknown[]).push(item.value);
                      }
                    } else {
                      localValue.value = item.value;
                    }
                    emit('update:model-value', localValue.value);
                  }
                  e.preventDefault();
                }
              },
            },
            [
              useCreateInputElement(localValue, item, thisProps, emit),
              h<TBsButtonInner>(
                BsButtonInner,
                {
                  rippleOff: rippleOff(item) as Prop<boolean>,
                },
                {
                  default: () => useRenderToggleItemContent(slots, item, thisProps),
                }
              ),
            ]
          );
        })
      );
    };
  },
});
