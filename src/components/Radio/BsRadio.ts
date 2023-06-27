import type { ComponentOptionsMixin, ComputedOptions, EmitsOptions, MethodOptions } from 'vue';
import { computed, defineComponent, nextTick, ref } from 'vue';
import type { TBsRadio, TRadioOptionProps, TRecord } from '../../types';
import { useCreateInputRadioOrCheckbox, useRadioClasses, useRenderRadioOrCheckbox } from './mixins/radioApi';
import { radioProps } from './mixins/radioProps';

export default defineComponent<TBsRadio, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>({
    name: 'BsRadio',
    props: radioProps,
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
        const cmpProps = props as Readonly<TRadioOptionProps>;
        const rippleActive = ref<boolean>(false);
        const radioClasses = computed(() => useRadioClasses(cmpProps));
        const toggleCheckHandler = (): void => {
            if (!cmpProps.disabled && !cmpProps.readonly) {
                const checked = cmpProps.value === cmpProps.modelValue;
                rippleActive.value = true;
                emit('update:model-value', checked ? null : cmpProps.value)
                nextTick().then(() => {
                    emit('checked', !checked);
                });
            }
        }

        return () =>
            useRenderRadioOrCheckbox(
                slots, cmpProps, radioClasses, rippleActive, 'radio',
                useCreateInputRadioOrCheckbox(cmpProps, 'radio'),
                toggleCheckHandler,
            );
    }
});
