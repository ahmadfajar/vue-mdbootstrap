import {
    ComponentOptionsMixin,
    computed,
    ComputedOptions,
    defineComponent,
    EmitsOptions,
    nextTick,
    onMounted,
    reactive,
    ref,
    watch
} from "vue";
import {useGenerateId} from "../../mixins/CommonApi";
import {chipGroupProps} from "./mixins/chipGroupProps";
import {useChipIsSelected, useRenderChipGroup, useSetSliderSize} from "./mixins/chipGroupApi";
import {TBsChipGroup, TChipContainer, TChipGroupOptionProps, TChipOptionItem, TChipValue} from "./types";
import {TRecord} from "../../types";

export default defineComponent<TBsChipGroup, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsChipGroup",
    props: chipGroupProps,
    emits: [
        /**
         * Fired immediately when this component's value is changed.
         */
        "change",
        /**
         * Fired when this component's value is updated.
         */
        "update:modelValue",
        /**
         * Fired when this component's item is dismissed (hide).
         */
        "item:close",
    ],
    setup(props, {emit, slots}) {
        const cmpProps = props as Readonly<TChipGroupOptionProps>;
        const scrollOffset = ref<number>(0);
        const slider = reactive<TChipContainer>({
            contentId: useGenerateId(),
            contentWidth: 0,
            wrapperId: useGenerateId(),
            wrapperWidth: 0,
        });
        const showSliderButton = computed(
            () => cmpProps.sliderButton && !cmpProps.column
        );
        const hasNext = computed(
            () => {
                // Check one scroll ahead to know the width of right-most item
                return slider.contentWidth > Math.abs(scrollOffset.value) + slider.wrapperWidth;
            }
        );
        const hasPrev = computed(
            () => scrollOffset.value !== 0
        );
        const chipCloseHandler = (item: TChipOptionItem): void => {
            // const newItems = cmpProps.items.filter(it => it.id !== item.id);
            emit('item:close', item);
        }
        const chipClickHandler = (item: TChipOptionItem): void => {
            if (item.disabled) {
                return;
            }

            const value = <TChipValue>{id: item.id, value: item.value, text: item.text};

            if (cmpProps.multiple) {
                let selectedValues = cmpProps.modelValue
                    ? !Array.isArray(cmpProps.modelValue) ? [cmpProps.modelValue] : cmpProps.modelValue
                    : [];

                if (selectedValues.length > 0 && useChipIsSelected(item, selectedValues)) {
                    selectedValues = selectedValues.filter(it => item.text !== it.text);
                } else {
                    selectedValues.push(value);
                }

                emit('change', selectedValues);
                nextTick().then(() => emit('update:modelValue', selectedValues));
            } else {
                const isSelected = useChipIsSelected(item, cmpProps.modelValue);
                emit('change', (isSelected ? value : null));
                nextTick().then(() => emit('update:modelValue', (!isSelected ? value : null)));
            }
        }

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

        return () => useRenderChipGroup(
            slots, cmpProps, scrollOffset, slider, showSliderButton.value,
            hasPrev.value, hasNext.value, chipClickHandler, chipCloseHandler
        )
    }
});
