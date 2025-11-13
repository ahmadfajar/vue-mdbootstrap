function getElSize(size: string | undefined | null): number {
  if (!size) {
    return 0;
  }
  const posPx = size.indexOf('px');
  if (posPx === -1) {
    return 0;
  }

  return Number(size.substring(0, posPx));
}

export function beforeEnter(element: Element) {
  const refEl: HTMLElement = element as HTMLElement;

  refEl.dataset.oldPaddingTop = refEl.style.paddingTop;
  refEl.dataset.oldPaddingBottom = refEl.style.paddingBottom;
  refEl.dataset.oldOverflow = refEl.style.overflow;
  refEl.style.paddingTop = '0';
  refEl.style.paddingBottom = '0';
  refEl.style.height = '0';
}

export function onEnter(element: Element) {
  const refEl: HTMLElement = element as HTMLElement;

  refEl.style.display = 'block';
  refEl.style.overflow = 'hidden';
  refEl.style.height =
    refEl.scrollHeight +
    getElSize(refEl.dataset.oldPaddingTop) +
    getElSize(refEl.dataset.oldPaddingBottom) +
    'px';
  refEl.style.paddingTop = refEl.dataset.oldPaddingTop || '0';
  refEl.style.paddingBottom = refEl.dataset.oldPaddingBottom || '0';
}

export function afterEnter(element: Element) {
  const refEl: HTMLElement = element as HTMLElement;

  refEl.style.display = '';
  refEl.style.height = '';
  refEl.style.overflow = refEl.dataset.oldOverflow!;
  refEl.style.paddingTop = refEl.dataset.oldPaddingTop || '0';
  refEl.style.paddingBottom = refEl.dataset.oldPaddingBottom || '0';
}

export function beforeLeave(element: Element) {
  const refEl: HTMLElement = element as HTMLElement;

  refEl.dataset.oldPaddingTop = refEl.style.paddingTop;
  refEl.dataset.oldPaddingBottom = refEl.style.paddingBottom;
  refEl.dataset.oldOverflow = refEl.style.overflow;

  refEl.style.display = 'block';
  if (refEl.scrollHeight !== 0) {
    refEl.style.height = refEl.scrollHeight + 'px';
  }
  refEl.style.overflow = 'hidden';
}

export function onLeave(element: Element) {
  const refEl: HTMLElement = element as HTMLElement;

  if (refEl.scrollHeight !== 0) {
    setTimeout(() => {
      refEl.style.height = '0';
      refEl.style.paddingTop = '0';
      refEl.style.paddingBottom = '0';
    });
  }
}

export function afterLeave(element: Element) {
  const refEl: HTMLElement = element as HTMLElement;

  refEl.style.display = 'none';
  refEl.style.height = '';
  refEl.style.overflow = refEl.dataset.oldOverflow!;
  refEl.style.paddingTop = refEl.dataset.oldPaddingTop || '0';
  refEl.style.paddingBottom = refEl.dataset.oldPaddingBottom || '0';
}
