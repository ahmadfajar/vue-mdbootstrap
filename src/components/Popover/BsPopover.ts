import { useRenderPopover, useSetPopoverPosition } from '@/components/Popover/mixins/popoverApi.ts';
import { popoverProps } from '@/components/Popover/mixins/popoverProps.ts';
import type { TBsPopover, TPopoverOptionProps, TPopoverPosition } from '@/components/Popover/types';
import { cssPrefix } from '@/mixins/CommonApi.ts';
import type { ComponentInternalInstance } from 'vue';
import {
    computed,
    defineComponent,
    getCurrentInstance,
    nextTick,
    onMounted,
    ref,
    shallowRef,
    watch,
} from 'vue';

export default defineComponent<TBsPopover>({
    name: 'BsPopover',
    props: popoverProps,
    inheritAttrs: false,
    emits: [
        /**
         * Fired when this Popover state is updated.
         */
        'update:open',
        /**
         * Fired when this Popover closed or hide.
         */
        'close',
    ],
    setup(props, { slots, attrs }) {
        const thisProps = props as Readonly<TPopoverOptionProps>;
        const isActive = ref<boolean>(<boolean>thisProps.open);
        const actualPlacement = ref<TPopoverPosition | undefined>(thisProps.placement);
        const popover = ref<Element | null>(null);
        const instance = shallowRef<ComponentInternalInstance | null>(null);

        const classNames = computed(() => [
            `${cssPrefix}popover`,
            `transition-${actualPlacement.value}`,
            thisProps.color ? `bg-${thisProps.color}` : '',
        ]);

        watch(
            () => thisProps.open as boolean,
            (value) => {
                isActive.value = value;
                if (value) {
                    nextTick().then(() =>
                        useSetPopoverPosition(
                            instance.value,
                            thisProps,
                            popover,
                            actualPlacement,
                            isActive
                        )
                    );
                }
            }
        );
        onMounted(() => {
            instance.value = getCurrentInstance();
            useSetPopoverPosition(instance.value, thisProps, popover, actualPlacement, isActive);
        });

        return () =>
            useRenderPopover(
                slots,
                attrs,
                props,
                instance,
                classNames,
                popover,
                actualPlacement,
                isActive
            );
    },
});
