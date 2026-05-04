/* eslint-disable @typescript-eslint/no-empty-object-type */
import { useRenderPopover, useSetPopoverPosition } from '@/components/Popover/mixins/popoverApi.ts';
import { popoverProps } from '@/components/Popover/mixins/popoverProps.ts';
import type { TBsPopover, TPopoverOptionProps, TPopoverPosition } from '@/components/Popover/types';
import { cssPrefix } from '@/mixins/CommonApi.ts';
import type { TRecord } from '@/types';
import type {
  ClosableEventProps,
  ClosableEventPublic,
  UpdateOpenEventProps,
  UpdateOpenEventPublic,
  VoidDefaultSlots,
} from '@/types/internals.ts';
import type {
  ComponentInternalInstance,
  ComponentOptionsMixin,
  ComponentProvideOptions,
  ComputedOptions,
  DefineComponent,
  ExtractDefaultPropTypes,
  MethodOptions,
  PublicProps,
  SlotsType,
} from 'vue';
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
    const isActive = ref<boolean>(thisProps.open as boolean);
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
}) as DefineComponent<
  TBsPopover,
  {},
  {},
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  PopoverEventProps,
  string,
  PublicProps,
  Readonly<TPopoverOptionProps> & Readonly<PopoverEventPublic>,
  ExtractDefaultPropTypes<TBsPopover>,
  SlotsType<VoidDefaultSlots>,
  {},
  {},
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;

declare type PopoverEventProps = ClosableEventProps & UpdateOpenEventProps;

declare interface PopoverEventPublic extends ClosableEventPublic, UpdateOpenEventPublic {}
