import type {
    AllowedComponentProps,
    ComponentCustomProps,
    ComponentObjectPropsOptions,
    Plugin as Plugin_1,
    VNode,
    VNodeProps
} from 'vue';
import type {
    EventUpdateModelValueProps,
    TIconVariant,
    TInputBaseProps,
    TLabelPosition,
    TPopoverPosition,
    TRecord,
    TSpaceAround,
} from '../../../types';

export declare type TValidator = {
    validators: TRecord;
    messages: TRecord;
    hasError: boolean;
    dirty: boolean;
}

export declare type TValidationProps = {
    /**
     * The help text to display below the field component.
     */
    helpText?: string;
    /**
     * Show persistent help text or not.
     */
    persistentHelpText?: boolean;
    /**
     * The external validator plugin to be used to validate this field value.
     */
    validator?: TValidator;
    /**
     * @deprecated
     * Use `validator` property instead.
     */
    externalValidator?: TValidator;
}

export declare type TInputFieldProps = TInputBaseProps & TValidationProps & {
    /**
     * Sets the action icon style variant.
     */
    actionIconVariant?: TIconVariant;
    /**
     * Sets auto show the clear button.
     */
    clearButton?: boolean;
    /**
     * Create this component with **flat** appearance, and removes the borders.
     * The component appearance will be styled like plain text.
     */
    flat?: boolean;
    /**
     * Create this component with **filled** appearance.
     * See [Google Material Design](https://m3.material.io/components/text-fields/overview) for details.
     */
    filled?: boolean;
    /**
     * Create this component with floating field label.
     * See [Google Material Design](https://m3.material.io/components/text-fields/overview) for details.
     */
    floatingLabel?: boolean;
    /**
     * Create this component with **outlined** appearance.
     * See [Google Material Design](https://m3.material.io/components/text-fields/overview) for details.
     */
    outlined?: boolean;
    /**
     * Display validation icon or not, when this field has been validated.
     */
    validationIcon?: boolean;
    /**
     * Sets icon to display on inner right side.
     * This is a shortcut to insert component `BsIcon` inside this component.
     * Use any valid Google Material icon name, see
     * [Google Material Icon](https://fonts.google.com/icons?icon.set=Material+Icons)
     * for details.
     */
    appendIcon?: string;
    /**
     * Sets icon to display on outer right side.
     * This is a shortcut to insert component `BsIcon` inside this component.
     * Use any valid Google Material icon name, see
     * [Google Material Icon](https://fonts.google.com/icons?icon.set=Material+Icons)
     * for details.
     */
    appendIconOuter?: string;
    /**
     * Sets icon to display on inner left side.
     * This is a shortcut to insert component `BsIcon` inside this component.
     * Use any valid Google Material icon name, see
     * [Google Material Icon](https://fonts.google.com/icons?icon.set=Material+Icons)
     * for details.
     */
    prependIcon?: string;
    /**
     * Sets icon to display on outer left side.
     * This is a shortcut to insert component `BsIcon` inside this component.
     * Use any valid Google Material icon name, see
     * [Google Material Icon](https://fonts.google.com/icons?icon.set=Material+Icons)
     * for details.
     */
    prependIconOuter?: string;
}

export declare type TInputTextProps = TInputFieldProps & {
    /**
     * Sets browsers autocomplete predictions on/off.
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
}

export declare type TTextFieldOptionProps = TInputTextProps & {
    /**
     * The value monitored by `v-model` to maintain this field value.
     */
    modelValue?: string | number;
    /**
     * Sets <input> element type attribute. Valid values are: `text`, `password`, `email`, `url`, `tel`.
     */
    type?: string;
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
    maxlength?: string | number;
    /**
     * Sets `<input>` element minimum characters allowed.
     */
    minlength?: string | number;
}

export declare type TTextAreaOptionProps = TInputTextProps & {
    /**
     * Enable/disable `<textarea>` element to auto grow.
     */
    autoGrow?: boolean;
    /**
     * Disable resizing the `<textarea>` element.
     */
    noResize?: boolean;
    /**
     * The value monitored by `v-model` to maintain this field value.
     */
    modelValue?: string;
    /**
     * Sets `<textarea>` height in rows.
     */
    rows?: string | number;
    /**
     * Sets `<textarea>` height in pixel.
     */
    rowHeight?: string | number;
}

export declare type TChipFieldOptionProps = TInputTextProps & {
    /**
     * The default Chips color to apply.
     */
    chipColor?: string;
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
    modelValue?: string | string[];
}

export declare type TNumericOpsOptions = {
    locale: string;
    step: number;
    maxValue?: number;
    minValue?: number;
}

export declare type TNumericFieldOptionProps = TInputTextProps & {
    /**
     * The value monitored by `v-model` to maintain this field value.
     */
    modelValue?: number;
    /**
     * The locale to be used when displaying the numeric value.
     * Defaults is using browser's locale.
     */
    locale?: string;
    /**
     * Format the displayed numeric value with digit grouping.
     */
    useGrouping?: boolean;
    /**
     * Enable and shows the Spinner action buttons which is used to
     * increment/decrement the numeric value.
     */
    spinButton?: boolean;
    /**
     * Sets the Spinner action buttons placement, valid values: `left` and `right`.
     */
    spinButtonPlacement?: TLabelPosition;
    /**
     * Enable and shows the Plus-Minus action buttons which is used to
     * increment/decrement the numeric value.
     */
    actionButton?: boolean;
    /**
     * Sets the Plus-Minus action buttons placement, valid values: `left`, `right` and `both`.
     */
    actionButtonPlacement?: TSpaceAround;
    /**
     * Sets the maximum allowed fraction or decimal digits for the displayed value.
     */
    maxFraction?: string | number;
    /**
     * Sets the maximum allowed value.
     */
    maxValue?: string | number;
    /**
     * Sets the minimum allowed value.
     */
    minValue?: string | number;
    /**
     * Sets the increment/decrement steps value.
     */
    step?: string | number;
}

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
    minlength?: number | string;
    /**
     * The value monitored by v-model to maintain field value.
     */
    modelValue?: string;
    /**
     * Custom CSS class for the Popover container.
     */
    popoverCls?: string | string[];
    /**
     * Sets minimum width for the Popover container.
     */
    popoverMinWidth?: number | string;
    /**
     * Sets the Popover display placement.
     */
    popoverPlacement?: TPopoverPosition;
    /**
     * Sets animation transition when displaying the Popover container.
     */
    popoverTransition?: string;
}

export declare type TBsTextField = ComponentObjectPropsOptions<TTextFieldOptionProps>;

export declare type TBsTextArea = ComponentObjectPropsOptions<TTextAreaOptionProps>;

export declare type TBsChipField = ComponentObjectPropsOptions<TChipFieldOptionProps>;

export declare type TBsNumericField = ComponentObjectPropsOptions<TNumericFieldOptionProps>;

export declare type TBsSearchField = ComponentObjectPropsOptions<TSearchFieldOptionProps>;

declare type AllowedTextFieldProps = AllowedComponentProps & ComponentCustomProps & VNodeProps &
    EventUpdateModelValueProps<string | null> & {
    onBlur?: EventListener;
    onClear?: VoidFunction;
    onFocus?: EventListener;
    onKeydown?: EventListener;
}

export declare const BsTextField: {
    new(): {
        $props: AllowedTextFieldProps & TTextFieldOptionProps;
        $slots: {
            default?: (arg: { id: string }) => VNode[];
            'append-inner'?: () => VNode;
            'append-outer'?: () => VNode;
            'prepend-inner'?: () => VNode;
            'prepend-outer'?: () => VNode;
            'help-text'?: () => VNode;
        };
        $emit: [
            /**
             * Fired when this component lost focus.
             */
            'blur',
            /**
             * Fired when this component got focused.
             */
            'focus',
            /**
             * Fired when this component's value is being cleared.
             */
            'clear',
            /**
             * Triggers when cursor is still in the `<input>` element and keyboard key is pressed.
             */
            'keydown',
            /**
             * Fired when this component's value is updated.
             */
            'update:model-value',
        ];
    };
};

export declare const BsTextArea: {
    new(): {
        $props: AllowedTextFieldProps & TTextAreaOptionProps;
        $slots: {
            default?: (arg: { id: string }) => VNode[];
            'append-inner'?: () => VNode;
            'append-outer'?: () => VNode;
            'prepend-inner'?: () => VNode;
            'prepend-outer'?: () => VNode;
            'help-text'?: () => VNode;
        };
        $emit: [
            /**
             * Fired when this component lost focus.
             */
            'blur',
            /**
             * Fired when this component got focused.
             */
            'focus',
            /**
             * Fired when this component's value is being cleared.
             */
            'clear',
            /**
             * Triggers when cursor is still in the `<textarea>` element and keyboard key is pressed.
             */
            'keydown',
            /**
             * Fired when this component's value is updated.
             */
            'update:model-value',
        ];
    };
};

declare type AllowedChipFieldProps = AllowedComponentProps & ComponentCustomProps & VNodeProps &
    EventUpdateModelValueProps<string | string[]> & {
    onBlur?: EventListener;
    onClear?: VoidFunction;
    onFocus?: EventListener;
    onKeydown?: EventListener;
    'onDelete-item'?: (deletedItem: string) => void;
}

export declare const BsChipField: {
    new(): {
        $props: AllowedChipFieldProps & TChipFieldOptionProps;
        $slots: {
            default?: (arg: { id: string }) => VNode[];
            'append-inner'?: () => VNode;
            'append-outer'?: () => VNode;
            'prepend-inner'?: () => VNode;
            'prepend-outer'?: () => VNode;
            'help-text'?: () => VNode;
        };
        $emit: [
            /**
             * Fired when this ChipField lost focus.
             */
            'blur',
            /**
             * Fired when this ChipField got focused.
             */
            'focus',
            /**
             * Fired when this ChipField's value is being cleared.
             */
            'clear',
            /**
             * Fired when `KeyboardEvent` is triggered from the `<input>` element.
             */
            'keydown',
            /**
             * Fired when a chip is deleted from this ChipField.
             */
            'delete-item',
            /**
             * Fired when this ChipField's value is updated.
             */
            'update:model-value',
        ];
    };
};

declare type AllowedNumericFieldProps = AllowedComponentProps & ComponentCustomProps & VNodeProps &
    EventUpdateModelValueProps<number | null> & {
    onBlur?: EventListener;
    onClear?: VoidFunction;
    onFocus?: EventListener;
    onKeydown?: EventListener;
}

export declare const BsNumericField: {
    new(): {
        $props: AllowedNumericFieldProps & TNumericFieldOptionProps;
        $slots: {
            default?: (arg: { id: string }) => VNode[];
            'append-inner'?: () => VNode;
            'append-outer'?: () => VNode;
            'prepend-inner'?: () => VNode;
            'prepend-outer'?: () => VNode;
            'help-text'?: () => VNode;
        };
        $emit: [
            /**
             * Fired when this component lost focus.
             */
            'blur',
            /**
             * Fired when this component got focused.
             */
            'focus',
            /**
             * Fired when this component's value is being cleared.
             */
            'clear',
            /**
             * Triggers when cursor is still in the `<input>` element and keyboard key is pressed.
             */
            'keydown',
            /**
             * Fired when this component's value is updated.
             */
            'update:model-value',
        ];
    };
};

declare type AllowedSearchFieldProps = AllowedComponentProps & ComponentCustomProps & VNodeProps &
    EventUpdateModelValueProps<string | null> & {
    onBlur?: EventListener;
    onClear?: VoidFunction;
    onClose?: VoidFunction;
    onOpen?: VoidFunction;
    onFocus?: EventListener;
    onSearch?: (value: string) => void;
}

export declare const BsSearchField: {
    new(): {
        $props: AllowedSearchFieldProps & TSearchFieldOptionProps;
        $slots: {
            popover?: () => VNode[];
        };
        $emit: [
            /**
             * Fired when this component lost focus.
             */
            'blur',
            /**
             * Fired when this component got focused.
             */
            'focus',
            /**
             * Fired when this component's value is being cleared.
             */
            'clear',
            /**
             * Asks handler to start searching for the given keyword.
             */
            'search',
            /**
             * Fired when the Popover is show.
             */
            'open',
            /**
             * Fired when the Popover is hiding.
             */
            'close',
            /**
             * Fired when this component's value is updated.
             */
            'update:model-value',
        ];
    };
};

export declare const BsFieldPlugin = Plugin_1;
