import type { Prop } from 'vue';
import { defineComponent, onMounted, ref, shallowRef } from 'vue';
import { useVueMdbNotification } from '../../mixins/CommonApi';
import Helper from '../../utils/Helper';
import { useRenderNotificationItem } from './mixins/notificationApi';
import type {
    INotificationProvider,
    TBsNotificationItem,
    TNotificationItemOptionProps,
    TNotificationOption,
} from './types';

export default defineComponent<TBsNotificationItem>({
    name: 'BsNotificationItem',
    props: {
        options: {
            type: Object,
            default: undefined,
        } as Prop<TNotificationOption>,
    },
    setup(props) {
        const thisProps = props as Readonly<TNotificationItemOptionProps>;
        const provider = shallowRef<INotificationProvider>();
        const timerId = ref<number>();

        onMounted(() => {
            provider.value = useVueMdbNotification();
            timerId.value = Helper.defer(
                () => {
                    provider.value?.remove(<TNotificationOption>thisProps.options);
                },
                thisProps.options?.timeout as number
            );
        });

        return () => useRenderNotificationItem(thisProps, provider, timerId);
    },
});
