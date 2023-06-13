import type {ComponentOptionsMixin, ComputedOptions, EmitsOptions} from "vue";
import {computed, defineComponent, ref, shallowRef, watch} from "vue";
import {cssPrefix} from "../../mixins/CommonApi";
import type {IBsModel, TBsCombobox, TComboboxOptionProps, TDataListSchemaProps, TRecord} from "../../types";
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
         * Fired when this component's value is being cleared.
         */
        "clear",
        /**
         * Fired when the Popover is hiding.
         */
        "close",
        /**
         * Fired when the Popover is show.
         */
        "open",
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
        const dataSchema = <TDataListSchemaProps>{
            displayField: 'text',
            valueField: 'value',
            imageField: 'image',
            cascadeField: 'parent',
            disableField: 'disabled',
            ...thisProps.dataSource?.schema,
        };
        const fieldValues = ref<string[] | number[]>(
            Array.isArray(thisProps.modelValue)
                ? thisProps.modelValue
                : (Helper.isEmpty(thisProps.modelValue) ? [] : [<string>thisProps.modelValue])
        );
        const selectedItems = shallowRef<IBsModel[]>([]);
        const isFocused = ref(false);
        const isPopoverOpen = ref(false);
        const activator = ref<HTMLElement | null>(null);
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
                [`${cssPrefix}open`]: isPopoverOpen.value,
                [`${cssPrefix}chip-enabled`]: thisProps.multiple && thisProps.chipEnabled, // && fieldValues.value.length > 0,
            })
        );

        watch(
            () => thisProps.modelValue,
            (value) => {
                if (Helper.isEmpty(value)) {
                    fieldValues.value = [];
                    selectedItems.value = [];
                } else {
                    const ds = thisProps.dataSource?.proxy;
                    fieldValues.value = thisProps.multiple && Array.isArray(value) ? value : [<string>value];

                    if (!thisProps.multiple && (ds?.filters.length === 0 ||
                        ds?.defaultFilters.length === ds?.filters.length)
                    ) {
                        selectedItems.value = ds?.dataItems.filter(
                            it => fieldValues.value.some(v => v === it.get(dataSchema.valueField))
                        ) || [];
                    }
                }
            }
        );

        return () =>
            useRenderCombobox(
                slots, emit, props,
                wrapperClasses,
                controlClasses,
                dataSchema,
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
