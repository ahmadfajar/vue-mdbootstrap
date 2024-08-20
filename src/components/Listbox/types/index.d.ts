import {
    AllowedComponentProps,
    ComponentCustomProps,
    ComponentObjectPropsOptions,
    Plugin,
    VNode,
    VNodeProps,
} from 'vue';
import {
    EventUpdateModelValueProps,
    IArrayStore,
    IBsModel,
    IBsStore,
    TLabelPosition,
} from '../../../types';

export declare type TDataListSchemaProps = {
    displayField: string;
    valueField: string;
    imageField?: string;
    cascadeField?: string;
    disableField?: string;
};

export declare type TDataSource = {
    proxy: IBsStore | IArrayStore;
    /**
     * The data schema which will be used to recognize and render
     * the data items on the Listbox container.
     */
    schema?: TDataListSchemaProps;
};

export declare type TListboxOptionProps = {
    /**
     * Autoload data from the configured `dataSource`, default is `true`.
     */
    autoload?: boolean;
    /**
     * Hide the Listbox container borders.
     */
    borderless?: boolean;
    /**
     * Define the Listbox background color.
     */
    color?: string;
    /**
     * This component's state.
     */
    disabled?: boolean;
    /**
     * This component's state.
     */
    readonly?: boolean;
    /**
     * Sets the Listbox container maximum height.
     */
    maxHeight?: string | number;
    /**
     * The value monitored by `v-model` to maintain this field value.
     */
    modelValue?: string | number | string[] | number[];
    /**
     * Enable/disable multi selection.
     */
    multiple?: boolean;
    /**
     * Text label on the search box.
     */
    searchLabel?: string;
    /**
     * Text to search on the data items.
     */
    searchText?: string;
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
     * Use checkbox for multi selection.
     */
    useCheckbox?: boolean;
    /**
     * Sets the Listbox checkbox color.
     */
    checkboxColor?: string;
    /**
     * Sets the Listbox checkbox position. Valid values are: `left`, `right`.
     */
    checkboxPosition?: TLabelPosition;
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
};

export declare type TBsListbox = ComponentObjectPropsOptions<TListboxOptionProps>;

declare type AllowedListboxProps = AllowedComponentProps &
    ComponentCustomProps &
    VNodeProps &
    EventUpdateModelValueProps<string | number | string[] | number[] | undefined> & {
        onSelect?: (item: IBsModel) => void;
        onDeselect?: (item: IBsModel) => void;
        onDataBind?: (data: IBsModel[]) => void;
        onDataError?: (error: unknown) => void;
        onDataFilter?: (data: IBsModel[]) => void;
        'onUpdate:search-text'?: (search?: string) => void;
        'onUpdate:selected-value'?: (selected: IBsModel[]) => void;
        '@select'?: (item: IBsModel) => void;
        '@deselect'?: (item: IBsModel) => void;
        '@data-bind'?: (data: IBsModel[]) => void;
        '@data-error'?: (error: unknown) => void;
        '@data-filter'?: (data: IBsModel[]) => void;
        '@update:search-text'?: (search?: string) => void;
        '@update:selected-value'?: (selected: IBsModel[]) => void;
    };

export declare const BsListbox: {
    new (): {
        $props: AllowedListboxProps & TListboxOptionProps;
        $slots: {
            'option-item'?: (arg: { item: IBsModel; index: number }) => VNode;
            'empty-data-msg'?: () => VNode;
            'not-found-msg'?: () => VNode;
        };
        $emit: [
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
             * Fired when the Listbox data items is filtered.
             */
            'data-filter',
            /**
             * Fired when the Listbox value is updated.
             */
            'update:model-value',
            /**
             * Fired when the Listbox search value is updated.
             */
            'update:search-text',
            /**
             * Fired when the Listbox selected value is updated.
             */
            'update:selected-value',
        ];
    };
};

export declare const BsListboxPlugin: Plugin;
