import { baseInputProps } from '@/components/Field/mixins/fieldProps.ts';
import {
    useGetErrorItems,
    useHasValidated,
    useHasValidationError,
    useShowValidationError,
} from '@/components/Field/mixins/validationApi.ts';
import { validationProps } from '@/components/Field/mixins/validationProps.ts';
import {
    useCreateRadioItems,
    useInputGroupClasses,
    useRenderRadioOrCheckboxGroup,
} from '@/components/Radio/mixins/radioApi.ts';
import { radioGroupProps } from '@/components/Radio/mixins/radioProps.ts';
import type { TBsRadioGroup, TRadioGroupOptionProps, TRadioProps } from '@/components/Radio/types';
import { cssPrefix } from '@/mixins/CommonApi.ts';
import Helper from '@/utils/Helper';
import { computed, defineComponent } from 'vue';

export default defineComponent<TBsRadioGroup>({
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
    setup(props, { emit, slots }) {
        const thisProps = props as Readonly<TRadioGroupOptionProps>;
        const hasError = computed<boolean>(() => useHasValidationError(thisProps));
        const hasValidated = computed<boolean>(() => useHasValidated(thisProps));
        const showValidationError = computed<boolean>(() => useShowValidationError(thisProps));
        const errorItems = computed(() => useGetErrorItems(thisProps));
        const checkboxClasses = computed(() => ({
            ...useInputGroupClasses(thisProps, hasValidated.value, hasError.value),
            [`${cssPrefix}radio-group`]: true,
        }));

        const toggleCheckHandler = (item: TRadioProps): void => {
            if (!thisProps.disabled && !thisProps.readonly && !item.disabled && !item.readonly) {
                emit('update:model-value', item.value);
            }
        };

        return () =>
            useRenderRadioOrCheckboxGroup(
                slots,
                thisProps,
                checkboxClasses,
                useCreateRadioItems(thisProps, toggleCheckHandler),
                showValidationError.value,
                !Helper.isEmpty(thisProps.helpText) && thisProps.persistentHelpText === true,
                hasError.value,
                errorItems.value
            );
    },
});
