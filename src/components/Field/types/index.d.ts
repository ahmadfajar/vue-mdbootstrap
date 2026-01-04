import { ComponentObjectPropsOptions, ComputedRef, ObjectPlugin, VNode } from 'vue';
import {
  BaseComponentProps,
  EventUpdateModelValueProps,
  MaybeNumberish,
  Numberish,
  TExtendedContextColor,
  TIconVariant,
  TPopoverPosition,
} from '../../../types';

export declare type TFieldComponent =
  | 'chip-field'
  | 'combobox-field'
  | 'datetime-field'
  | 'numeric-field'
  | 'search-field'
  | 'textarea-field'
  | 'text-field'
  | 'toggle-field';

export declare type TFieldType = 'text' | 'email' | 'password' | 'tel' | 'url';

export declare type TActionButtonPlacement = 'left' | 'right' | 'both';

export declare type TActionButtonType = 'up-down' | 'plus-minus';

declare type TBoolRecord = Record<string, boolean>;

declare type TStringRecord = Record<string, string>;

export declare type TValidator = {
  validators: TBoolRecord;
  messages: TStringRecord;
  hasError: boolean;
  dirty: boolean;
};

export declare interface TComputedValidationResult {
  hasError: ComputedRef<boolean>;
  hasValidated: ComputedRef<boolean>;
  showValidationError: ComputedRef<boolean>;
  showHelpText: ComputedRef<boolean>;
  errorItems: ComputedRef<string[]>;
}

export declare type TValidationProps = {
  /**
   * The help text to display below the field component.
   */
  helpText?: string;

  /**
   * Hide persistent help text, this property takes precedence over `persistentHelpText`.
   */
  persistentHelpOff?: boolean;

  /**
   * Show persistent help text or not.
   */
  persistentHelpText?: boolean;

  /**
   * The external validator plugin to be used to validate this field value.
   */
  validator?: TValidator;
};

export declare type TInputBaseProps = {
  /**
   * Sets the `<input>` element `ID` attribute. This property value is auto generates.
   */
  id?: string;

  /**
   * Sets the `<input>` element `name` attribute.
   */
  name?: Numberish;

  /**
   * This input field state: enabled or disabled.
   */
  disabled?: boolean;

  /**
   * Sets this input field into readonly state.
   */
  readonly?: boolean;

  /**
   * Whether this input field is required or not.
   */
  required?: boolean;
};

export declare type TInputFieldProps = TInputBaseProps &
  TValidationProps & {
    /**
     * Sets the action icon style variant.
     *
     * Valid predefined icon variants are: `outlined`, `rounded`, `sharp`,
     * `filled`, `outlined_filled`, `rounded_filled`, and `sharp_filled`.
     * Default is `outlined`.
     *
     * Variant `filled` and `outlined_filled` will result the same icon style variant.
     *
     * @see [Google Material Symbols](https://fonts.google.com/icons?icon.set=Material+Symbols) for details.
     */
    actionIconVariant?: TIconVariant;

    /**
     * Sets auto show the clear button.
     */
    clearButton?: boolean;

    /**
     * Create this component with **filled** appearance.
     *
     * @see [Google Material Design](https://m3.material.io/components/text-fields/overview) for details.
     */
    filled?: boolean;

    /**
     * Create this component with floating field label.
     *
     * @see [Google Material Design](https://m3.material.io/components/text-fields/overview) for details.
     */
    floatingLabel?: boolean;

    /**
     * Create this component with **outlined** appearance.
     *
     * @see [Google Material Design](https://m3.material.io/components/text-fields/overview) for details.
     */
    outlined?: boolean;

    /**
     * Display validation icon or not, when this field has been validated.
     */
    validationIcon?: boolean;

    /**
     * Sets icon to display on inner right side. This is a shortcut to insert
     * component `BsIcon` inside this component.
     *
     * Use android icon name with or without suffix. Valid suffixes are:
     * `_outlined`, `_rounded`, `_sharp`, `_filled`, `_outlined_filled`,
     * `_rounded_filled`, or `_sharp_filled`. If no suffix is given, then
     * default (`outlined`) icon variant will be used. Suffix `_filled`
     * and `_outlined_filled` will result the same icon style variant.
     *
     * @see [Google Material Symbols](https://fonts.google.com/icons?icon.set=Material+Symbols) for details.
     */
    appendIcon?: string;

    /**
     * Sets icon to display on outer right side. This is a shortcut to insert
     * component `BsIcon` inside this component.
     *
     * Use android icon name with or without suffix. Valid suffixes are:
     * `_outlined`, `_rounded`, `_sharp`, `_filled`, `_outlined_filled`,
     * `_rounded_filled`, or `_sharp_filled`. If no suffix is given, then
     * default (`outlined`) icon variant will be used. Suffix `_filled`
     * and `_outlined_filled` will result the same icon style variant.
     *
     * @see [Google Material Symbols](https://fonts.google.com/icons?icon.set=Material+Symbols) for details.
     */
    appendIconOuter?: string;

    /**
     * Sets icon to display on inner left side. This is a shortcut to insert
     * component `BsIcon` inside this component.
     *
     * Use android icon name with or without suffix. Valid suffixes are:
     * `_outlined`, `_rounded`, `_sharp`, `_filled`, `_outlined_filled`,
     * `_rounded_filled`, or `_sharp_filled`. If no suffix is given, then
     * default (`outlined`) icon variant will be used. Suffix `_filled`
     * and `_outlined_filled` will result the same icon style variant.
     *
     * @see [Google Material Symbols](https://fonts.google.com/icons?icon.set=Material+Symbols) for details.
     */
    prependIcon?: string;

    /**
     * Sets icon to display on outer left side. This is a shortcut to insert
     * component `BsIcon` inside this component.
     *
     * Use android icon name with or without suffix. Valid suffixes are:
     * `_outlined`, `_rounded`, `_sharp`, `_filled`, `_outlined_filled`,
     * `_rounded_filled`, or `_sharp_filled`. If no suffix is given, then
     * default (`outlined`) icon variant will be used. Suffix `_filled`
     * and `_outlined_filled` will result the same icon style variant.
     *
     * @see [Google Material Symbols](https://fonts.google.com/icons?icon.set=Material+Symbols) for details.
     */
    prependIconOuter?: string;
  };

export declare type TInputTextProps = TInputFieldProps & {
  /**
   * Sets browsers `autocomplete` predictions on/off.
   */
  autocomplete?: string | boolean;

  /**
   * Autofocus field when this component is mounted.
   */
  autofocus?: boolean;

  /**
   * Sets the field placeholder.
   */
  placeholder?: string;
};

export declare type TTextFieldOptionProps = TInputTextProps & {
  /**
   * The value monitored by `v-model` to maintain this field value.
   */
  modelValue?: MaybeNumberish;

  /**
   * Sets <input> element type attribute. Valid values are: `text`, `password`, `email`, `url`, `tel`.
   */
  type?: TFieldType;

  /**
   * Sets target `<datalist>` element ID.
   */
  datalist?: string;

  /**
   * Enable toggle password field.
   */
  passwordToggle?: boolean;

  /**
   * Sets `<input>` element maximum characters allowed.
   */
  maxlength?: Numberish;

  /**
   * Sets `<input>` element minimum characters allowed.
   */
  minlength?: Numberish;

  /**
   * Create this component with **rounded-pill** appearance.
   */
  rounded?: boolean;

  /**
   * Prepend inline non-modifiable text before the input field.
   */
  prefix?: string;

  /**
   * Append inline non-modifiable text after the input field.
   */
  suffix?: string;
};

export declare type TTextAreaOptionProps = TInputTextProps & {
  /**
   * Sets browsers `autocomplete` predictions on/off.
   */
  autoGrow?: boolean | string;

  /**
   * Disable resizing the `<textarea>` element.
   */
  noResize?: boolean;

  /**
   * The value monitored by `v-model` to maintain this field value.
   */
  modelValue?: string | null;

  /**
   * Sets `<textarea>` height in rows.
   */
  rows?: Numberish;

  /**
   * Sets `<textarea>` height in pixel.
   */
  rowHeight?: Numberish;
};

export declare type TChipFieldOptionProps = TInputTextProps & {
  /**
   * The default Chips color to apply.
   */
  chipColor?: TExtendedContextColor | string;

  /**
   * When defined, display the close button on every Chip to delete a Chip.
   */
  chipDeletable?: boolean;

  /**
   * Render the Chips with rounded-pill style.
   */
  chipPill?: boolean;

  /**
   * Render the Chips with outlined style.
   */
  chipOutlined?: boolean;

  /**
   * The value monitored by `v-model` to maintain this field value.
   */
  modelValue?: string | string[] | null;
};

export declare type TNumericOptions = {
  locale: string;
  step: number;
  maxValue?: number;
  minValue?: number;
};

export declare type TNumericFieldOptionProps = TInputTextProps & {
  /**
   * The value monitored by `v-model` to maintain this field value.
   */
  modelValue?: number | null;

  /**
   * The locale to be used when displaying the numeric value.
   * Defaults is using browser's locale.
   */
  locale?: string;

  /**
   * Shows the **Up-Down** or **Plus-Minus** action buttons which is used to
   * <b>increment</b> / <b>decrement</b> the numeric value.
   */
  actionButton?: TActionButtonType;

  /**
   * Sets the **Up-Down** or **Plus-Minus** action buttons placement,
   * valid values: `left`, `right` and `both`.
   */
  actionButtonPlacement?: TActionButtonPlacement;

  /**
   * Sets the maximum allowed fraction or decimal digits for the displayed value.
   */
  maxFraction?: Numberish;

  /**
   * Sets the maximum allowed value.
   */
  maxValue?: Numberish;

  /**
   * Sets the minimum allowed value.
   */
  minValue?: Numberish;

  /**
   * Sets the increment/decrement steps value.
   */
  step?: Numberish;

  /**
   * Format the displayed numeric value with digit grouping.
   */
  useGrouping?: boolean;

  /**
   * Create this component with **rounded-pill** appearance.
   */
  rounded?: boolean;

  /**
   * Prepend inline non-modifiable text before the input field.
   */
  prefix?: string;

  /**
   * Append inline non-modifiable text after the input field.
   */
  suffix?: string;
};

export declare type TSearchFieldOptionProps = {
  /**
   * Sets `<input>` element ID attribute. This property value is auto generates.
   */
  id?: string;

  /**
   * Sets `<input>` element name attribute.
   */
  name?: string;

  /**
   * Enable/disable the component and the `<input>` element.
   */
  disabled?: boolean;

  /**
   * Put the component in readonly state and sets the `<input>` element readonly attribute.
   */
  readonly?: boolean;

  /**
   * Autofocus field when document is loaded.
   */
  autofocus?: boolean;

  /**
   * Enable advance search panel. If true then Popover container will be enabled.
   */
  advanceSearch?: boolean;

  /**
   * Sets the field placeholder.
   */
  placeholder?: string;

  /**
   * Adapts search field to the container background color.
   */
  darkMode?: boolean;

  /**
   * Minimum characters to check before triggers the search event.
   */
  minlength?: Numberish;

  /**
   * The value monitored by v-model to maintain field value.
   */
  modelValue?: string | null;

  /**
   * Custom CSS class for the Popover container.
   */
  popoverCls?: string | string[];

  /**
   * Sets minimum width for the Popover container.
   */
  popoverMinWidth?: number | string;

  /**
   * Open or close the advance search popover panel. Only works if
   * `advanceSearch` is sets to `true`.
   */
  popoverOpen?: boolean;

  /**
   * Sets the Popover display placement.
   */
  popoverPlacement?: TPopoverPosition;

  /**
   * Sets animation transition when displaying the Popover container.
   */
  popoverTransition?: string;
};

export declare type TBsTextField = ComponentObjectPropsOptions<TTextFieldOptionProps>;

export declare type TBsTextArea = ComponentObjectPropsOptions<TTextAreaOptionProps>;

export declare type TBsChipField = ComponentObjectPropsOptions<TChipFieldOptionProps>;

export declare type TBsNumericField = ComponentObjectPropsOptions<TNumericFieldOptionProps>;

export declare type TBsSearchField = ComponentObjectPropsOptions<TSearchFieldOptionProps>;

declare interface AllowedInputFieldEvents extends BaseComponentProps {
  /**
   * Fired when this component lost focus.
   */
  onBlur?: EventListener;

  /**
   * Fired when this component's value is being cleared.
   */
  onClear?: VoidFunction;

  /**
   * Fired when this component got focused.
   */
  onFocus?: EventListener;

  /**
   * Fired when `KeyboardEvent` is triggered by the `<input>` element.
   */
  onKeydown?: EventListener;

  /**
   * Fired when this component lost focus.
   */
  '@blur'?: EventListener;

  /**
   * Fired when this component's value is being cleared.
   */
  '@clear'?: VoidFunction;

  /**
   * Fired when this component got focused.
   */
  '@focus'?: EventListener;

  /**
   * Fired when `KeyboardEvent` is triggered by the `<input>` element.
   */
  '@keydown'?: EventListener;
}

export declare const BsTextField: {
  new (): {
    $props: AllowedInputFieldEvents &
      EventUpdateModelValueProps<string | null> &
      TTextFieldOptionProps;
    $slots: {
      default?: (arg: { id: string }) => VNode[];
      'append-inner'?: () => VNode;
      'append-outer'?: () => VNode;
      'prepend-inner'?: () => VNode;
      'prepend-outer'?: () => VNode;
      'help-text'?: () => VNode;
    };
    $emits: {
      (event: 'clear'): void;
      (event: 'blur', target: Event): void;
      (event: 'focus', target: Event): void;
      (event: 'keydown', target: Event): void;
      (event: 'update:model-value', value: string | null): void;
    };
  };
};

export declare const BsTextArea: {
  new (): {
    $props: AllowedInputFieldEvents &
      EventUpdateModelValueProps<string | null> &
      TTextAreaOptionProps;
    $slots: {
      default?: (arg: { id: string }) => VNode[];
      'append-inner'?: () => VNode;
      'append-outer'?: () => VNode;
      'prepend-inner'?: () => VNode;
      'prepend-outer'?: () => VNode;
      'help-text'?: () => VNode;
    };
    $emits: {
      (event: 'clear'): void;
      (event: 'blur', target: Event): void;
      (event: 'focus', target: Event): void;
      (event: 'keydown', target: Event): void;
      (event: 'update:model-value', value: string | null): void;
    };
  };
};

declare interface ChipFieldEvents extends AllowedInputFieldEvents {
  /**
   * Fired when an item is deleted from the collection.
   */
  'onDelete-item'?: (deletedItem: string) => void;

  /**
   * Fired when an item is deleted from the collection.
   */
  '@delete-item'?: (deletedItem: string) => void;
}

export declare const BsChipField: {
  new (): {
    $props: ChipFieldEvents & EventUpdateModelValueProps<string | string[]> & TChipFieldOptionProps;
    $slots: {
      default?: (arg: { id: string }) => VNode[];
      'append-inner'?: () => VNode;
      'append-outer'?: () => VNode;
      'prepend-inner'?: () => VNode;
      'prepend-outer'?: () => VNode;
      'help-text'?: () => VNode;
    };
    $emits: {
      (event: 'clear'): void;
      (event: 'blur', target: Event): void;
      (event: 'focus', target: Event): void;
      (event: 'keydown', target: Event): void;
      (event: 'delete-item', deletedItem: string): void;
      (event: 'update:model-value', value: string | string[]): void;
    };
  };
};

export declare const BsNumericField: {
  new (): {
    $props: AllowedInputFieldEvents &
      EventUpdateModelValueProps<number | null> &
      TNumericFieldOptionProps;
    $slots: {
      default?: (arg: { id: string }) => VNode[];
      'append-inner'?: () => VNode;
      'append-outer'?: () => VNode;
      'prepend-inner'?: () => VNode;
      'prepend-outer'?: () => VNode;
      'help-text'?: () => VNode;
    };
    $emits: {
      (event: 'clear'): void;
      (event: 'blur', target: Event): void;
      (event: 'focus', target: Event): void;
      (event: 'keydown', target: Event): void;
      (event: 'update:model-value', value: number | null): void;
    };
  };
};

declare type SearchFieldBaseEvents = Omit<AllowedInputFieldEvents, 'onKeydown' | '@keydown'>;

declare interface SearchFieldEvents extends SearchFieldBaseEvents {
  /**
   * Fired when the Popover is hiding.
   */
  onClose?: VoidFunction;

  /**
   * Fired when the Popover is show.
   */
  onOpen?: VoidFunction;

  /**
   * Asks handler to start searching for the given keyword.
   */
  onSearch?: (value: string) => void;

  /**
   * Fired when the Popover is hiding.
   */
  '@close'?: VoidFunction;

  /**
   * Fired when the Popover is show.
   */
  '@open'?: VoidFunction;

  /**
   * Asks handler to start searching for the given keyword.
   */
  '@search'?: (value: string) => void;
}

export declare const BsSearchField: {
  new (): {
    $props: SearchFieldEvents & EventUpdateModelValueProps<string | null> & TSearchFieldOptionProps;
    $slots: {
      popover?: () => VNode[];
    };
    $emits: {
      (event: 'clear'): void;
      (event: 'close'): void;
      (event: 'open'): void;
      (event: 'blur', target: Event): void;
      (event: 'focus', target: Event): void;
      (event: 'keydown', target: Event): void;
      (event: 'search', value: string): void;
      (event: 'update:model-value', value: string | null): void;
    };
  };
};

export declare const BsFieldPlugin: ObjectPlugin;
