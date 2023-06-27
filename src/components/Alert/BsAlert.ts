import type { ComponentOptionsMixin, ComputedOptions, EmitsOptions, MethodOptions } from 'vue';
import { computed, createCommentVNode, defineComponent, nextTick, ref, watch } from 'vue';
import { useRenderTransition } from '../../mixins/CommonApi';
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
        const cmpProps = props as Readonly<TAlertOptionProps>;
        const dismiss = ref<boolean>(false);
        const colorName = computed<string | undefined>(
            () => useAlertColorName(cmpProps)
        );
        const alertIconName = computed<string | undefined>(
            () => useAlertIconName(cmpProps)
        );
        const classNames = computed<Record<string, boolean | undefined>>(
            () => useAlertClassNames(cmpProps, colorName)
        );
        const show = computed(() => !dismiss.value && props.modelValue);
        const dismissedAlert = () => {
            dismiss.value = true;
            emit('update:model-value', false);
            nextTick().then(() => emit('close'))
        }

        watch(
            () => cmpProps.modelValue,
            (value) => {
                if (props.dismissible) {
                    dismiss.value = !(value === true);
                }
            }
        );

        return () =>
            useRenderTransition(
                {name: cmpProps.transition},
                show.value
                    ? useRenderAlert(
                        slots, cmpProps, classNames, colorName,
                        alertIconName, dismissedAlert,
                    )
                    : createCommentVNode(' BsAlert ', true)
            )
    }
});
