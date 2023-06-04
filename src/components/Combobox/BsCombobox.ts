import {ComponentOptionsMixin, computed, ComputedOptions, defineComponent, EmitsOptions, ref, shallowRef} from "vue";
import {cssPrefix} from "../../mixins/CommonApi";
import {IBsModel, TBsCombobox, TComboboxOptionProps, TRecord} from "../../types";
import {
    useGetErrorItems,
    useHasValidated,
    useHasValidationError,
    useShowHelpText,
    useShowValidationError
} from "../Field/mixins/validationApi";
import {useCreateTextFieldClasses, useFieldWrapperClasses, useShowClearButton} from "../Field/mixins/textFieldApi";
import {useRenderCombobox} from "./mixins/comboboxApi";
import {comboboxProps} from "./mixins/comboboxProps";
import Helper from "../../utils/Helper";

export default defineComponent<TBsCombobox, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsCombobox",
    props: comboboxProps,
    emits: [
        /**
         * Fired when this component lost focus.
         */
        "blur",
        /**
         * Fired when this component got focused.
         */
        "focus",
        /**
         * Fired when this component's value is being cleared.
         */
        "clear",
        /**
         * Fired when an item is selected.
         */
        "select",
        /**
         * Fired when an item is deselected.
         */
        "deselect",
        /**
         * Fired when the data has been fetched.
         */
        "data-bind",
        /**
         * Fired when error loading data items.
         */
        "data-error",
        /**
         * Fired when this component's data items is filtered.
         */
        "data-filter",
        /**
         * Fired when this component's value is updated.
         */
        "update:model-value",
        /**
         * Fired when this component's selected value is updated.
         */
        "update:selected-value",
    ],
    setup(props, {emit, slots}) {
        const thisProps = props as Readonly<TComboboxOptionProps>;
        const fieldValues = ref<string[] | number[]>(
            Array.isArray(thisProps.modelValue)
                ? thisProps.modelValue
                : (Helper.isEmpty(thisProps.modelValue) ? [] : [<string>thisProps.modelValue])
        );
        const selectedItems = shallowRef<IBsModel[]>([]);
        const isFocused = ref(false);
        const isPopoverOpen = ref(false);
        const activator = ref<HTMLElement | null>(null);
        const listboxMinWidth = computed(() => {
                const minWidth = thisProps.popoverMinWidth || thisProps.listboxMinWidth;
                return minWidth ? parseInt(<string>minWidth, 10) : undefined;
            }
        );
        const popoverMinWidth = computed(() => {
                if (activator.value && listboxMinWidth.value &&
                    (listboxMinWidth.value < activator.value.offsetWidth)) {
                    return activator.value.offsetWidth;
                }

                return listboxMinWidth.value;
            }
        );
        const hasError = computed<boolean>(() => useHasValidationError(thisProps));
        const hasValidated = computed<boolean>(() => useHasValidated(thisProps));
        const showValidationError = computed<boolean>(() => useShowValidationError(thisProps));
        const showHelpText = computed<boolean>(() => useShowHelpText(thisProps, isFocused.value));
        const errorItems = computed(() => useGetErrorItems(thisProps));
        const showClearButton = computed<boolean>(() => useShowClearButton(thisProps, fieldValues));
        const showAppendIcon = computed(() =>
            (slots.appendInner !== undefined) || !Helper.isEmpty(thisProps.appendIcon) || showClearButton.value
        );
        const wrapperClasses = computed<TRecord>(() =>
            useFieldWrapperClasses(thisProps, hasValidated.value, hasError.value)
        );
        const controlClasses = computed<TRecord>(() =>
            ({
                ...useCreateTextFieldClasses(slots, thisProps, fieldValues, isFocused, showAppendIcon.value),
                [`${cssPrefix}combobox-field`]: true,
            })
        );

        return () =>
            useRenderCombobox(
                slots, emit, props,
                wrapperClasses,
                controlClasses,
                popoverMinWidth,
                activator,
                fieldValues,
                selectedItems,
                isPopoverOpen,
                isFocused,
                showClearButton,
                showHelpText,
                showValidationError,
                hasValidated,
                hasError,
                errorItems,
            )
    }
});
