import type { ComponentInternalInstance, Ref } from 'vue';
import { isRef } from 'vue';
import type { IListItem, TEmitFn, TRecord } from '../../../types';
import Helper from '../../../utils/Helper';


class ListItem implements IListItem {
    public readonly uid: string;
    public readonly tag: string;
    private readonly _component: ComponentInternalInstance;
    private readonly _emit: TEmitFn;
    private _children: Array<IListItem>;
    private _parent: IListItem | undefined;

    constructor(
        uid: string, tag: string,
        component: ComponentInternalInstance,
        emit: TEmitFn
    ) {
        this.uid = uid;
        this.tag = tag;
        this._component = component;
        this._emit = emit;
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
        const idx = this._children.findIndex(it => it.uid === child.uid);
        if (idx === -1) {
            return this._children.push(child);
        }

        return -1;
    }

    removeChild(id: string): void {
        const idx = this._children.findIndex(it => it.uid === id);
        if (idx > -1) {
            this._children[idx].destroy();
            this._children.splice(idx, 1);
        }
    }

    hasChild(): boolean {
        return this.children.length > 0
    }

    fireEvent(name: string, ...args: unknown[]): void {
        this._emit(name, args);
    }

    setActive(value: boolean): void {
        this.component.props.active = value;

        if (!Helper.isEmpty(this.component.exposed)) {
            if (isRef((<TRecord>this.component.exposed).isActive)) {
                (<Ref<boolean>>(<TRecord>this.component.exposed).isActive).value = value;
            } else {
                (<TRecord>this.component.exposed).isActive = value;
            }
        }

        this.fireEvent('update:active', value);
    }

    setRippleOff(value: boolean): void {
        this.component.props.rippleOff = value;
    }
}

export default ListItem;
