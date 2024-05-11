import {
    AllowedComponentProps,
    ComponentCustomProps,
    ComponentObjectPropsOptions,
    Plugin,
    VNode,
    VNodeProps
} from 'vue';
import {
    EventClosableProps,
    EventUpdateModelValueProps,
    TBsModel,
    TDataSource,
    TInputFieldProps,
    TLabelPosition
} from '../../../types';

export declare type TComboboxOptionProps = TInputFieldProps & {
    /**
     * Autofocus field when this component is mounted.
     */
    autofocus?: boolean;
    /**
     * Sets the field placeholder.
     */
    placeholder?: string;
    /**
     * Sets the cascading combobox parent value.
     */
    parentValue?: string | number;
    /**
     * The value monitored by `v-model` to maintain this field value.
     */
    modelValue?: string | number | string[] | number[];
    /**
     * Sets the data source configuration.
     */
    dataSource?: TDataSource;
    /**
     * Sets the **no data message** when the Listbox is empty.
     */
    emptyDataMessage?: string;
    /**
     * Sets the **not found message** when searching returns no result.
     */
    notFoundMessage?: string;
    /**
     * Minimum characters to check before start filtering the Listbox items.
     */
    minSearchChars?: string | number;
    /**
     * Minimum number of items to activate the search box.
     */
    minSearchLength?: string | number;
    /**
     * @deprecated
     * Use `minSearchLength` instead.
     */
    minimumItemsForSearch?: string | number;
    /**
     * Enable/disable multi selection.
     */
    multiple?: boolean;
    /**
     * Sets the Listbox background color.
     */
    listboxColor?: string;
    /**
     * Sets this component's Listbox container maximum height.
     */
    listboxMaxHeight?: string | number;
    /**
     * Sets this component's Listbox container minimum width.
     */
    listboxMinWidth?: number | string;
    /**
     * Sets the text label on the searchbox.
     */
    listboxSearchLabel?: string;
    /**
     * @deprecated
     * Use `listboxMaxHeight` instead.
     */
    popoverMaxHeight?: string | number;
    /**
     * @deprecated
     * Use `listboxMinWidth` instead.
     */
    popoverMinWidth?: number | string;
    /**
     * Sets this component's Listbox checkbox color.
     */
    checkboxColor?: string;
    /**
     * Sets this component's Listbox checkbox position. Valid values are: `left`, `right`.
     */
    checkboxPosition?: TLabelPosition;
    /**
     * @deprecated
     * Use `checkboxColor` instead.
     */
    checkOptionColor?: string;
    /**
     * @deprecated
     * Use `checkboxPosition` instead.
     */
    checkOptionPosition?: TLabelPosition;
    /**
     * Enable/disable **Chip** selection style for the selected items.
     */
    chipEnabled?: boolean;
    /**
     * The default Chips color to apply.
     */
    chipColor?: string;
    /**
     * Render the Chips with rounded-pill style.
     */
    chipPill?: boolean;
    /**
     * Render the Chips with outlined style.
     */
    chipOutlined?: boolean;
    /**
     * Show or hide the Listbox item separator.
     */
    itemSeparator?: boolean;
    /**
     * Define the image size for each Listbox items when `show-image` is enabled.
     */
    imageSize?: string | number;
    /**
     * Show or hide image if Listbox item's object contains `image` property.
     */
    showImage?: boolean;
    /**
     * Display image with **rounded** shape for each item that has image property
     */
    roundedImage?: boolean;
    /**
     * Display image with **circle** shape for each item that has image property
     */
    circleImage?: boolean;
    /**
     * Show the Listbox on `mouseenter` event.
     */
    openOnHover?: boolean;
    /**
     * Sets transition animation when showing the Listbox container.
     */
    transition?: string;
}

export declare type TBsCombobox = ComponentObjectPropsOptions<TComboboxOptionProps>;

declare type AllowedComboboxProps = AllowedComponentProps &
    ComponentCustomProps & VNodeProps & EventClosableProps &
    EventUpdateModelValueProps<string | number | string[] | number[] | undefined> & {
    onClear?: VoidFunction;
    onOpen?: VoidFunction;
    onSelect?: (item: TBsModel) => void;
    onDeselect?: (item: TBsModel) => void;
    onDataBind?: (data: TBsModel[]) => void;
    onDataError?: (error: unknown) => void;
    onDataFilter?: (data: TBsModel[]) => void;
    'onUpdate:selected-value'?: (selected: TBsModel[]) => void;
}

export declare const BsCombobox: {
    new(): {
        $props: AllowedComboboxProps & TComboboxOptionProps;
        $slots: {
            default?: (arg: { id: string }) => VNode[];
            'option-item'?: (arg: { item: TBsModel, index: number }) => VNode;
            'append-inner'?: () => VNode;
            'append-outer'?: () => VNode;
            'prepend-inner'?: () => VNode;
            'prepend-outer'?: () => VNode;
            'empty-data-msg'?: () => VNode;
            'not-found-msg'?: () => VNode;
            'help-text'?: () => VNode;
        };
        $emit: [
            /**
             * Fired when this component's value is being cleared.
             */
            'clear',
            /**
             * Fired when the Popover is hiding.
             */
            'close',
            /**
             * Fired when the Popover is show.
             */
            'open',
            /**
             * Fired when an item is selected.
             */
            'select',
            /**
             * Fired when an item is deselected.
             */
            'deselect',
            /**
             * Fired when the data has been fetched.
             */
            'data-bind',
            /**
             * Fired when error loading data items.
             */
            'data-error',
            /**
             * Fired when this component's data items is filtered.
             */
            'data-filter',
            /**
             * Fired when this component's value is updated.
             */
            'update:model-value',
            /**
             * Fired when this component's selected value is updated.
             */
            'update:selected-value',
        ];
    };
};

export declare const BsComboboxPlugin: Plugin;
