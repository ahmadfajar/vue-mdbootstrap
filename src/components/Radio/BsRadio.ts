import { computed, defineComponent, nextTick, ref } from 'vue';
import {
    useCreateInputRadioOrCheckbox,
    useRadioClasses,
    useRenderRadioOrCheckbox,
} from './mixins/radioApi';
import { radioProps } from './mixins/radioProps';
import type { TBsRadio, TRadioOptionProps } from './types';

export default defineComponent<TBsRadio>({
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
    setup(props, { emit, slots }) {
        const thisProps = props as Readonly<TRadioOptionProps>;
        const rippleActive = ref<boolean>(false);
        const radioClasses = computed(() => useRadioClasses(thisProps));
        const toggleCheckHandler = (): void => {
            if (!thisProps.disabled && !thisProps.readonly) {
                const checked = thisProps.value === thisProps.modelValue;
                rippleActive.value = true;
                emit('update:model-value', checked ? null : thisProps.value);
                nextTick().then(() => {
                    emit('checked', !checked);
                });
            }
        };

        return () =>
            useRenderRadioOrCheckbox(
                slots,
                thisProps,
                radioClasses,
                rippleActive,
                'radio',
                useCreateInputRadioOrCheckbox(thisProps, 'radio'),
                toggleCheckHandler
            );
    },
});
