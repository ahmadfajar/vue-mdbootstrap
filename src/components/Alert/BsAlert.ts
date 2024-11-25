import {
    useAlertClassNames,
    useAlertColor,
    useAlertIcon,
    useRenderAlert,
} from '@/components/Alert/mixins/alertApi';
import { alertProps } from '@/components/Alert/mixins/alertProps';
import type { TAlertOptionProps, TBsAlert } from '@/components/Alert/types';
import { computed, defineComponent, nextTick, ref, watch } from 'vue';

export default defineComponent<TBsAlert>({
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
        'update:model-value',
    ],
    setup(props, { emit, slots }) {
        const thisProps = props as Readonly<TAlertOptionProps>;
        const dismissed = ref<boolean>(false);
        const alertColor = computed<string | undefined>(() => useAlertColor(thisProps));
        const alertIcon = computed<string | undefined>(() => useAlertIcon(thisProps));
        const classNames = computed<Record<string, boolean | undefined>>(() =>
            useAlertClassNames(thisProps, alertColor)
        );
        const show = computed(() => !dismissed.value && thisProps.modelValue);
        const dismissedAlert = () => {
            dismissed.value = true;
            emit('update:model-value', false);
            nextTick().then(() => emit('close'));
        };

        watch(
            () => thisProps.modelValue,
            (value) => {
                if (thisProps.dismissible) {
                    dismissed.value = !(value === true);
                }
            }
        );

        return () =>
            useRenderAlert(
                slots,
                thisProps,
                show,
                classNames,
                alertColor,
                alertIcon,
                dismissedAlert
            );
    },
});
