import { defineComponent, h, onMounted, ref, watch } from 'vue';
import { cssPrefix } from '../../mixins/CommonApi';
import { booleanProp } from '../../mixins/CommonProps';
import type { TBsNotificationBar, TNotificationBarOptionProps } from './types';

export default defineComponent<TBsNotificationBar>({
    name: 'BsNotificationBar',
    props: {
        timeout: {
            type: Number,
            default: undefined,
        },
        pause: booleanProp,
    },
    setup(props) {
        const thisProps = props as Readonly<TNotificationBarOptionProps>;
        const intervalId = ref<number>();
        const etaRef = ref<number>();
        const barWidth = ref(100);

        const updateProgressBar = () => {
            const diff = (etaRef.value as number) - Date.now();
            let percentage;

            percentage = (diff / (thisProps.timeout as number)) * 100;
            percentage = Math.floor(percentage);
            barWidth.value = percentage;
        };

        watch(
            () => thisProps.pause,
            (value) => {
                if (value === true) {
                    // console.info("paused at value:", barWidth.value);
                    window.clearInterval(intervalId.value);
                    intervalId.value = undefined;
                } else if (!intervalId.value) {
                    // etaRef.value = Math.floor((barWidth.value * <number>thisProps.timeout) / 100) + Date.now();
                    etaRef.value = Date.now() + (thisProps.timeout as number);
                    // console.info("continue at value:", etaRef.value);
                    intervalId.value = window.setInterval(() => {
                        updateProgressBar();
                    }, 10);
                }
            }
        );
        onMounted(() => {
            etaRef.value = Date.now() + <number>thisProps.timeout;
            // console.info("start at value:", etaRef.value);
            intervalId.value = window.setInterval(() => {
                updateProgressBar();
            }, 10);
        });

        return () =>
            h('div', {
                class: `${cssPrefix}notification-bar`,
                style: { width: barWidth.value + '%' },
            });
    },
});
