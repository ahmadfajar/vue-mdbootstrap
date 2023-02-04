import type {ComponentInternalInstance, Ref} from "vue";
import type {TPopupOptions} from "../types";
import {clearAllBodyScrollLocks, disableBodyScroll, enableBodyScroll} from "body-scroll-lock";
import {usePopoverClose} from "./popoverApi";

declare type TPopupItem = {
    target: ComponentInternalInstance;
    props: Readonly<TPopupOptions>;
    active: Ref<boolean>;
}

const PopupManager = {
    items: [] as Array<TPopupItem>,
    locked: false,
    allowScrolling() {
        const body = document.getElementsByTagName("body")[0];

        enableBodyScroll(body);
        clearAllBodyScrollLocks();
        this.locked = false;
    },
    add(instance: ComponentInternalInstance, props: Readonly<TPopupOptions>, active: Ref<boolean>) {
        // prevent duplicate item
        if (!instance || this.find(instance) > -1) {
            return;
        }
        // if not exists, manage popup instance
        if (props.overlay) {
            this.preventScrolling();
        }
        this.items.push({target: instance, props: props, active: active});
    },
    find(instance: ComponentInternalInstance): number {
        return this.items.findIndex((el) => el.target === instance);
    },
    preventScrolling() {
        if (this.locked) {
            return;
        }
        const body = document.getElementsByTagName("body")[0];

        disableBodyScroll(body, {
            reserveScrollBarGap: true
        });
        this.locked = true;
    },
    remove(instance: ComponentInternalInstance) {
        const index = this.find(instance);
        if (index === -1) {
            return;
        }
        const item = this.items[index];
        if (item.props.overlay) {
            this.allowScrolling();
        }
        this.items.splice(index, 1);
    },
};

(<Document>document).addEventListener("keydown", (evt: KeyboardEvent) => {
    if (PopupManager.items.length === 0 || (evt.key && evt.key.toLowerCase() !== "escape")) {
        return;
    }
    const popupItem = PopupManager.items[PopupManager.items.length - 1];

    if (popupItem.props.escClose) {
        usePopoverClose(popupItem.target, popupItem.active, "Esc pressed.");
    }
});

export default PopupManager;
