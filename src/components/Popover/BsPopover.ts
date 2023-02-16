import type {ComponentInternalInstance, ComponentOptionsMixin, ComputedOptions, EmitsOptions} from "vue";
import {computed, defineComponent, getCurrentInstance, nextTick, onMounted, ref, shallowRef, watch} from "vue";
import {popoverProps} from "./mixins/popoverProps";
import {useRenderPopover, useSetPopoverPosition} from "./mixins/popoverApi";
import {cssPrefix} from "../../mixins/CommonApi";
import type {TBsPopover, TPopoverOptionProps, TRecord} from "../../types";

export default defineComponent<TBsPopover, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsPopover",
    props: popoverProps,
    inheritAttrs: false,
    emits: [
        /**
         * Fired when this Popover state is updated.
         */
        "update:open",
        /**
         * Fired when this Popover closed or hide.
         */
        "close",
    ],
    setup(props, {slots, attrs}) {
        const thisProps = props as Readonly<TPopoverOptionProps>;
        const isActive = ref<boolean>(<boolean>thisProps.open);
        const actualPlacement = ref<string | undefined>(thisProps.placement);
        const popover = ref<Element | null>(null);
        const instance = shallowRef<ComponentInternalInstance | null>(null);

        const classNames = computed(
            () => [
                `${cssPrefix}popover`,
                `transition-${actualPlacement.value}`,
                `bg-${thisProps.color}`,
            ]
        );

        watch(
            () => <boolean>thisProps.open,
            (value) => {
                isActive.value = value;
                if (value) {
                    nextTick().then(() =>
                        useSetPopoverPosition(popover, instance.value, thisProps, actualPlacement, isActive)
                    );
                }
            }
        );
        onMounted(() => {
            instance.value = getCurrentInstance();
            useSetPopoverPosition(popover, instance.value, thisProps, actualPlacement, isActive);
        });

        return () =>
            useRenderPopover(slots, attrs, props, instance, classNames, popover, actualPlacement, isActive)
    }
});
