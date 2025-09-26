import { BsOverlay } from '@/components/Animation';
import PopupManager from '@/components/Popover/mixins/PopupManager.ts';
import { ClickOutside, Resize, Scroll } from '@/directives';
import { useRenderTransition } from '@/mixins/CommonApi.ts';
import { isChildOf, isSVGElement } from '@/mixins/DomHelper.ts';
import type {
  Numberish,
  TBsPopover,
  TEmitFn,
  TPopoverOptionProps,
  TPopoverPosition,
  TRecord,
} from '@/types';
import Helper from '@/utils/Helper.ts';
import type {
  ComponentInternalInstance,
  ComputedRef,
  ExtractPropTypes,
  Prop,
  Ref,
  ShallowRef,
  Slots,
  VNode,
} from 'vue';
import { h, mergeProps, nextTick, Teleport, vShow, withDirectives } from 'vue';

const SPACE = 8;

function shiftedSpace(value?: Numberish): number {
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
  let offsetTop = 0;
  const spaceAvailable = window.innerHeight - SPACE - height;
  const minTop = SPACE;

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
  popoverRef: Ref<Element | null>,
  actualPlacement: Ref<TPopoverPosition | undefined>,
  isActive: Ref<boolean>
): void {
  if (!popoverRef.value || !instance || !isActive.value || !props.trigger) {
    return;
  }

  const popoverEl = <HTMLElement>popoverRef.value;
  const activatorEl = Helper.isString(props.trigger)
    ? document.querySelector(props.trigger)
    : props.trigger;

  if (activatorEl) {
    const elRect = activatorEl.getBoundingClientRect();
    if (elRect.top < -elRect.height || elRect.top > window.innerHeight) {
      useClosePopover(instance, isActive, 'Activator overflow.');
    }

    const shift = shiftedSpace(props.space);
    const deltaYTop = elRect.top - popoverEl.offsetHeight - shift;
    const deltaYBottom = window.innerHeight - (elRect.top + popoverEl.offsetHeight + shift);

    if (props.placement?.startsWith('bottom') && deltaYBottom < deltaYTop) {
      actualPlacement.value = props.placement.replace('bottom', 'top') as TPopoverPosition;
    } else if (props.placement?.startsWith('top') && deltaYTop < deltaYBottom) {
      actualPlacement.value = props.placement.replace('top', 'bottom') as TPopoverPosition;
    } else {
      actualPlacement.value = props.placement;
    }

    if (actualPlacement.value?.startsWith('top')) {
      popoverEl.style.top = '';
      popoverEl.style.bottom =
        getPopoverBottomPosition(elRect, popoverEl.offsetHeight, shift, props.cover as boolean) +
        'px';
      popoverEl.style.height = 'fit-content';
    } else {
      popoverEl.style.bottom = '';
      popoverEl.style.height = '';
      popoverEl.style.top =
        getPopoverTopPosition(
          elRect,
          props.placement as TPopoverPosition,
          popoverEl.offsetHeight,
          shift,
          props.cover as boolean
        ) + 'px';
    }

    popoverEl.style.left =
      getPopoverLeftPosition(
        elRect,
        props.placement as TPopoverPosition,
        popoverEl.offsetWidth,
        shift,
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
  // if (!instance || !isActive.value) {
  //     return;
  // }
  //
  // isActive.value = false;
  // instance.emit('update:open', false);
  // instance.emit('close', message);
  // PopupManager.remove(instance);
}

export function useRenderPopover(
  slots: Slots,
  attrs: TRecord,
  props: Readonly<ExtractPropTypes<TBsPopover>>,
  instance: ShallowRef<ComponentInternalInstance | null>,
  classNames: ComputedRef<string[]>,
  popover: Ref<Element | null>,
  actualPlacement: Ref<TPopoverPosition | undefined>,
  isActive: Ref<boolean>
): VNode {
  const thisProps = props as Readonly<TPopoverOptionProps>;
  const thisSetPosition = async () => {
    await nextTick().then(() =>
      useSetPopoverPosition(instance.value, thisProps, popover, actualPlacement, isActive)
    );
  };
  const thisOnClickOutside = (evt: Event) => {
    onPopoverClickOutside(thisProps, instance.value, isActive, evt);
  };

  return h(Teleport, { to: 'body' }, [
    h(BsOverlay, {
      show: (props.overlay && isActive.value) as unknown as Prop<boolean>,
      opacity: props.overlayOpacity,
      color: props.overlayColor,
      onClick: () => {
        if (thisProps.overlayClickClose) {
          useClosePopover(instance.value, isActive, 'Overlay clicked.');
        }
      },
    }),
    useRenderTransition({ name: thisProps.transition }, [
      withDirectives(
        h(
          'div',
          mergeProps({ class: classNames.value, ref: popover }, attrs),
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
  ]);
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
  let target: HTMLElement | null | undefined = evt.target as HTMLElement | null;

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
