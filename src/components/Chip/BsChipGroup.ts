import {
  useChipIsSelected,
  useRenderChipGroup,
  useSetSliderSize,
} from '@/components/Chip/mixins/chipGroupApi.ts';
import { chipGroupProps } from '@/components/Chip/mixins/chipProps.ts';
import type {
  TBsChipGroup,
  TChipContainer,
  TChipGroupOptionProps,
  TChipOptionItem,
  TChipValue,
} from '@/components/Chip/types';
import { useGenerateId } from '@/mixins/CommonApi.ts';
import { computed, defineComponent, nextTick, onMounted, reactive, ref, watch } from 'vue';

export default defineComponent<TBsChipGroup>({
  name: 'BsChipGroup',
  props: chipGroupProps,
  emits: ['change', 'update:model-value', 'item:close'],
  setup(props, { emit, slots }) {
    const thisProps = props as Readonly<TChipGroupOptionProps>;
    const scrollOffset = ref<number>(0);
    const slider = reactive<TChipContainer>({
      contentId: useGenerateId(),
      contentWidth: 0,
      wrapperId: useGenerateId(),
      wrapperWidth: 0,
    });
    const showSliderButton = computed(() => thisProps.sliderButton && !thisProps.column);
    const hasNext = computed(() => {
      // Check one scroll ahead to know the width of right-most item
      return slider.contentWidth > Math.abs(scrollOffset.value) + slider.wrapperWidth;
    });
    const hasPrev = computed(() => scrollOffset.value !== 0);

    const chipCloseHandler = (item: TChipOptionItem): void => {
      emit('item:close', item);
    };

    const chipClickHandler = (item: TChipOptionItem): void => {
      if (item.disabled) {
        return;
      }

      const value = <TChipValue>{ id: item.id, value: item.value, text: item.text };

      if (thisProps.multiple) {
        let selectedValues = thisProps.modelValue
          ? !Array.isArray(thisProps.modelValue)
            ? [thisProps.modelValue]
            : thisProps.modelValue
          : [];

        if (selectedValues.length > 0 && useChipIsSelected(item, selectedValues)) {
          selectedValues = selectedValues.filter((it) => item.text !== it.text);
        } else {
          selectedValues.push(value);
        }

        emit('change', selectedValues);
        nextTick().then(() => emit('update:model-value', selectedValues));
      } else {
        const isSelected = useChipIsSelected(item, thisProps.modelValue);
        emit('change', !isSelected ? value : null);
        nextTick().then(() => emit('update:model-value', !isSelected ? value : null));
      }
    };

    watch(
      () => scrollOffset.value,
      (value) => {
        const contentEl = document.getElementById(slider.contentId);
        if (contentEl) {
          contentEl.style.transform = `translateX(${-value}px)`;
        }
      }
    );
    onMounted(() => useSetSliderSize(slider));

    return () =>
      useRenderChipGroup(
        slots,
        thisProps,
        scrollOffset,
        slider,
        showSliderButton.value,
        hasPrev.value,
        hasNext.value,
        chipClickHandler,
        chipCloseHandler
      );
  },
});
