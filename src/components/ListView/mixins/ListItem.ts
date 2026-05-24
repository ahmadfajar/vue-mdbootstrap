import type { ListTileEventEmitter } from '@/components/ListView/mixins/listTileApi.ts';
import type { ObjectBase } from '@/model';
import Helper from '@/utils/Helper.ts';
import type { ComponentInternalInstance, EmitFn, Ref } from 'vue';
import { isRef } from 'vue';

export declare interface IListItem extends ObjectBase {
  readonly uid: string;
  readonly tag: string;
  readonly component: ComponentInternalInstance;
  readonly children: Array<IListItem>;

  /**
   * Get/Set the parent item.
   */
  get parent(): IListItem | undefined;

  set parent(value: IListItem | undefined);

  /**
   * Add or register an item to this ListItem registry.
   *
   * @param child The item to register.
   * @returns The registry new size or `-1` if the item already exists.
   */
  addChild(child: IListItem): number;

  /**
   * Remove an item from this ListItem registry.
   *
   * @param id The item identifier.
   */
  removeChild(id: string): void;

  /**
   * Check if this ListItem registry size is greater than zero.
   */
  hasChild(): boolean;

  /**
   * Emit an event from a ListItem.
   * @param name The event name
   * @param args The event arguments
   */
  fireEvent(name: keyof ListTileEventEmitter, ...args: unknown[]): void;
  fireEvent(name: string, ...args: unknown[]): void;

  setActive(value: boolean): void;

  setRippleOff(value: boolean): void;
}

export class ListItem implements IListItem {
  public readonly uid: string;
  public readonly tag: string;
  private readonly _component: ComponentInternalInstance;
  private readonly _emit: EmitFn;
  private _children: Array<IListItem>;
  private _parent: IListItem | undefined;

  constructor(uid: string, tag: string, component: ComponentInternalInstance, emitter: EmitFn) {
    this.uid = uid;
    this.tag = tag;
    this._component = component;
    this._emit = emitter;
    this._children = [];
  }

  destroy(): void {
    for (const child of this.children) {
      child.destroy();
    }

    this._children = [];
  }

  get component(): ComponentInternalInstance {
    return this._component;
  }

  get parent(): IListItem | undefined {
    return this._parent;
  }

  set parent(value: IListItem | undefined) {
    this._parent = value;
  }

  get children(): Array<IListItem> {
    return this._children;
  }

  addChild(child: IListItem): number {
    const idx = this._children.findIndex((it) => it.uid === child.uid);
    if (idx === -1) {
      return this._children.push(child);
    }

    return -1;
  }

  removeChild(id: string): void {
    const idx = this._children.findIndex((it) => it.uid === id);
    if (idx > -1) {
      this._children[idx]?.destroy();
      this._children.splice(idx, 1);
    }
  }

  hasChild(): boolean {
    return this.children.length > 0;
  }

  fireEvent(name: keyof ListTileEventEmitter | string, ...args: unknown[]): void {
    this._emit(name as string, ...args);
  }

  setActive(value: boolean): void {
    this.component.props.active = value;

    if (!Helper.isEmpty(this.component.exposed)) {
      if (isRef(this.component.exposed.isActive)) {
        (this.component.exposed.isActive as Ref<boolean>).value = value;
      } else {
        this.component.exposed.isActive = value;
      }
    }

    this.fireEvent('update:active', value);
  }

  setRippleOff(value: boolean): void {
    this.component.props.rippleOff = value;
  }
}
