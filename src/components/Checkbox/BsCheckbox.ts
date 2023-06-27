import type { ComponentOptionsMixin, ComputedOptions, EmitsOptions, MethodOptions } from 'vue';
import { computed, defineComponent, nextTick, ref } from 'vue';
import type { TBsCheckbox, TCheckboxOptionProps, TRecord } from '../../types';
import { useCheckSelected, useCreateInputRadioOrCheckbox, useRenderRadioOrCheckbox } from '../Radio/mixins/radioApi';
import { useCheckboxClasses } from './mixins/checkboxApi';
import { checkboxProps } from './mixins/checkboxProps';

export default defineComponent<TBsCheckbox, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>({
    name: 'BsCheckbox',
    props: checkboxProps,
    emits: [
        /**
         * Fired when this component's state is changed.
         */
        'checked',
        /**
         * Fired when this component's checked value is updated.
         */
        'update:model-value',
    ],
    setup(props, {emit, slots}) {
        const cmpProps = props as Readonly<TCheckboxOptionProps>;
        const rippleActive = ref<boolean>(false);
        const checkboxClasses = computed(() => useCheckboxClasses(cmpProps));
        const toggleCheckHandler = (): void => {
            if (!cmpProps.disabled && !cmpProps.readonly) {
                const checked = useCheckSelected(cmpProps);
                rippleActive.value = true;

                if (Array.isArray(cmpProps.modelValue)) {
                    const idx = cmpProps.modelValue.indexOf(cmpProps.value);
                    if (checked) {
                        cmpProps.modelValue.splice(idx, 1);
                    } else {
                        cmpProps.modelValue.push(cmpProps.value);
                    }
                    emit('update:model-value', cmpProps.modelValue);
                } else {
                    emit('update:model-value', (checked ? null : cmpProps.value))
                }

                nextTick().then(() => {
                    emit('checked', !checked);
                });
            }
        }

        return () =>
            useRenderRadioOrCheckbox(
                slots, cmpProps, checkboxClasses, rippleActive, 'checkbox',
                useCreateInputRadioOrCheckbox(
                    cmpProps, 'checkbox', {
                        indeterminate: props.indeterminate,
                        'true-value': true,
                        'false-value': false,
                    }),
                toggleCheckHandler,
            );
    }
});
