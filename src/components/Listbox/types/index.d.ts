import {IArrayStore, IBsStore, TLabelPosition, TRecord} from "../../../types";
import {ComponentObjectPropsOptions, ComponentOptionsMixin, ComputedOptions, DefineComponent, EmitsOptions} from "vue";

export declare type TDataListSchemaProps = {
    displayField: string,
    valueField: string,
    imageField: string,
    cascadeField: string,
    disableField: string
}

export declare type TDataSource = {
    proxy: IBsStore | IArrayStore,
    /**
     * The data schema which will be used to recognize and render
     * the data items on the Listbox container.
     */
    schema?: TDataListSchemaProps,
}

export declare type TListboxOptionProps = {
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
     * Sets this component's data source.
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
     * Sets **rounded** effect for the displayed image from Listbox item.
     */
    roundedImage?: boolean;
    /**
     * Sets **circle** effect for the displayed image from Listbox item.
     */
    circleImage?: boolean;
}

export declare type TBsListbox = ComponentObjectPropsOptions<TListboxOptionProps>;

export declare const BsListbox: DefineComponent<TBsListbox, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;
