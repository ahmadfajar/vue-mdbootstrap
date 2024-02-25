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
import { Teleport, h, mergeProps, nextTick, vShow, withDirectives } from 'vue';
import { ClickOutside, Resize, Scroll } from '../../../directives';
import { useRenderTransition } from '../../../mixins/CommonApi';
import { isChildOf, isSVGElement } from '../../../mixins/DomHelper';
import type { TBsPopover, TPopoverOptionProps, TPopoverPosition, TRecord } from '../../../types';
import Helper from '../../../utils/Helper';
import { BsOverlay } from '../../Animation';
import PopupManager from './PopupManager';

const SPACE = 8;

function shiftedSpace(value?: string | number): number {
    return Helper.isNumber(value)
        ? <number>value
        : !value || isNaN(parseInt(<string>value, 10))
        ? 0
        : parseInt(<string>value, 10);
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

    return Math.max(minLeft, offsetLeft);
}

function getPopoverTopPosition(
    activatorRect: DOMRect,
    placement: TPopoverPosition,
    height: number,
    shift: number,
    cover: boolean
): number {
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
                : activatorRect.top + activatorRect.height + shift > spaceAvailable
                ? activatorRect.top - height - shift
                : activatorRect.top + activatorRect.height + shift;
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
    placement: TPopoverPosition,
    height: number,
    shift: number,
    cover: boolean
): number {
    let offsetBottom = 0;

    switch (placement) {
        case 'top':
        case 'top-left':
        case 'top-right':
            offsetBottom = window.innerHeight - activatorRect.top - shift + 4;
            if (cover) {
                offsetBottom += activatorRect.height / 2 - height / 2;
            }
            break;
        case 'left-top':
        case 'right-top':
            offsetBottom = window.innerHeight - activatorRect.top - shift + 4;
            break;
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
        ? document.querySelector(<string>props.trigger)
        : <Element>props.trigger;

    if (activatorEl) {
        const elRect = activatorEl.getBoundingClientRect();
        if (elRect.top < -elRect.height || elRect.top > window.innerHeight) {
            useClosePopover(instance, isActive, 'Activator overflow.');
        }

        const shift = shiftedSpace(props.space);
        const spaceAvailable = window.innerHeight - SPACE - popoverEl.offsetHeight;

        if (
            props.placement?.startsWith('bottom') &&
            spaceAvailable < elRect.top + elRect.height + shift
        ) {
            actualPlacement.value = props.placement.replace('bottom', 'top') as TPopoverPosition;
        } else {
            actualPlacement.value = props.placement;
        }

        if (actualPlacement.value?.includes('top')) {
            popoverEl.style.top = '';
            popoverEl.style.bottom =
                getPopoverBottomPosition(
                    elRect,
                    actualPlacement.value,
                    popoverEl.offsetHeight,
                    shift,
                    <boolean>props.cover
                ) + 'px';
            popoverEl.style.height = 'fit-content';
        } else {
            popoverEl.style.bottom = '';
            popoverEl.style.height = '';
            popoverEl.style.top =
                getPopoverTopPosition(
                    elRect,
                    <TPopoverPosition>props.placement,
                    popoverEl.offsetHeight,
                    shift,
                    <boolean>props.cover
                ) + 'px';
        }

        popoverEl.style.left =
            getPopoverLeftPosition(
                elRect,
                <TPopoverPosition>props.placement,
                popoverEl.offsetWidth,
                shift,
                <boolean>props.cover
            ) + 'px';

        PopupManager.add(instance, props, isActive);
    }
}

export function useClosePopover(
    instance: ComponentInternalInstance | null,
    isActive: Ref<boolean>,
    message: string
): void {
    if (!instance || !isActive.value) {
        return;
    }

    isActive.value = false;
    instance.emit('update:open', false);
    instance.emit('close', message);
    PopupManager.remove(instance);
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
    const thisSetPosition = () => {
        nextTick().then(() =>
            useSetPopoverPosition(instance.value, thisProps, popover, actualPlacement, isActive)
        );
    };
    const thisOnClickOutside = (evt: Event) => {
        onPopoverClickOutside(thisProps, instance.value, isActive, evt);
    };

    return h(Teleport, { to: 'body' }, [
        h(BsOverlay, {
            // @ts-ignore
            show: (props.overlay && isActive.value) as Prop<boolean>,
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
        ? document.querySelector(<string>props.trigger)
        : <Element>props.trigger;
    let target: HTMLElement | null | undefined = <HTMLElement | null>evt.target;

    if (activatorEl && activatorEl.contains(<Node>target)) {
        return;
    }
    if (activatorEl && isSVGElement(target)) {
        target = target?.parentElement;

        while (isSVGElement(target)) {
            target = target?.parentElement;
        }
    }
    if (isChildOf(activatorEl, target)) {
        return;
    }

    useClosePopover(instance, isActive, 'Clicked outside.');
}
