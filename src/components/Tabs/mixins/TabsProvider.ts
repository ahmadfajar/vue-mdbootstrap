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
import type { ComponentInternalInstance, Ref } from 'vue';
import { isRef } from 'vue';

/**
 * Class TabsProvider which is used for BsTab's component dependency injection.
 *
 * @author Ahmad Fajar
 * @since  22/11/2022, modified: 18/08/2024 19:57
 */
class TabsProvider {
    private _tabItems: ComponentInternalInstance[];
    private _tabPanels: ComponentInternalInstance[];
    private _activeTab: ComponentInternalInstance | undefined;
    private _activeTabIndex: number | undefined;
    private _props: TTabsBaseProps;
    private readonly _emit: TEmitFn;

    constructor(tabConfig: Readonly<TTabsBaseProps>, emitter: TEmitFn, activeTab?: number) {
        this._props = tabConfig;
        this._tabItems = [];
        this._tabPanels = [];
        this._activeTabIndex = activeTab;
        this._emit = emitter;
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

    get tabItems(): ComponentInternalInstance[] {
        return this._tabItems;
    }

    get tabPanels(): ComponentInternalInstance[] {
        return this._tabPanels;
    }

    /**
     * Register a TabIem.
     *
     * @param {ComponentInternalInstance} item The TabIem item
     * @returns {number} The TabIem index position
     */
    registerTabItem(item: ComponentInternalInstance): number {
        return this._tabItems.push(item);
    }

    /**
     * Register a TabPanel.
     *
     * @param {ComponentInternalInstance} item The TabPanel item
     * @returns {number} The TabPanel index position
     */
    registerTabPanel(item: ComponentInternalInstance): number {
        return this._tabPanels.push(item);
    }

    /**
     * Unregister all the TabItems and TabPanels.
     *
     * @returns {void}
     */
    unRegisterAll(): void {
        this._tabItems = [];
        this._tabPanels = [];
    }

    /**
     * Unregister the TabItem and TabPanel.
     *
     * @param {string|number} key The tab index position or tab ID.
     * @returns {void}
     */
    unRegisterTab(key: string | number): void {
        if (Helper.isNumber(key)) {
            this._tabItems.splice(key, 1);
            this._tabPanels.splice(key, 1);
        } else {
            let idx = this._tabPanels.findIndex(
                (el) => (el.props as TTabItemOptionProps).id === key
            );
            if (idx === -1) {
                idx = this._tabItems.findIndex(
                    (el) => (el.props as TTabItemOptionProps).id === key
                );
            }

            this._tabItems.splice(idx, 1);
            this._tabPanels.splice(idx, 1);
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
        this.tabPanels.forEach((el, idx) => {
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
            // console.log(`tabPane-${pid}:active`, (<TTabItemOptionProps>el.props).active);
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
