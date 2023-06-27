import {
    ComponentObjectPropsOptions,
    ComponentOptionsMixin,
    ComputedOptions,
    DefineComponent,
    EmitsOptions,
    MethodOptions,
    Plugin
} from 'vue';
import { TDataSource, TInputFieldProps, TLabelPosition, TRecord } from '../../../types';

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
     * Sets this component's Listbox data source.
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
     * Sets this component's Listbox background color.
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
     * Sets **rounded** effect for the displayed image from Listbox item.
     */
    roundedImage?: boolean;
    /**
     * Sets **circle** effect for the displayed image from Listbox item.
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

export declare const BsCombobox: DefineComponent<TBsCombobox, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>;

export declare const BsComboboxPlugin: Plugin;
