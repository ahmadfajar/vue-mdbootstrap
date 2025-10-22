import { BsOverlay } from '@/components/Animation';
import PopupManager from '@/components/Popover/mixins/PopupManager.ts';
import { ClickOutside, Resize, Scroll } from '@/directives';
import { useRenderTransition } from '@/mixins/CommonApi.ts';
import { isChildOf, isSVGElement } from '@/mixins/DomHelper.ts';
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

const SPACE = 8;

function shiftedValue(value?: Numberish): number {
  return Helper.isNumber(value)
    ? value
    : !value || isNaN(parseInt(value, 10))
      ? 0
      : parseInt(value, 10);
}

function getPopoverLeftPosition(
  activatorRect: DOMRect,
  placement: TPopoverPosition,
  width: number,
  shift: number,
  cover: boolean
): number {
  let offsetLeft = 0;
  const maxLeft = window.innerWidth - SPACE - width;
  const minLeft = SPACE;

  switch (placement) {
    case 'left':
    case 'left-top':
    case 'left-bottom':
      offsetLeft = activatorRect.left - width - shift;
      if (cover) {
        offsetLeft += activatorRect.width;
      } else if (offsetLeft < SPACE) {
        offsetLeft = activatorRect.left + activatorRect.width + shift;
      }
      break;
    case 'right':
    case 'right-top':
    case 'right-bottom':
      offsetLeft = cover
        ? activatorRect.left
        : activatorRect.left + activatorRect.width > maxLeft
          ? activatorRect.left - width - shift
          : activatorRect.left + activatorRect.width + shift;
      break;
    case 'top':
    case 'bottom':
      offsetLeft = activatorRect.left + activatorRect.width / 2 - width / 2;
      break;
    case 'bottom-left':
    case 'top-left':
      offsetLeft = activatorRect.left;
      break;
    case 'bottom-right':
    case 'top-right':
      offsetLeft = activatorRect.left + activatorRect.width - width;
      break;
  }

  if (['top', 'top-left', 'bottom', 'bottom-left'].includes(placement as string)) {
    if (offsetLeft + width >= maxLeft + width) {
      offsetLeft = maxLeft;
    }
  }

  return Math.max(minLeft, offsetLeft);
}

function getPopoverTopPosition(
  activatorRect: DOMRect,
  placement: TPopoverPosition,
  height: number,
  shift: number,
  cover: boolean
): number {
  const posY = activatorRect.top + activatorRect.height + shift;
  const spaceAvailable = window.innerHeight - SPACE - height;
  const minTop = SPACE;
  let offsetTop = 0;

  switch (placement) {
    case 'top':
    case 'top-left':
    case 'top-right':
      offsetTop = activatorRect.top - height - shift;
      if (!cover) {
        if (offsetTop < minTop) {
          offsetTop = activatorRect.top + activatorRect.height - shift;
        }
      } else {
        offsetTop += activatorRect.height;
      }
      break;
    case 'bottom':
    case 'bottom-left':
    case 'bottom-right':
      offsetTop = cover
        ? activatorRect.top
        : posY > spaceAvailable
          ? posY - Math.abs(window.innerHeight - posY - height)
          : posY;
      break;
    case 'left':
    case 'right':
      offsetTop = activatorRect.top + activatorRect.height / 2 - height / 2;
      break;
    case 'left-top':
    case 'right-top':
      offsetTop = activatorRect.top;
      break;
    case 'left-bottom':
    case 'right-bottom':
      offsetTop = activatorRect.top + activatorRect.height - height;
      break;
  }
  offsetTop = Math.min(spaceAvailable, offsetTop);
  offsetTop = Math.max(minTop, offsetTop);

  return offsetTop;
}

function getPopoverBottomPosition(
  activatorRect: DOMRect,
  height: number,
  shift: number,
  cover: boolean
): number {
  let offsetBottom = window.innerHeight - activatorRect.top - shift + 4;

  if (cover) {
    offsetBottom += activatorRect.height / 2 - height / 2;
  }
  if (window.innerHeight < offsetBottom + height) {
    offsetBottom -= Math.abs(window.innerHeight - offsetBottom - height);
  }

  return offsetBottom;
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
    // console.log('Top: ', elRect.top, ', bottom: ', elRect.bottom);
    if (elRect.top < -elRect.height || elRect.top > window.innerHeight) {
      useClosePopover(instance, isActive, 'Activator overflow.');
    }

    const shifted = shiftedValue(props.space);
    const deltaYTop = elRect.top - popoverEl.offsetHeight - shifted;
    const deltaYBottom = window.innerHeight - (elRect.top + popoverEl.offsetHeight + shifted);

    if (props.placement?.startsWith('bottom') && deltaYBottom < deltaYTop) {
      placementRef.value = props.placement.replace('bottom', 'top') as TPopoverPosition;
    } else if (props.placement?.startsWith('top') && deltaYTop < deltaYBottom) {
      placementRef.value = props.placement.replace('top', 'bottom') as TPopoverPosition;
    } else {
      placementRef.value = props.placement;
    }

    if (placementRef.value?.startsWith('top')) {
      popoverEl.style.height = 'fit-content';
      popoverEl.style.top = '';
      popoverEl.style.bottom =
        getPopoverBottomPosition(elRect, popoverEl.offsetHeight, shifted, props.cover as boolean) +
        'px';
    } else {
      popoverEl.style.bottom = '';
      popoverEl.style.height = '';
      popoverEl.style.top =
        getPopoverTopPosition(
          elRect,
          props.placement as TPopoverPosition,
          popoverEl.offsetHeight,
          shifted,
          props.cover as boolean
        ) + 'px';
    }

    popoverEl.style.left =
      getPopoverLeftPosition(
        elRect,
        props.placement as TPopoverPosition,
        popoverEl.offsetWidth,
        shifted,
        props.cover as boolean
      ) + 'px';

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
      // console.log('Activator:', props.trigger);
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
