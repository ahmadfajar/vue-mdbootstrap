import { computed, defineComponent } from 'vue';
import { cssPrefix } from '../../mixins/CommonApi';
import type {
    TBsCheckboxGroup,
    TCheckboxGroupOptionProps,
    TCheckboxProps,
    TRecord,
} from '../../types';
import Helper from '../../utils/Helper';
import { baseInputProps } from '../Field/mixins/fieldProps';
import {
    useGetErrorItems,
    useHasValidated,
    useHasValidationError,
    useShowValidationError,
} from '../Field/mixins/validationApi';
import { validationProps } from '../Field/mixins/validationProps';
import { useInputGroupClasses, useRenderRadioOrCheckboxGroup } from '../Radio/mixins/radioApi';
import { useCreateCheckboxItems } from './mixins/checkboxApi';
import { checkboxGroupProps } from './mixins/checkboxProps';

export default defineComponent<TBsCheckboxGroup>({
    name: 'BsCheckboxGroup',
    props: {
        ...baseInputProps,
        ...checkboxGroupProps,
        ...validationProps,
    },
    emits: [
        /**
         * Fired when this component's checked value is updated.
         */
        'update:model-value',
    ],
    setup(props, { emit, slots }) {
        const thisProps = props as Readonly<TCheckboxGroupOptionProps>;
        const hasError = computed<boolean>(() => useHasValidationError(thisProps));
        const hasValidated = computed<boolean>(() => useHasValidated(thisProps));
        const showValidationError = computed<boolean>(() => useShowValidationError(thisProps));
        const errorItems = computed(() => useGetErrorItems(thisProps));
        const checkboxClasses = computed(() => ({
            ...useInputGroupClasses(thisProps, hasValidated.value, hasError.value),
            [`${cssPrefix}checkbox-group`]: true,
        }));

        const toggleCheckHandler = (
            values: string | number | TRecord | Array<string | number | TRecord>,
            item: TCheckboxProps
        ): void => {
            if (!thisProps.disabled && !thisProps.readonly && !item.disabled && !item.readonly) {
                emit('update:model-value', Array.isArray(values) ? values : [values]);
            }
        };

        return () =>
            useRenderRadioOrCheckboxGroup(
                slots,
                thisProps,
                checkboxClasses,
                useCreateCheckboxItems(thisProps, toggleCheckHandler),
                showValidationError.value,
                !Helper.isEmpty(thisProps.helpText) && thisProps.persistentHelpText === true,
                hasError.value,
                errorItems.value
            );
    },
});
