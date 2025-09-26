import { ComponentInternalInstance, Ref } from 'vue';
import { TPopupOptions } from './index';

declare type TPopupItem = {
  target: ComponentInternalInstance;
  props: Readonly<TPopupOptions>;
  active: Ref<boolean>;
};

export declare const PopupManager: {
  items: TPopupItem[];
  locked: boolean;
  allowScrolling(): void;
  preventScrolling(): void;
  findItem(instance: ComponentInternalInstance): number;
  add(
    instance: ComponentInternalInstance,
    props: Readonly<TPopupOptions>,
    active: Ref<boolean>
  ): void;
  remove(instance: ComponentInternalInstance): void;
  closePopover(
    instance: ComponentInternalInstance | null,
    isActive: Ref<boolean>,
    message: string
  ): void;
};
