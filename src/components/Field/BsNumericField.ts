import type { ComponentOptionsMixin, ComputedOptions, EmitsOptions, MethodOptions } from 'vue';
import { computed, defineComponent, ref, watch } from 'vue';
import { cssPrefix, isServer } from '../../mixins/CommonApi';
import type { TBsNumericField, TNumericFieldOptionProps, TNumericOpsOptions, TRecord } from '../../types';
import Helper from '../../utils/Helper';
import { numericFieldProps } from './mixins/fieldProps';
import { useRenderNumericField } from './mixins/numericFieldApi';
import { useCreateTextFieldClasses, useFieldWrapperClasses, useShowClearButton } from './mixins/textFieldApi';
import { useGetValidationResult } from './mixins/validationApi';


export default defineComponent<TBsNumericField, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>({
    name: 'BsNumericField',
    props: numericFieldProps,
    emits: [
        /**
         * Fired when this component lost focus.
         */
        'blur',
        /**
         * Fired when this component got focused.
         */
        'focus',
        /**
         * Fired when this component's value is being cleared.
         */
        'clear',
        /**
         * Triggers when cursor is still in the `<input>` element and keyboard key is pressed.
         */
        'keydown',
        /**
         * Fired when this component's value is updated.
         */
        'update:model-value',
    ],
    setup(props, {emit, slots}) {
        const thisProps = props as Readonly<TNumericFieldOptionProps>;
        const autocomplete = thisProps.autocomplete && Helper.isString(thisProps.autocomplete)
            ? thisProps.autocomplete
            : (thisProps.autocomplete ? 'on' : Helper.uuid());
        const localValue = ref<number | null>(thisProps.modelValue === undefined ? null : thisProps.modelValue);
        const inputRef = ref<HTMLElement | null>(null);
        const hasFocus = ref(false);
        const validator = useGetValidationResult(thisProps, hasFocus);
        const showClearButton = computed<boolean>(() => useShowClearButton(thisProps, localValue));
        const showAppendIcon = computed(
            () =>
                (slots['append-inner'] != undefined) || 
                !Helper.isEmpty(thisProps.appendIcon) || 
                showClearButton.value || 
                (thisProps.actionButton === true && thisProps.actionButtonPlacement === 'right' 
                && !thisProps.disabled && !thisProps.readonly) || 
                (thisProps.spinButton === true && thisProps.spinButtonPlacement === 'right'
                && !thisProps.disabled && !thisProps.readonly)
        );
        const showPrependIcon = computed(
            () =>
                (slots['prepend-inner'] != undefined) || 
                !Helper.isEmpty(thisProps.prependIcon) || 
                (!thisProps.disabled && !thisProps.readonly &&
                    thisProps.actionButton === true && thisProps.actionButtonPlacement === 'left') || 
                (!thisProps.disabled && !thisProps.readonly && 
                    thisProps.actionButton === true && thisProps.actionButtonPlacement === 'both') || 
                (thisProps.spinButton === true && thisProps.spinButtonPlacement === 'left'
                && !thisProps.disabled && !thisProps.readonly)
        );
        const fieldWrapperClasses = computed<TRecord>(() =>
            useFieldWrapperClasses(thisProps, validator.hasValidated.value, validator.hasError.value)
        );
        const fieldControlClasses = computed<TRecord>(() =>
            ({
                ...useCreateTextFieldClasses(
                    slots, thisProps, localValue, hasFocus, 
                    showAppendIcon.value, showPrependIcon.value
                ),
                [`${cssPrefix}field-rounded`]: (thisProps.outlined || thisProps.filled) && thisProps.rounded,
                [`${cssPrefix}numeric-field`]: true,
            })
        );
        const operationOptions: TNumericOpsOptions = {
            locale: thisProps.locale || (isServer ? 'en-US' : window.navigator.language),
            maxValue: Helper.parseFloatLoose(<string>thisProps.maxValue),
            minValue: Helper.parseFloatLoose(<string>thisProps.minValue),
            step: Helper.parseFloatLoose(<string>thisProps.step) || 1.0,
        };
        const formatOptions: Intl.NumberFormatOptions = {
            maximumFractionDigits: Helper.parseIntLoose(<string>thisProps.maxFraction) || 3,
            useGrouping: thisProps.useGrouping
        };

        watch(
            () => thisProps.modelValue,
            (value) => {
                localValue.value = value === undefined ? null : value;
            }
        );

        return () =>
            useRenderNumericField(
                slots, emit, thisProps,
                operationOptions,
                formatOptions,
                fieldWrapperClasses,
                fieldControlClasses,
                localValue,
                inputRef,
                hasFocus,
                autocomplete,
                showClearButton,
                validator.showHelpText,
                validator.showValidationError,
                validator.hasValidated,
                validator.hasError,
                validator.errorItems,
            );
    }
});
