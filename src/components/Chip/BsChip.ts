import { useChipClassNames, useRenderChip } from '@/components/Chip/mixins/chipApi.ts';
import { chipProps } from '@/components/Chip/mixins/chipProps.ts';
import { useRenderTransition } from '@/mixins/CommonApi.ts';
import type { TBsChip, TChipOptionProps, TRecord } from '@/types';
import Helper from '@/utils/Helper.ts';
import { computed, createCommentVNode, defineComponent, nextTick, ref, watch } from 'vue';

export default defineComponent<TBsChip>({
  name: 'BsChip',
  props: chipProps,
  emits: ['close', 'update:active', 'update:model-value'],
  setup(props, { emit, attrs, slots }) {
    const thisProps = props as Readonly<TChipOptionProps>;
    const dismissed = ref<boolean>(false);
    const show = computed(() => !dismissed.value && props.modelValue);
    const classNames = computed<TRecord>(() => useChipClassNames(thisProps, attrs));
    const tagName = computed<string>(() =>
      !Helper.isEmpty(thisProps.href) && !thisProps.disabled && !thisProps.readonly ? 'a' : 'div'
    );

    const rippleDisabled = computed<boolean>(() => {
      return (
        thisProps.rippleOff ||
        thisProps.disabled ||
        thisProps.readonly ||
        (!attrs.click && !attrs.onclick && !attrs.onClick && !props.href)
      );
    });

    const dismissHandler = () => {
      dismissed.value = true;
      emit('update:active', false);
      emit('update:model-value', false);
      nextTick().then(() => emit('close'));
    };

    watch(
      () => thisProps.modelValue,
      (value) => {
        if (props.dismissible) {
          dismissed.value = !(value === true);
        }
      }
    );

    return () =>
      useRenderTransition(
        { name: 'fade' },
        show.value
          ? useRenderChip(
              slots,
              thisProps,
              classNames,
              tagName.value,
              rippleDisabled.value,
              dismissHandler
            )
          : createCommentVNode(' BsChip ')
      );
  },
});
