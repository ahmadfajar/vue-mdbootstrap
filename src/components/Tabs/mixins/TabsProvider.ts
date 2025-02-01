import type {
    TAlignment,
    TEmitFn,
    TPlacementPosition,
    TRecord,
    TTabItemOptionProps,
    TTabsBaseProps,
    TTabsVariant,
} from '@/types';
import Helper from '@/utils/Helper';
import type { ComponentInternalInstance, Ref, ShallowReactive } from 'vue';
import { isRef, shallowReactive } from 'vue';

/**
 * Class TabsProvider which is used for BsTab's component dependency injection.
 *
 * @author Ahmad Fajar
 * @since  22/11/2022, modified: 01/02/2025 16:18
 */
class TabsProvider {
    private _activeTab: ComponentInternalInstance | undefined;
    private _activeTabIndex: number | undefined;
    private _props: TTabsBaseProps;
    private readonly _emit: TEmitFn;
    public tabItems: ShallowReactive<ComponentInternalInstance[]>;
    public tabPanels: ShallowReactive<ComponentInternalInstance[]>;

    constructor(tabConfig: Readonly<TTabsBaseProps>, emitter: TEmitFn, activeTab?: number) {
        this._props = tabConfig;
        this._activeTab = undefined;
        this._activeTabIndex = activeTab;
        this._emit = emitter;

        this.tabItems = shallowReactive<ComponentInternalInstance[]>([]);
        this.tabPanels = shallowReactive<ComponentInternalInstance[]>([]);
    }

    get activeTab(): ComponentInternalInstance | undefined {
        return this._activeTab;
    }

    get activeTabIndex(): number | undefined {
        return this._activeTabIndex;
    }

    get alignment(): TAlignment {
        return this._props.alignment || 'start';
    }

    get contentTransition(): string {
        return this._props.contentTransition || 'fade';
    }

    get iconPosition(): TPlacementPosition {
        return this._props.iconPosition || 'left';
    }

    get iconSize(): number {
        return (this._props.iconSize as number | undefined) || 24;
    }

    get tabClass(): string | string[] | undefined {
        return this._props.tabClass;
    }

    get tabPosition(): TPlacementPosition | undefined {
        return this._props.tabPosition;
    }

    get variant(): TTabsVariant | string | undefined {
        return this._props.variant;
    }

    /**
     * Register a TabIem.
     *
     * @param {ComponentInternalInstance} item The TabIem item
     * @returns {number} The TabIem index position
     */
    registerTabItem(item: ComponentInternalInstance): number {
        return this.tabItems.push(item);
    }

    /**
     * Register a TabPanel.
     *
     * @param {ComponentInternalInstance} item The TabPanel item
     * @returns {number} The TabPanel index position
     */
    registerTabPanel(item: ComponentInternalInstance): number {
        return this.tabPanels.push(item);
    }

    /**
     * Unregister all the TabItems and TabPanels.
     *
     * @returns {void}
     */
    unRegisterAll(): void {
        this.tabItems = [];
        this.tabPanels = [];
    }

    /**
     * Unregister the TabItem and TabPanel.
     *
     * @param {string|number} key The tab index position or tab ID.
     * @returns {void}
     */
    unRegisterTab(key: string | number): void {
        if (Helper.isNumber(key)) {
            this.tabItems.splice(key, 1);
            this.tabPanels.splice(key, 1);
        } else {
            let idx = this.tabPanels.findIndex(
                (el) => (el.props as TTabItemOptionProps).id === key
            );
            if (idx === -1) {
                idx = this.tabItems.findIndex((el) => (el.props as TTabItemOptionProps).id === key);
            }

            this.tabItems.splice(idx, 1);
            this.tabPanels.splice(idx, 1);
        }
    }

    /**
     * Set the active tab.
     *
     * @param {string|number} key The tab index position or tab ID.
     * @returns {void}
     */
    setActiveTab(key: string | number | null | undefined): void {
        if (key == null) {
            this._activeTab = undefined;
            this._activeTabIndex = undefined;
            return;
        }

        this.tabItems.forEach((el, idx) => {
            const pid = (el.props as TTabItemOptionProps).id;

            if (Helper.isNumber(key) && key === idx) {
                (el.props as TTabItemOptionProps).active = true;
            } else {
                (el.props as TTabItemOptionProps).active =
                    Helper.isString(key) && pid === `tabItem-${key}`;
            }
        });
        this.tabPanels.forEach((el: ShallowReactive<ComponentInternalInstance>, idx) => {
            const pid = (el.props as TTabItemOptionProps).id;

            if ((Helper.isNumber(key) && key === idx) || (Helper.isString(key) && key === pid)) {
                (el.props as TTabItemOptionProps).active = true;

                if (isRef((el.exposed as TRecord).isActive)) {
                    ((el.exposed as TRecord).isActive as Ref<boolean>).value = true;
                } else {
                    (el.exposed as TRecord).isActive = true;
                }

                this.triggerEvent(el, idx);
            } else {
                (el.props as TTabItemOptionProps).active = false;

                if (isRef((el.exposed as TRecord).isActive)) {
                    ((el.exposed as TRecord).isActive as Ref<boolean>).value = false;
                } else {
                    (el.exposed as TRecord).isActive = false;
                }
            }
        });
    }

    private triggerEvent(tab: ComponentInternalInstance, index: number) {
        this._emit('change', tab, this.activeTab, index, this.activeTabIndex);
        this._activeTab = tab;
        this._activeTabIndex = index;
        this._emit('update:model-value', index);
    }
}

export default TabsProvider;
