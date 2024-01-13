import type { ComponentOptionsMixin, ComputedOptions, EmitsOptions, MethodOptions } from 'vue';
import { computed, defineComponent, ref } from 'vue';
import { cssPrefix } from '../../mixins/CommonApi';
import type { TBsToggleField, TRecord, TToggleFieldOptionProps } from '../../types';
import {
    useGetErrorItems,
    useHasValidated,
    useHasValidationError,
    useShowHelpText,
    useShowValidationError
} from '../Field/mixins/validationApi';
import { validationProps } from '../Field/mixins/validationProps';
import { useRenderToggleFieldButton } from './mixins/buttonApi';
import { toggleButtonProps } from './mixins/buttonProps';

export default defineComponent<TBsToggleField, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>({
    name: 'BsToggleField',
    props: {
        ...toggleButtonProps,
        ...validationProps,
    },
    emits: [
        /**
         * Callback fired when this component's value is updated.
         */
        'update:model-value'
    ],
    setup(props, {emit, slots}) {
        const thisProps = props as Readonly<TToggleFieldOptionProps>;
        const hasFocused = ref(false);
        const hasError = computed<boolean>(() => useHasValidationError(thisProps));
        const hasValidated = computed<boolean>(() => useHasValidated(thisProps));
        const showValidationError = computed<boolean>(() => useShowValidationError(thisProps));
        const showHelpText = computed<boolean>(() => useShowHelpText(thisProps, hasFocused.value));
        const errorItems = computed(() => useGetErrorItems(thisProps));
        const wrapperClasses = computed<TRecord>(
            () => ({
                [`${cssPrefix}field`]: true,
                [`${cssPrefix}toggle-field row`]: true,
                'required': thisProps.required,
                'readonly': thisProps.readonly,
                'disabled': thisProps.disabled,
                'has-error': hasError.value,
                'has-success': hasValidated.value && !hasError.value,
            })
        );

        return () =>
            useRenderToggleFieldButton(
                slots, emit, props, wrapperClasses, hasFocused,
                showHelpText, showValidationError, hasError, errorItems
            );
    }
});
