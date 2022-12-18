import type {IListItem, IListViewProvider, TEmitFn, TListViewOptionProps, TRecord, TSpaceAround} from "../../../types";
import Helper from "../../../utils/Helper";


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
        this.setActiveItem(value);
    }

    addItem(item: IListItem): number {
        const idx = this._items.findIndex(it => it.uid === item.uid);
        if (idx === -1) {
            return this._items.push(item);
        }

        return -1;
    }

    findItem(predicate: (value: IListItem, sources: IListItem[]) => boolean,
             recursive = false): IListItem | undefined {
        for (const it of this.items) {
            const ret = predicate(it, this.items);

            if (ret) {
                return it;
            } else if (recursive) {
                const retObj = this.iterateChildren(predicate, it, recursive, true);

                if (retObj !== undefined) {
                    return retObj;
                }
            }
        }

        return undefined;
    }

    private iterateChildren(callbackFn: (value: IListItem, sources: IListItem[]) => unknown,
                            source: IListItem, recursive: boolean, stopImmediately: boolean
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

                    if (tmpObj !== undefined) {
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

    execAction(actionFn: (value: IListItem, sources: IListItem[]) => unknown,
               recursive = false, stopImmediately = false): void {
        for (const it of this.items) {
            const ret = actionFn(it, this.items);

            if (ret && stopImmediately) {
                return;
            } else if (recursive) {
                const retObj = this.iterateChildren(actionFn, it, recursive, stopImmediately);

                if (retObj !== undefined && stopImmediately) {
                    return;
                }
            }
        }
    }

    removeItem(item: IListItem): void {
        const idx = this._items.findIndex(it => it.uid === item.uid);
        if (idx > -1) {
            this._items[idx].destroy();
            this._items.splice(idx, 1);
        }
    }

    setActiveItem(value?: IListItem): void {
        if (value === undefined) {
            this._activeItem = undefined;
            this._emit("update:modelValue", undefined);
            return;
        }
        if (this.config.individualState === true && value.tag === "BsListTile") {
            return;
        }

        this.execAction((it) => {
            it.setActive(it.uid === value.uid);
            if (it.uid === value.uid) {
                this.triggerEvent(it);
            }
        }, true, false);
    }

    private triggerEvent(newItem: IListItem) {
        this._emit("change", newItem, this.activeItem);
        this._activeItem = newItem;
        this._emit("update:modelValue", newItem);
    }

    collapse(item: IListItem): void {
        for (const child of item.children) {
            this.collapse(child);
        }

        if (item.tag === "BsListNav") {
            (<TRecord>item.component.exposed).collapsing = true;
            Helper.defer(() => {
                (<TRecord>item.component.exposed).collapsing = false;
                (<TRecord>item.component.exposed).expanded = false;
            }, 300);
        } else if (item.tag === "BsListNavItem") {
            (<TRecord>item.component.exposed).expanded = false;
        }
    }

    expand(item: IListItem): void {
        const cmp = item.component;

        if (item.hasChild() && ["BsListNav", "BsListNavItem"].includes(item.tag) && !(<TRecord>cmp.exposed).expanded) {
            if (this.singleExpand) {
                this.execAction((source) => {
                    // Iterate root-item and check if root-item contains the provided item.
                    const child = this.iterateChildren(
                        (it) => it.uid === item.uid,
                        source, true, true
                    );

                    if (child) {
                        // If the root-item contains the provided item then return immediately.
                        return child;
                    } else {
                        this.collapse(source);
                    }
                }, false, false);
            }

            (<TRecord>cmp.exposed).expanded = true;
        }
    }
}

export default ListViewProvider;
