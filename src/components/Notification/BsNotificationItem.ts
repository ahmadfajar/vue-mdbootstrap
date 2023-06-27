import type { ComponentOptionsMixin, ComputedOptions, EmitsOptions, MethodOptions, Prop } from 'vue';
import { defineComponent, onMounted, ref, shallowRef } from 'vue';
import { useVueMdbNotification } from '../../mixins/CommonApi';
import type {
    INotificationProvider,
    TBsNotificationItem,
    TNotificationItemOptionProps,
    TNotificationOption,
    TRecord
} from '../../types';
import Helper from '../../utils/Helper';
import { useRenderNotificationItem } from './mixins/notificationApi';

export default defineComponent<TBsNotificationItem, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>({
    name: 'BsNotificationItem',
    props: {
        options: {
            type: Object,
            default: undefined
        } as Prop<TNotificationOption>,
    },
    setup(props) {
        const thisProps = props as Readonly<TNotificationItemOptionProps>;
        const provider = shallowRef<INotificationProvider>();
        const timerId = ref<number>();

        onMounted(
            () => {
                provider.value = useVueMdbNotification();
                timerId.value = Helper.defer(() => {
                    provider.value?.remove(<TNotificationOption>thisProps.options);
                }, <number>thisProps.options?.timeout);
            }
        );

        return () => useRenderNotificationItem(thisProps, provider, timerId);
    }
});
