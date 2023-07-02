import type { ComponentInternalInstance, Ref } from 'vue';
import type { TPopupOptions } from './index';

declare type TPopupItem = {
    target: ComponentInternalInstance;
    props: Readonly<TPopupOptions>;
    active: Ref<boolean>;
};

export declare const PopupManager: {
    items: TPopupItem[];
    locked: boolean;
    allowScrolling(): void;
    add(instance: ComponentInternalInstance, props: Readonly<TPopupOptions>, active: Ref<boolean>): void;
    findItem(instance: ComponentInternalInstance): number;
    preventScrolling(): void;
    remove(instance: ComponentInternalInstance): void;
    closePopover(instance: ComponentInternalInstance | null, isActive: Ref<boolean>, message: string): void;
};
