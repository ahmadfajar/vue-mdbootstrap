import type {
    IListItem,
    IListViewProvider,
    TEmitFn,
    TListViewOptionProps,
    TRecord,
    TSpaceAround,
} from '@/types';
import Helper from '@/utils/Helper';
import type { ComponentInternalInstance, Ref } from 'vue';
import { isRef, unref } from 'vue';

class ListViewProvider implements IListViewProvider {
    private readonly _emit: TEmitFn;
    private readonly _config: Readonly<TListViewOptionProps>;
    private _items: Array<IListItem>;
    private _activeItem: IListItem | undefined;

    constructor(config: Readonly<TListViewOptionProps>, emitter: TEmitFn) {
        this._config = config;
        this._items = [];
        this._emit = emitter;
    }

    destroy(): void {
        for (const it of this._items) {
            it.destroy();
        }
        this._items = [];
    }

    get config(): Readonly<TListViewOptionProps> {
        return this._config;
    }

    get itemBorderVariant(): string | undefined {
        return this._config.itemBorderVariant;
    }

    get itemRounded(): boolean {
        return this._config.itemRounded || false;
    }

    get itemRoundedPill(): boolean {
        return this._config.itemRoundedPill || false;
    }

    get spaceAround(): TSpaceAround | undefined {
        return this._config.spaceAround;
    }

    get singleExpand(): boolean {
        return this._config.singleExpand || false;
    }

    get items(): IListItem[] {
        return this._items;
    }

    get activeItem(): IListItem | undefined {
        return this._activeItem;
    }

    set activeItem(value: IListItem | undefined) {
        this.setActiveItem(value).then();
    }

    addItem(item: IListItem): number {
        const idx = this._items.findIndex((it) => it.uid === item.uid);
        if (idx === -1) {
            return this._items.push(item);
        }

        return -1;
    }

    findItem(
        predicate: (value: IListItem, sources: IListItem[]) => boolean,
        recursive = false
    ): IListItem | undefined {
        let result: IListItem | undefined;

        for (const it of this.items) {
            const ret = predicate(it, this.items);

            if (ret) {
                result = it;
                break;
            } else if (recursive) {
                const tmpObj = this.iterateChildren(predicate, it, recursive, true);

                if (tmpObj != null) {
                    result = tmpObj;
                    break;
                }
            }
        }

        return result;
    }

    private iterateChildren(
        callbackFn: (value: IListItem, sources: IListItem[]) => unknown,
        source: IListItem,
        recursive: boolean,
        stopImmediately: boolean
    ): IListItem | undefined {
        let result: IListItem | undefined;

        if (source.hasChild()) {
            for (const it of source.children) {
                const ret = callbackFn(it, source.children);

                if (ret) {
                    result = it;
                    if (stopImmediately) {
                        return result;
                    }
                } else if (recursive) {
                    const tmpObj = this.iterateChildren(callbackFn, it, recursive, stopImmediately);

                    if (tmpObj != null) {
                        result = tmpObj;
                        if (stopImmediately) {
                            return result;
                        }
                    }
                }
            }
        }

        return result;
    }

    execAction(
        actionFn: (value: IListItem, sources: IListItem[]) => unknown,
        recursive = false,
        stopImmediately = false
    ): Promise<void> {
        return new Promise((resolve) => {
            for (const it of this.items) {
                const ret = actionFn(it, this.items);

                if (ret && stopImmediately) {
                    break;
                } else if (recursive) {
                    const retObj = this.iterateChildren(actionFn, it, recursive, stopImmediately);

                    if (retObj != null && stopImmediately) {
                        break;
                    }
                }
            }

            resolve();
        });
    }

    removeItem(item: IListItem): void {
        const idx = this._items.findIndex((it) => it.uid === item.uid);
        if (idx > -1) {
            this._items[idx].destroy();
            this._items.splice(idx, 1);
        }
    }

    async setActiveItem(value?: IListItem): Promise<void> {
        if (value == null) {
            this._activeItem = undefined;
            this._emit('update:modelValue', undefined);
            return;
        }
        if (this.config.individualState === true && value.tag === 'BsListTile') {
            return;
        }

        await this.execAction(
            (it) => {
                it.setActive(it.uid === value.uid);
                if (it.uid === value.uid) {
                    this.triggerEvent(it);
                }
            },
            true,
            false
        );
    }

    private triggerEvent(newItem: IListItem) {
        this._emit('change', newItem, this.activeItem);
        this._activeItem = newItem;
        this._emit('update:modelValue', newItem);
    }

    collapse(item: IListItem): void {
        for (const child of item.children) {
            this.collapse(child);
        }

        if (item.tag === 'BsListNav') {
            Helper.defer(() => {
                this.setExposedValue(item.component, 'collapsing', true);
                Helper.defer(() => {
                    this.setExposedValue(item.component, 'collapsing', false);
                    this.setExposedValue(item.component, 'expanded', false);
                }, 200);
            }, 100);
        } else if (item.tag === 'BsListNavItem') {
            this.setExposedValue(item.component, 'expanded', false);
            if (!item.hasChild()) {
                item.setRippleOff(true);
            }
        }
    }

    private setExposedValue<T>(
        component: ComponentInternalInstance,
        property: string,
        value: T
    ): void {
        if (isRef((component.exposed as TRecord)[property])) {
            ((component.exposed as TRecord)[property] as Ref<T>).value = value;
        } else {
            (component.exposed as TRecord)[property] = value;
        }
    }

    private expandItem(item: IListItem): void {
        this.setExposedValue(item.component, 'expanded', true);
        item.setRippleOff(false);

        if (item.hasChild()) {
            this.setExposedValue(item.children[0].component, 'expanded', true);
            item.children[0].children.forEach((it) => it.setRippleOff(false));
        }
    }

    expand(item: IListItem): void {
        const cmp = item.component;
        if (
            item.hasChild() &&
            ['BsListNav', 'BsListNavItem'].includes(item.tag) &&
            !unref((cmp.exposed as TRecord).expanded)
        ) {
            if (this.singleExpand) {
                if (item.parent) {
                    item.parent.children.forEach((it) => {
                        if (it.uid !== item.uid) {
                            this.collapse(it);
                        }
                    });
                }
            }
            this.expandItem(item);
        }
    }
}

export default ListViewProvider;
