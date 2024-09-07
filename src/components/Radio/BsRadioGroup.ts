import { computed, defineComponent } from 'vue';
import { cssPrefix } from '../../mixins/CommonApi';
import Helper from '../../utils/Helper';
import { baseInputProps } from '../Field/mixins/fieldProps';
import {
    useGetErrorItems,
    useHasValidated,
    useHasValidationError,
    useShowValidationError,
} from '../Field/mixins/validationApi';
import { validationProps } from '../Field/mixins/validationProps';
import {
    useCreateRadioItems,
    useInputGroupClasses,
    useRenderRadioOrCheckboxGroup,
} from './mixins/radioApi';
import { radioGroupProps } from './mixins/radioProps';
import type { TBsRadioGroup, TRadioGroupOptionProps, TRadioProps } from './types';

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
