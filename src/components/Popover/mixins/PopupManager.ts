import { clearAllBodyScrollLocks, disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import type { ComponentInternalInstance, Ref } from 'vue';
import { isServer } from '../../../mixins/CommonApi';
import type { TPopupOptions } from '../types';

declare type TPopupItem = {
    target: ComponentInternalInstance;
    props: Readonly<TPopupOptions>;
    active: Ref<boolean>;
};

const PopupManager = {
    items: [] as TPopupItem[],
    locked: false,
    allowScrolling() {
        const body = document.getElementsByTagName('body')[0];

        enableBodyScroll(body);
        clearAllBodyScrollLocks();
        this.locked = false;
    },
    preventScrolling() {
        if (this.locked) {
            return;
        }
        const body = document.getElementsByTagName('body')[0];

        disableBodyScroll(body, {
            reserveScrollBarGap: true,
        });
        this.locked = true;
    },
    findItem(instance: ComponentInternalInstance): number {
        return this.items.findIndex((el) => el.target === instance);
    },
    add(instance: ComponentInternalInstance, props: Readonly<TPopupOptions>, active: Ref<boolean>) {
        // prevent duplicate item
        if (!instance || this.findItem(instance) > -1) {
            return;
        }
        // if not exists, manage popup instance
        if (props.overlay) {
            this.preventScrolling();
        }
        this.items.push({ target: instance, props: props, active: active });
    },
    remove(instance: ComponentInternalInstance) {
        const index = this.findItem(instance);
        if (index === -1) {
            return;
        }
        const item = this.items[index];
        if (item.props.overlay) {
            this.allowScrolling();
        }
        this.items.splice(index, 1);
    },
    closePopover(
        instance: ComponentInternalInstance | null,
        isActive: Ref<boolean>,
        message: string
    ) {
        if (!instance || !isActive.value) {
            return;
        }

        isActive.value = false;
        instance.emit('update:open', false);
        instance.emit('close', message);
        this.remove(instance);
    },
};

if (!isServer) {
    (document as Document).addEventListener('keydown', (evt: KeyboardEvent) => {
        if (PopupManager.items.length === 0 || (evt.key && evt.key.toLowerCase() !== 'escape')) {
            return;
        }
        const popupItem = PopupManager.items[PopupManager.items.length - 1];

        if (popupItem.props.escClose) {
            PopupManager.closePopover(popupItem.target, popupItem.active, 'Esc pressed.');
        }
    });
}

export default PopupManager;
