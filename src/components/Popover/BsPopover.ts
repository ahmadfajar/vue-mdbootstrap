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
  emits: ['close', 'update:open'],
  setup(props, { slots, attrs }) {
    const thisProps = props as Readonly<TPopoverOptionProps>;
    const isActive = ref<boolean>(<boolean>thisProps.open);
    const placementRef = ref<TPopoverPosition | undefined>(thisProps.placement);
    const popoverRef = ref<HTMLElement | null>(null);
    const instance = shallowRef<ComponentInternalInstance | null>(null);

    const classNames = computed(() => [
      `${cssPrefix}popover`,
      `transition-${placementRef.value}`,
      thisProps.color ? `bg-${thisProps.color}` : '',
    ]);

    watch(
      () => thisProps.open as boolean,
      async (value) => {
        isActive.value = value;
        if (value) {
          await nextTick().then(() =>
            useSetPopoverPosition(instance.value, thisProps, popoverRef, placementRef, isActive)
          );
        }
      }
    );
    onMounted(() => {
      instance.value = getCurrentInstance();
      useSetPopoverPosition(instance.value, thisProps, popoverRef, placementRef, isActive);
    });

    return () =>
      useRenderPopover(
        slots,
        attrs,
        thisProps,
        instance,
        classNames,
        popoverRef,
        placementRef,
        isActive
      );
  },
});
