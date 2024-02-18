import type { ComponentOptionsMixin, ComputedOptions, EmitsOptions, MethodOptions } from 'vue';
import { computed, defineComponent, ref, shallowRef, watch } from 'vue';
import { cssPrefix } from '../../mixins/CommonApi';
import type { IBsModel, TBsCombobox, TComboboxOptionProps, TDataListSchemaProps, TRecord } from '../../types';
import Helper from '../../utils/Helper';
import { useCreateTextFieldClasses, useFieldWrapperClasses, useShowClearButton } from '../Field/mixins/textFieldApi';
import { useGetValidationResult } from '../Field/mixins/validationApi';
import { useRenderCombobox } from './mixins/comboboxApi';
import { comboboxProps } from './mixins/comboboxProps';

export default defineComponent<TBsCombobox, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>({
    name: 'BsCombobox',
    props: comboboxProps,
    emits: [
        /**
         * Fired when this component's value is being cleared.
         */
        'clear',
        /**
         * Fired when the Popover is hiding.
         */
        'close',
        /**
         * Fired when the Popover is show.
         */
        'open',
        /**
         * Fired when an item is selected.
         */
        'select',
        /**
         * Fired when an item is deselected.
         */
        'deselect',
        /**
         * Fired when the data has been fetched.
         */
        'data-bind',
        /**
         * Fired when error loading data items.
         */
        'data-error',
        /**
         * Fired when this component's data items is filtered.
         */
        'data-filter',
        /**
         * Fired when this component's value is updated.
         */
        'update:model-value',
        /**
         * Fired when this component's selected value is updated.
         */
        'update:selected-value',
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
        const parentValue = ref(thisProps.parentValue);
        const isFocused = ref(false);
        const isPopoverOpen = ref(false);
        const activator = ref<HTMLElement | null>(null);
        const validator = useGetValidationResult(thisProps, isFocused);
        const showClearButton = computed<boolean>(() => useShowClearButton(thisProps, fieldValues));
        const showAppendIcon = computed(() =>
            (slots.appendInner != undefined) || !Helper.isEmpty(thisProps.appendIcon) || showClearButton.value
        );
        const wrapperClasses = computed<TRecord>(() =>
            useFieldWrapperClasses(thisProps, validator.hasValidated.value, validator.hasError.value)
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
            () => thisProps.parentValue,
            (value) => {
                const ds = thisProps.dataSource?.proxy;
                parentValue.value = value;

                if (ds) {
                    if (Helper.isEmpty(value)) {
                        ds.defaultFilters = [];
                    } else {
                        let oldFilters = ds.defaultFilters;
                        const newFilters = ds.createFilters({
                            property: <string>dataSchema.cascadeField,
                            value: <string | number>value,
                            operator: 'eq'
                        });
                        if (oldFilters.length === 0) {
                            ds.defaultFilters = newFilters;
                        } else {
                            oldFilters = oldFilters.filter(it => it.property !== dataSchema.cascadeField);
                            ds.defaultFilters = newFilters.concat(oldFilters);
                        }
                    }

                    ds.setFilters([], true);
                    ds.load().then(() => {
                        emit('data-bind', ds.dataItems);
                    }).catch((error) => {
                        emit('data-error', error);
                        console.warn(error);
                    });
                }
            }
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
                validator.showHelpText,
                validator.showValidationError,
                validator.hasValidated,
                validator.hasError,
                validator.errorItems,
            )
    }
});
