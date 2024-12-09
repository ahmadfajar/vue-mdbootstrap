import {
    useDeferHideNotification,
    useRenderNotificationItem,
} from '@/components/Notification/mixins/notificationApi.ts';
import type {
    TBsNotificationItem,
    TNotificationItemOptionProps,
    TNotificationVariant,
} from '@/components/Notification/types';
import {
    booleanProp,
    booleanTrueProp,
    numberProp,
    stringMandatoryProp,
    stringProp,
} from '@/mixins/CommonProps.ts';
import type { Prop } from 'vue';
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent<TBsNotificationItem>({
    name: 'BsNotificationItem',
    props: {
        message: stringMandatoryProp,
        title: stringProp,
        timeout: numberProp,
        clickClose: booleanProp,
        closeButton: booleanTrueProp,
        iconOff: booleanProp,
        progressBar: booleanProp,
        variant: stringMandatoryProp as Prop<TNotificationVariant>,
    },
    emits: ['dismiss'],
    setup(props, { emit }) {
        const thisProps = props as Readonly<TNotificationItemOptionProps>;
        const timerId = ref<number>();

        onMounted(() => {
            useDeferHideNotification(emit, timerId, thisProps.timeout);
        });

        return () => useRenderNotificationItem(emit, thisProps, timerId);
    },
});
