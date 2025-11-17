import { BsOverlay } from '@/components/Animation';
import PopupManager from '@/components/Popover/mixins/PopupManager.ts';
import { ClickOutside, Resize, Scroll } from '@/directives';
import { useRenderTransition } from '@/mixins/CommonApi.ts';
import { isChildOf, isSVGElement } from '@/mixins/DomHelper.ts';
import { useFloatingElement } from '@/mixins/floatingElement.ts';
import type { Numberish, TEmitFn, TPopoverOptionProps, TPopoverPosition, TRecord } from '@/types';
import Helper from '@/utils/Helper.ts';
import {
  type ComponentInternalInstance,
  type ComputedRef,
  h,
  mergeProps,
  nextTick,
  type Prop,
  type Ref,
  type ShallowRef,
  type Slots,
  Teleport,
  type VNode,
  vShow,
  withDirectives,
} from 'vue';

function shiftedValue(value?: Numberish): number {
  return Helper.isNumber(value)
    ? value
    : !value || isNaN(parseInt(value, 10))
      ? 0
      : parseInt(value, 10);
}

export function useSetPopoverPosition(
  instance: ComponentInternalInstance | null,
  props: Readonly<TPopoverOptionProps>,
  popoverRef: Ref<HTMLElement | null>,
  placementRef: Ref<TPopoverPosition | undefined>,
  isActive: Ref<boolean>
): void {
  if (!popoverRef.value || !instance || !isActive.value || !props.trigger) {
    return;
  }

  const popoverEl = popoverRef.value;
  const activatorEl = Helper.isString(props.trigger)
    ? document.querySelector(props.trigger)
    : props.trigger;

  if (activatorEl) {
    const elRect = activatorEl.getBoundingClientRect();
    if (elRect.top < -elRect.height || elRect.top > window.innerHeight) {
      useClosePopover(instance, isActive, 'Activator overflow.');
    }

    const shifted = shiftedValue(props.space);
    const computed = useFloatingElement(
      popoverEl,
      activatorEl as HTMLElement,
      placementRef.value as TPopoverPosition,
      shifted,
      props.cover ?? false,
      true
    );

    placementRef.value = computed.placement;
    popoverEl.style.top = computed.top;
    popoverEl.style.bottom = computed.bottom;
    popoverEl.style.left = computed.left;
    popoverEl.style.height = computed.height;

    PopupManager.add(instance, props, isActive);
  }
}

export function useClosePopover(
  instance: ComponentInternalInstance | null,
  isActive: Ref<boolean>,
  message: string
): void {
  PopupManager.closePopover(instance, isActive, message);
}

function onPopoverClickOutside(
  props: Readonly<TPopoverOptionProps>,
  instance: ComponentInternalInstance | null,
  isActive: Ref<boolean>,
  evt: Event
): void {
  if ((props.overlay && !props.overlayClickClose) || !isActive.value) {
    return;
  }

  const activatorEl = Helper.isString(props.trigger)
    ? document.querySelector(props.trigger)
    : props.trigger;
  let target = evt.target as HTMLElement | null | undefined;

  if (activatorEl && activatorEl.contains(target as Node)) {
    return;
  }
  if (activatorEl && isSVGElement(target)) {
    target = target?.parentElement;

    while (isSVGElement(target)) {
      target = target?.parentElement;
    }
  }
  if (isChildOf(activatorEl as Element | null, target)) {
    return;
  }

  useClosePopover(instance, isActive, 'Clicked outside.');
}

export function useRenderPopover(
  slots: Slots,
  attrs: TRecord,
  props: Readonly<TPopoverOptionProps>,
  instance: ShallowRef<ComponentInternalInstance | null>,
  classNames: ComputedRef<string[]>,
  popoverRef: Ref<HTMLElement | null>,
  placementRef: Ref<TPopoverPosition | undefined>,
  isActive: Ref<boolean>
): VNode {
  const thisSetPosition = async () => {
    await nextTick().then(() => {
      useSetPopoverPosition(instance.value, props, popoverRef, placementRef, isActive);
    });
  };

  const thisOnClickOutside = (evt: Event) => {
    onPopoverClickOutside(props, instance.value, isActive, evt);
  };

  return h(
    Teleport,
    { to: 'body' },
    {
      default: () => [
        h(BsOverlay, {
          show: (props.overlay && isActive.value) as unknown as Prop<boolean>,
          opacity: props.overlayOpacity as Prop<Numberish>,
          color: props.overlayColor as Prop<string>,
          onClick: () => {
            if (props.overlayClickClose) {
              useClosePopover(instance.value, isActive, 'Overlay clicked.');
            }
          },
        }),
        useRenderTransition({ name: props.transition }, [
          withDirectives(
            h(
              'div',
              mergeProps({ class: classNames.value, ref: popoverRef }, attrs),
              slots.default && slots.default()
            ),
            [
              [vShow, isActive.value],
              [ClickOutside, thisOnClickOutside],
              [Resize, thisSetPosition],
              [Scroll, thisSetPosition],
            ]
          ),
        ]),
      ],
    }
  );
}

/**
 * Toggle Popover state: show or hide.
 *
 * @param emit           Emitter function
 * @param isPopoverOpen  The Popover state reference
 * @param isDisabled     Is the component in disable state or not
 * @param state          Current Popover state that will be toggled or reversed.
 */
export function useTogglePopoverState(
  emit: TEmitFn,
  isPopoverOpen: Ref<boolean>,
  isDisabled: boolean,
  state: boolean
): void {
  if (!isDisabled) {
    isPopoverOpen.value = !state;
    emit(isPopoverOpen.value ? 'open' : 'close');
  }
}
