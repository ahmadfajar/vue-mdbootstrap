import {isRef} from "vue";
import type {ComponentInternalInstance, Ref} from "vue";
import type {TEmitFn, TListViewOptionProps, TRecord, TSpaceAround} from "../../../types";
import Helper from "../../../utils/Helper";


class ListViewProvider {
    private readonly _config: Readonly<TListViewOptionProps>;
    private _items: Array<ComponentInternalInstance>;
    private _activeItem: ComponentInternalInstance | undefined;
    private readonly _emit: TEmitFn;

    constructor(config: Readonly<TListViewOptionProps>, emitter: TEmitFn) {
        this._config = config;
        this._items = [];
        this._emit = emitter;
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

    get items(): ComponentInternalInstance[] {
        return this._items;
    }

    get activeItem(): ComponentInternalInstance | undefined {
        return this._activeItem;
    }

    set activeItem(value: ComponentInternalInstance | undefined) {
        this.setActiveItem(value);
    }

    addItem(item: ComponentInternalInstance): number {
        return this._items.push(item);
    }

    removeItem(item: ComponentInternalInstance): void {
        const idx = this._items.findIndex(it => it.uid === item.uid);
        if (idx > -1) {
            this._items.splice(idx, 1);
        }
    }

    removeAll(): void {
        this._items = [];
    }

    setActiveItem(value: ComponentInternalInstance | undefined): void {
        if (value === undefined) {
            this._activeItem = undefined;
            this._emit("update:modelValue", undefined);
            return;
        }

        this.items.forEach(it => {
            it.props.active = (it.uid === value.uid);

            if (!Helper.isEmpty(it.exposed)) {
                if (isRef((<TRecord>it.exposed).isActive)) {
                    (<Ref<boolean>>(<TRecord>it.exposed).isActive).value = (it.uid === value.uid);
                } else {
                    (<TRecord>it.exposed).isActive = (it.uid === value.uid);
                }
            }
            if (it.uid === value.uid) {
                this.triggerEvent(it);
            }
        });
    }

    private triggerEvent(newItem: ComponentInternalInstance) {
        this._emit("change", newItem, this.activeItem);
        this._activeItem = newItem;
        this._emit("update:modelValue", newItem);
    }
}

export default ListViewProvider;
