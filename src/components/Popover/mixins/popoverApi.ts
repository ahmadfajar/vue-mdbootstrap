import type {ComponentInternalInstance, Ref} from "vue";
import type {TPopoverOptionProps, TPopoverPosition} from "../types";
import Helper from "../../../utils/Helper";
import PopupManager from "./PopupManager";

const SPACE = 8;

function shiftedSpace(value?: string | number): number {
    return Helper.isNumber(value)
        ? <number>value
        : (!value || isNaN(parseInt(<string>value, 10)) ? 0 : parseInt(<string>value, 10))
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

    switch (placement) {
        case "left":
        case "left-top":
        case "left-bottom":
            offsetLeft = activatorRect.left - width - shift;
            if (cover) {
                offsetLeft += activatorRect.width;
            } else if (offsetLeft < SPACE) {
                offsetLeft = activatorRect.left + activatorRect.width + shift;
            }
            break;
        case "right":
        case "right-top":
        case "right-bottom":
            offsetLeft = cover
                ? activatorRect.left
                : activatorRect.left + activatorRect.width > maxLeft
                    ? activatorRect.left - width - shift
                    : activatorRect.left + activatorRect.width + shift;
            break;
        case "top":
        case "bottom":
            offsetLeft = activatorRect.left + activatorRect.width / 2 - width / 2;
            break;
        case "bottom-left":
        case "top-left":
            offsetLeft = activatorRect.left;
            break;
        case "bottom-right":
        case "top-right":
            offsetLeft = activatorRect.left + activatorRect.width - width;
            break;
    }

    return offsetLeft;
}

function getPopoverTopPosition(
    activatorRect: DOMRect,
    placement: TPopoverPosition,
    height: number,
    shift: number,
    cover: boolean
): number {
    let offsetTop = 0;
    const maxTop = window.innerHeight - SPACE - height;
    const minTop = SPACE;

    switch (placement) {
        case "top":
        case "top-left":
        case "top-right":
            offsetTop = activatorRect.top - height - shift;
            if (!cover) {
                if (offsetTop < minTop) {
                    offsetTop = activatorRect.top + activatorRect.height - shift;
                }
            } else {
                offsetTop += activatorRect.height;
            }
            break;
        case "bottom":
        case "bottom-left":
        case "bottom-right":
            offsetTop = cover
                ? activatorRect.top
                : activatorRect.top + activatorRect.height + shift > maxTop
                    ? activatorRect.top - height - shift
                    : activatorRect.top + activatorRect.height + shift;
            break;
        case "left":
        case "right":
            offsetTop = activatorRect.top + activatorRect.height / 2 - height / 2;
            break;
        case "left-top":
        case "right-top":
            offsetTop = activatorRect.top;
            break;
        case "left-bottom":
        case "right-bottom":
            offsetTop = activatorRect.top + activatorRect.height - height;
            break;
    }
    offsetTop = Math.min(maxTop, offsetTop);
    offsetTop = Math.max(minTop, offsetTop);

    return offsetTop;
}

export function useSetPopoverPosition(
    popoverRef: Ref<Element | null>,
    instance: ComponentInternalInstance | null,
    props: Readonly<TPopoverOptionProps>,
    actualPlacement: Ref<string | undefined>,
    isActive: Ref<boolean>,
): void {
    if (!popoverRef.value || !instance || !isActive.value || !props.trigger) {
        return;
    }

    const popoverEl = <HTMLElement>popoverRef.value;
    const activatorEl = Helper.isString(props.trigger) ? document.querySelector(<string>props.trigger) : <Element>props.trigger;

    if (activatorEl) {
        const elRect = activatorEl.getBoundingClientRect();
        if (elRect.top < -elRect.height || elRect.top > window.innerHeight) {
            usePopoverClose(instance, isActive, "Activator overflow.");
            PopupManager.remove(instance);
        }

        const shift = shiftedSpace(props.space);
        const maxTop = window.innerHeight - SPACE - popoverEl.offsetHeight;
        popoverEl.style.top = getPopoverTopPosition(
            elRect, <TPopoverPosition>props.placement,
            popoverEl.offsetHeight, shift, <boolean>props.cover
        ) + "px";
        popoverEl.style.left = getPopoverLeftPosition(
            elRect, <TPopoverPosition>props.placement,
            popoverEl.offsetWidth, shift, <boolean>props.cover
        ) + "px";

        if (props.placement?.startsWith("bottom") && maxTop < (elRect.top + elRect.height + shift)) {
            actualPlacement.value = props.placement.replace("bottom", "top");
        } else {
            actualPlacement.value = props.placement;
        }
        PopupManager.add(instance, props, isActive);
    }
}

export function usePopoverClose(
    instance: ComponentInternalInstance | null,
    isActive: Ref<boolean>,
    message: string,
): void {
    if (!instance || !isActive) {
        return;
    }

    isActive.value = false;
    instance.emit("update:open", false);
    instance.emit("close", message);
}
