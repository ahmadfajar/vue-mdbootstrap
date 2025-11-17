import type { TPopoverPosition } from '@/components/Popover/types';

declare type TFloatingArrow = {
  top: string;
  bottom: string;
  left: string;
};

declare type TFloatingElement = {
  placement: TPopoverPosition;
  top: string;
  bottom: string;
  height: string;
  left: string;
  arrow?: TFloatingArrow;
};

// constraint utk membatasi offset posisi
const SPACE = 8;

/**
 * Computes the position of a floating DOM element.
 * It's usually used for `Tooltip` and `Popover` element.
 *
 * @param element   The floating `Element` that will be computed.
 * @param activator The activator element used for computing the floating `Element`.
 * @param placement The floating `Element` placement when it is visible.
 * @param shifted   Shift the floating `Element` position based on the given value.
 * @param cover     Cover the activator element when displaying the floating `Element`.
 * @param flip      Flip the floating `Element` if exceed the window dimension.
 * @param arrow     Also compute the `Arrow Element` position if exists.
 */
export function useFloatingElement(
  element: HTMLElement,
  activator: HTMLElement,
  placement: TPopoverPosition,
  shifted: number,
  cover: boolean,
  flip: boolean,
  arrow?: HTMLElement | null
): TFloatingElement {
  const activatorRect = activator.getBoundingClientRect();

  const result = {
    top: '',
    bottom: '',
    height: '',
    left: '',
    placement: placement,
  } as TFloatingElement;

  if (flip) {
    const arrowWidth = arrow ? arrow.offsetWidth / 2 : 0;
    const offsetBottom = activatorRect.top + element.offsetHeight + shifted;
    const offsetTop = activatorRect.top - element.offsetHeight - shifted;
    const offsetLeft = activatorRect.left - element.offsetWidth - shifted - arrowWidth;
    const offsetRight = activatorRect.right + shifted + arrowWidth;
    const maxBottom = window.innerHeight - shifted - SPACE;
    const maxLeft = window.innerWidth - SPACE - element.offsetWidth;

    if (placement.startsWith('bottom') && offsetBottom > maxBottom) {
      result.placement = placement.replace('bottom', 'top') as TPopoverPosition;
    } else if (placement.startsWith('top') && offsetTop < SPACE) {
      result.placement = placement.replace('top', 'bottom') as TPopoverPosition;
    } else if (placement.startsWith('left') && offsetLeft < SPACE) {
      result.placement = placement.replace('left', 'right') as TPopoverPosition;
    } else if (placement.startsWith('right') && offsetRight > maxLeft) {
      result.placement = placement.replace('right', 'left') as TPopoverPosition;
    }
  }

  const posLeft = getOffsetLeft(
    activator,
    result.placement,
    element.offsetWidth,
    shifted,
    cover,
    arrow
  );

  result.left = `${posLeft}px`;

  if (result.placement.startsWith('top')) {
    result.top = '';
    result.height = 'fit-content';
    const postBottom = getOffsetBottom(activatorRect, shifted, cover);

    if (arrow) {
      result.bottom = `${postBottom + arrow.offsetHeight / 2}px`;
      result.arrow = computeArrowPosition(
        activator,
        element,
        arrow,
        result.placement,
        posLeft,
        shifted
      );
    } else {
      result.bottom = `${postBottom}px`;
    }
  } else {
    const posTop = getOffsetTop(
      activatorRect,
      result.placement,
      element.offsetHeight,
      shifted,
      cover
    );

    result.height = '';
    result.bottom = '';
    result.top = `${posTop}px`;

    if (arrow) {
      if (placement.startsWith('bottom')) {
        result.top = `${posTop + arrow.offsetHeight / 2}px`;
      }

      result.arrow = computeArrowPosition(
        activator,
        element,
        arrow,
        result.placement,
        posLeft,
        shifted
      );
    }
  }

  return result;
}

function getOffsetBottom(activatorRect: DOMRect, shifted: number, cover: boolean): number {
  let offsetBottom = window.innerHeight - activatorRect.top + shifted;

  if (cover) {
    offsetBottom = window.innerHeight - activatorRect.bottom;
  }
  // if (window.innerHeight < offsetBottom + elementHeight) {
  //   offsetBottom -= Math.abs(window.innerHeight - offsetBottom - elementHeight);
  // }

  return offsetBottom;
}

function getOffsetTop(
  activatorRect: DOMRect,
  placement: TPopoverPosition,
  elementHeight: number,
  shifted: number,
  cover: boolean
): number {
  const posY = activatorRect.top + activatorRect.height + shifted;
  const spaceAvailable = window.innerHeight - SPACE - elementHeight;
  const minTop = SPACE;
  let offsetTop = 0;

  switch (placement) {
    case 'top':
    case 'top-left':
    case 'top-right':
      offsetTop = activatorRect.top - elementHeight - shifted;
      if (!cover) {
        if (offsetTop < minTop) {
          offsetTop = activatorRect.top + activatorRect.height - shifted;
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
          ? posY - Math.abs(window.innerHeight - posY - elementHeight)
          : posY;
      break;
    case 'left':
    case 'right':
      offsetTop = activatorRect.top + activatorRect.height / 2 - elementHeight / 2;
      break;
    case 'left-top':
    case 'right-top':
      offsetTop = activatorRect.top;
      break;
    case 'left-bottom':
    case 'right-bottom':
      offsetTop = activatorRect.top + activatorRect.height - elementHeight;
      break;
  }

  offsetTop = Math.min(spaceAvailable, offsetTop);
  offsetTop = Math.max(minTop, offsetTop);

  return offsetTop;
}

function getOffsetLeft(
  activator: HTMLElement,
  placement: TPopoverPosition,
  elementWidth: number,
  shifted: number,
  cover: boolean,
  arrow?: HTMLElement | null
): number {
  const minLeft = SPACE;
  const activatorRect = activator.getBoundingClientRect();
  const maxLeft = window.innerWidth - SPACE - elementWidth;
  const arrowWidth = arrow ? arrow.offsetWidth / 2 : 0;
  let offsetLeft = activatorRect.left - elementWidth - shifted - arrowWidth;

  switch (placement) {
    case 'left':
    case 'left-top':
    case 'left-bottom':
      if (cover) {
        offsetLeft += activatorRect.width;
      } else if (offsetLeft < SPACE) {
        // flip position to the 'right' side
        offsetLeft = activatorRect.right + shifted + arrowWidth;
      }
      break;
    case 'right':
    case 'right-top':
    case 'right-bottom':
      offsetLeft = cover
        ? activatorRect.left
        : activatorRect.right + shifted > maxLeft
          ? offsetLeft // flip position to the 'left' side
          : activatorRect.right + shifted + arrowWidth;
      break;
    case 'top':
    case 'bottom':
      const pRect = activator.parentElement?.getBoundingClientRect();
      const tw = Math.min(activatorRect.width / 2, (pRect?.width ?? activatorRect.width) / 2);
      offsetLeft = activatorRect.left + tw - elementWidth / 2;
      break;
    case 'bottom-left':
    case 'top-left':
      offsetLeft = activatorRect.left;
      break;
    case 'bottom-right':
    case 'top-right':
      offsetLeft = activatorRect.left + activatorRect.width - elementWidth;
      break;
  }

  if (['top', 'top-left', 'bottom', 'bottom-left'].includes(placement as string)) {
    // geser posisi offset-left agar tidak melampaui batas
    if (offsetLeft + elementWidth >= maxLeft + elementWidth) {
      offsetLeft = document.body.offsetHeight > window.innerHeight ? maxLeft - 15 : maxLeft - 5;
    }
  }

  return Math.max(minLeft, offsetLeft);
}

function computeArrowPosition(
  activator: HTMLElement,
  container: HTMLElement,
  arrow: HTMLElement,
  placement: TPopoverPosition,
  containerLeft: number,
  shifted: number
): TFloatingArrow {
  const activatorRect = activator.getBoundingClientRect();
  const pRect = activator.parentElement?.getBoundingClientRect();

  const result = {
    top: '',
    bottom: '',
    left: '',
  };

  const tw = Math.min(activatorRect.width / 2, (pRect?.width ?? activatorRect.width) / 2);
  const posX = activatorRect.left - containerLeft + tw - arrow.offsetWidth / 2 + 'px';
  const posY = `${(arrow.offsetHeight / 2) * -1}px`;

  if (placement.startsWith('top')) {
    result.left = posX;
    result.bottom = posY;
  } else {
    const x1 = activatorRect.left - containerLeft - arrow.offsetWidth - shifted + 'px';
    const x2 = activatorRect.right - containerLeft + shifted + 'px';

    if (placement.startsWith('bottom')) {
      result.top = posY;
    } else {
      const topY =
        container.offsetHeight < activator.offsetHeight
          ? container.offsetHeight / 2 - arrow.offsetHeight / 2
          : activatorRect.height / 2 - arrow.offsetHeight / 2;

      result.top = `${topY}px`;
    }

    result.left = placement.startsWith('bottom') ? posX : placement.startsWith('left') ? x1 : x2;
  }

  return result;
}
