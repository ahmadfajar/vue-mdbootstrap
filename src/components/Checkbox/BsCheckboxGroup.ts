import { useCreateCheckboxItems } from '@/components/Checkbox/mixins/checkboxApi.ts';
import { checkboxGroupProps } from '@/components/Checkbox/mixins/checkboxProps.ts';
import { baseInputProps } from '@/components/Field/mixins/fieldProps.ts';
import {
    useGetErrorItems,
    useHasValidated,
    useHasValidationError,
    useShowValidationError,
} from '@/components/Field/mixins/validationApi.ts';
import { validationProps } from '@/components/Field/mixins/validationProps.ts';
import {
    useInputGroupClasses,
    useRenderRadioOrCheckboxGroup,
} from '@/components/Radio/mixins/radioApi.ts';
import { cssPrefix } from '@/mixins/CommonApi.ts';
import type { TBsCheckboxGroup, TCheckboxGroupOptionProps, TCheckboxProps, TRecord } from '@/types';
import Helper from '@/utils/Helper';
import { computed, defineComponent } from 'vue';

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
