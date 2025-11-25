import { ComponentObjectPropsOptions, ObjectPlugin, VNode } from 'vue';
import {
  BaseComponentProps,
  EventUpdateModelValueProps,
  EventVoidClosableProps,
  IArrayStore,
  IBsModel,
  IBsStore,
  Numberish,
  TContextColor,
  TExtendedContextColor,
  TInputFieldProps,
} from '../../../types';

export declare type TCheckboxPosition = 'left' | 'right';

export declare type TDataListSchema = {
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
  schema?: TDataListSchema;
};

export declare type TListboxBaseProps = {
  /**
   * The value monitored by `v-model` to maintain this field value.
   */
  modelValue?: string | number | string[] | number[] | null;

  /**
   * Enable/disable multi selection.
   */
  multiple?: boolean;

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
  minSearchChars?: Numberish;

  /**
   * Minimum number of items to activate the search box.
   */
  minSearchLength?: Numberish;

  /**
   * Sets this component's Listbox checkbox color.
   */
  checkboxColor?: TContextColor | string;

  /**
   * Sets this component's Listbox checkbox position. Valid values are: `left`, `right`.
   */
  checkboxPosition?: TCheckboxPosition;

  /**
   * Show or hide the Listbox item separator.
   */
  itemSeparator?: boolean;

  /**
   * Set to `TRUE` when Listbox has dark background color.
   */
  itemSeparatorDark?: boolean;

  /**
   * Define the image size for each Listbox items when `show-image` is enabled.
   */
  imageSize?: Numberish;

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

export declare type TListboxOptionProps = TListboxBaseProps & {
  /**
   * Autoload data from the configured `dataSource`, default is `true`.
   */
  autoload?: boolean;

  /**
   * Hide the Listbox container borders.
   */
  borderless?: boolean;

  /**
   * Apply custom color scheme to this Listbox component.
   *
   * @deprecated
   * Use unified global css variable instead.
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
  maxHeight?: Numberish;

  /**
   * Text label on the search box.
   */
  searchLabel?: string;

  /**
   * Text to search on the data items.
   */
  searchText?: string;

  /**
   * Use checkbox for multi selection.
   */
  useCheckbox?: boolean;
};

export declare type TComboboxOptionProps = TInputFieldProps &
  TListboxBaseProps & {
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
    parentValue?: Numberish;

    /**
     * Sets the Listbox background color.
     *
     * @deprecated
     * Use unified global css variables instead.
     */
    listboxColor?: string;

    /**
     * Sets this component's Listbox container maximum height.
     */
    listboxMaxHeight?: Numberish;

    /**
     * Sets this component's Listbox container minimum width.
     */
    listboxMinWidth?: Numberish;

    /**
     * Sets the text label on the searchbox.
     */
    listboxSearchLabel?: string;

    /**
     * Enable/disable **Chip** selection style for the selected items.
     */
    chipEnabled?: boolean;

    /**
     * The default Chips color to apply.
     */
    chipColor?: TExtendedContextColor | string;

    /**
     * Render the Chips with rounded-pill style.
     */
    chipPill?: boolean;

    /**
     * Render the Chips with outlined style.
     */
    chipOutlined?: boolean;

    /**
     * Show the Listbox on `mouseenter` event.
     */
    openOnHover?: boolean;

    /**
     * Sets transition animation when showing the Listbox container.
     */
    transition?: string;
  };

export declare type TBsListbox = ComponentObjectPropsOptions<TListboxOptionProps>;

export declare type TBsCombobox = ComponentObjectPropsOptions<TComboboxOptionProps>;

declare interface AllowedListboxProps
  extends BaseComponentProps,
    EventUpdateModelValueProps<string | number | string[] | number[] | undefined> {
  /**
   * Fired when an item is selected.
   */
  onSelect?: (item: IBsModel) => void;

  /**
   * Fired when an item is deselected.
   */
  onDeselect?: (item: IBsModel) => void;

  /**
   * Fired when the data has been fetched.
   */
  onDataBind?: (data: IBsModel[]) => void;

  /**
   * Fired when error loading data items.
   */
  onDataError?: (error: unknown) => void;

  /**
   * Fired when the Listbox data items is filtered.
   */
  onDataFilter?: (data: IBsModel[]) => void;

  /**
   * Fired when the Listbox search value is updated.
   */
  'onUpdate:search-text'?: (search?: string) => void;

  /**
   * Fired when the Listbox selected value is updated.
   */
  'onUpdate:selected-value'?: (selected: IBsModel[]) => void;

  /**
   * Fired when an item is selected.
   */
  '@select'?: (item: IBsModel) => void;

  /**
   * Fired when an item is deselected.
   */
  '@deselect'?: (item: IBsModel) => void;

  /**
   * Fired when the data has been fetched.
   */
  '@data-bind'?: (data: IBsModel[]) => void;

  /**
   * Fired when error loading data items.
   */
  '@data-error'?: (error: unknown) => void;

  /**
   * Fired when the Listbox data items is filtered.
   */
  '@data-filter'?: (data: IBsModel[]) => void;

  /**
   * Fired when the Listbox search value is updated.
   */
  '@update:search-text'?: (search?: string) => void;

  /**
   * Fired when the Listbox selected value is updated.
   */
  '@update:selected-value'?: (selected: IBsModel[]) => void;
}

export declare const BsListbox: {
  new (): {
    $props: AllowedListboxProps & TListboxOptionProps;
    $slots: {
      'option-item'?: (arg: { item: IBsModel; index: number }) => VNode;
      'empty-data-msg'?: () => VNode;
      'not-found-msg'?: () => VNode;
    };
    $emits: {
      (event: 'select', item: IBsModel): void;
      (event: 'deselect', item: IBsModel): void;
      (event: 'data-bind', data: IBsModel[]): void;
      (event: 'data-error', error: unknown): void;
      (event: 'data-filter', data: IBsModel[]): void;
      (event: 'update:model-value', value: string | number | string[] | number[] | undefined): void;
      (event: 'update:search-text', search?: string): void;
      (event: 'update:search-value', selected: IBsModel[]): void;
    };
  };
};

declare interface AllowedComboboxProps
  extends BaseComponentProps,
    EventVoidClosableProps,
    EventUpdateModelValueProps<string | number | string[] | number[] | undefined> {
  /**
   * Fired when this component's value is being cleared.
   */
  onClear?: VoidFunction;

  /**
   * Fired when the Popover is show.
   */
  onOpen?: VoidFunction;

  /**
   * Fired when an item is selected.
   */
  onSelect?: (item: IBsModel) => void;

  /**
   * Fired when an item is deselected.
   */
  onDeselect?: (item: IBsModel) => void;

  /**
   * Fired when the data has been fetched.
   */
  onDataBind?: (data: IBsModel[]) => void;

  /**
   * Fired when error loading data items.
   */
  onDataError?: (error: unknown) => void;

  /**
   * Fired when this component's data items is filtered.
   */
  onDataFilter?: (data: IBsModel[]) => void;

  /**
   * Fired when this component's selected value is updated.
   */
  'onUpdate:selected-value'?: (selected: IBsModel[]) => void;

  /**
   * Fired when this component's value is being cleared.
   */
  '@clear'?: VoidFunction;

  /**
   * Fired when the Popover is show.
   */
  '@open'?: VoidFunction;

  /**
   * Fired when an item is selected.
   */
  '@select'?: (item: IBsModel) => void;

  /**
   * Fired when an item is deselected.
   */
  '@deselect'?: (item: IBsModel) => void;

  /**
   * Fired when the data has been fetched.
   */
  '@data-bind'?: (data: IBsModel[]) => void;

  /**
   * Fired when error loading data items.
   */
  '@data-error'?: (error: unknown) => void;

  /**
   * Fired when this component's data items is filtered.
   */
  '@data-filter'?: (data: IBsModel[]) => void;

  /**
   * Fired when this component's selected value is updated.
   */
  '@update:selected-value'?: (selected: IBsModel[]) => void;
}

export declare const BsCombobox: {
  new (): {
    $props: AllowedComboboxProps & TComboboxOptionProps;
    $slots: {
      default?: (arg: { id: string }) => VNode[];
      'option-item'?: (arg: { item: IBsModel; index: number }) => VNode;
      'append-inner'?: () => VNode;
      'append-outer'?: () => VNode;
      'prepend-inner'?: () => VNode;
      'prepend-outer'?: () => VNode;
      'empty-data-msg'?: () => VNode;
      'not-found-msg'?: () => VNode;
      'help-text'?: () => VNode;
    };
    $emits: {
      (event: 'clear'): void;
      (event: 'close'): void;
      (event: 'open'): void;
      (event: 'select', item: IBsModel): void;
      (event: 'deselect', item: IBsModel): void;
      (event: 'data-bind', data: IBsModel[]): void;
      (event: 'data-error', error: unknown): void;
      (event: 'data-filter', data: IBsModel[]): void;
      (event: 'update:model-value', value: string | number | string[] | number[] | undefined): void;
      (event: 'update:search-value', selected: IBsModel[]): void;
    };
  };
};

export declare const BsComboboxPlugin: ObjectPlugin;
