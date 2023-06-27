import type { ComponentOptionsMixin, ComputedOptions, EmitsOptions, MethodOptions } from 'vue';
import { computed, defineComponent, h, ref } from 'vue';
import { cssPrefix } from '../../mixins/CommonApi';
import type { TBsToggleField, TRecord, TToggleFieldOptionProps } from '../../types';
import Helper from '../../utils/Helper';
import {
    useGetErrorItems,
    useHasValidated,
    useHasValidationError,
    useRenderFieldFeedback,
    useShowHelpText,
    useShowValidationError
} from '../Field/mixins/validationApi';
import { validationProps } from '../Field/mixins/validationProps';
import BsToggleButton from './BsToggleButton';
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
                'has-success': hasValidated.value && !hasError.value

            })
        );

        return () =>
            h('div', {
                class: wrapperClasses.value
            }, [
                slots.default && slots.default(),
                h('div', {
                    class: 'col-md',
                }, [
                    h('div', {
                        class: [`${cssPrefix}field-inner`],
                    }, [
                        h(BsToggleButton, {
                            id: props.id,
                            name: props.name,
                            disabled: props.disabled,
                            readonly: props.readonly,
                            required: props.required,
                            items: props.items,
                            multiple: props.multiple,
                            modelValue: props.modelValue,
                            flat: props.flat,
                            outlined: props.outlined,
                            raised: props.raised,
                            rounded: props.rounded,
                            pill: props.pill,
                            size: props.size,
                            color: props.color,
                            toggleColor: props.toggleColor,
                            iconPosition: props.iconPosition,
                            onMouseenter: () => !Helper.isEmpty(props.helpText) && !props.persistentHelpText && (hasFocused.value = true),
                            onMouseleave: () => !Helper.isEmpty(props.helpText) && !props.persistentHelpText && (hasFocused.value = false),
                            'onUpdate:model-value': (value: string | number | boolean) => {
                                emit('update:model-value', value);
                            }
                        }),
                    ]),
                    useRenderFieldFeedback(
                        slots, thisProps,
                        showHelpText.value,
                        showValidationError.value,
                        hasError.value,
                        errorItems.value,
                    ),
                ]),
            ])
    }
});
