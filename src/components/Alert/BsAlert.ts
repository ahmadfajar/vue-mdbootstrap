import type { ComponentOptionsMixin, ComputedOptions, EmitsOptions, MethodOptions } from 'vue';
import { computed, defineComponent, nextTick, ref, watch } from 'vue';
import type { TAlertOptionProps, TBsAlert, TRecord } from '../../types';
import { useAlertClassNames, useAlertColorName, useAlertIconName, useRenderAlert } from './mixins/alertApi';
import { alertProps } from './mixins/alertProps';

export default defineComponent<TBsAlert, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>({
    name: 'BsAlert',
    props: alertProps,
    emits: [
        /**
         * Event fired when this component is dismissed (hide).
         */
        'close',
        /**
         * Event fired when this component's value is updated.
         */
        'update:model-value'
    ],
    setup(props, {emit, slots}) {
        const thisProps = props as Readonly<TAlertOptionProps>;
        const dismiss = ref<boolean>(false);
        const colorName = computed<string | undefined>(
            () => useAlertColorName(thisProps)
        );
        const alertIconName = computed<string | undefined>(
            () => useAlertIconName(thisProps)
        );
        const classNames = computed<Record<string, boolean | undefined>>(
            () => useAlertClassNames(thisProps, colorName)
        );
        const show = computed(() => !dismiss.value && thisProps.modelValue);
        const dismissedAlert = () => {
            dismiss.value = true;
            emit('update:model-value', false);
            nextTick().then(() => emit('close'))
        }

        watch(
            () => thisProps.modelValue,
            (value) => {
                if (thisProps.dismissible) {
                    dismiss.value = !(value === true);
                }
            }
        );

        return () =>
            useRenderAlert(slots, thisProps, show, classNames, colorName, alertIconName, dismissedAlert);
    }
});
