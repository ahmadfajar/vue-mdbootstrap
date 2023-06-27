import type { ComponentOptionsMixin, ComputedOptions, EmitsOptions, MethodOptions } from 'vue';
import { computed, defineComponent } from 'vue';
import type { TBsRadioGroup, TRadioGroupOptionProps, TRadioProps, TRecord } from '../../types';
import Helper from '../../utils/Helper';
import { baseInputProps } from '../Field/mixins/fieldProps';
import {
    useGetErrorItems,
    useHasValidated,
    useHasValidationError,
    useShowValidationError
} from '../Field/mixins/validationApi';
import { validationProps } from '../Field/mixins/validationProps';
import { useCreateRadioItems, useInputGroupClasses, useRenderRadioOrCheckboxGroup } from './mixins/radioApi';
import { radioGroupProps } from './mixins/radioProps';

export default defineComponent<TBsRadioGroup, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>({
    name: 'BsRadioGroup',
    props: {
        ...baseInputProps,
        ...radioGroupProps,
        ...validationProps,
    },
    emits: [
        /**
         * Fired when this component's checked value is updated.
         */
        'update:model-value',
    ],
    setup(props, {emit, slots}) {
        const cmpProps = props as Readonly<TRadioGroupOptionProps>;
        const hasError = computed<boolean>(() => useHasValidationError(cmpProps));
        const hasValidated = computed<boolean>(() => useHasValidated(cmpProps));
        const showValidationError = computed<boolean>(() => useShowValidationError(cmpProps));
        const errorItems = computed(() => useGetErrorItems(cmpProps));
        const checkboxClasses = computed(
            () => useInputGroupClasses(cmpProps, hasValidated.value, hasError.value)
        );

        const toggleCheckHandler = (item: TRadioProps): void => {
            if (!cmpProps.disabled && !cmpProps.readonly && !item.disabled && !item.readonly) {
                emit('update:model-value', item.value)
            }
        };

        return () =>
            useRenderRadioOrCheckboxGroup(
                slots, cmpProps, checkboxClasses,
                useCreateRadioItems(cmpProps, toggleCheckHandler),
                showValidationError.value,
                (!Helper.isEmpty(cmpProps.helpText) && cmpProps.persistentHelpText === true),
                hasError.value, errorItems.value,
            );
    }
});
