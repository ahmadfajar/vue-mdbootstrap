import type {ComponentObjectPropsOptions, ComponentOptionsMixin, ComputedOptions, DefineComponent, EmitsOptions} from "vue";
import type {TInputBaseProps, TRecord, TShapeStyle, TValidationProps} from "../../../types";

export declare type TInputFieldProps = TInputBaseProps & TValidationProps & {
    /**
     * Sets the action icon style variant.
     */
    actionIconVariant?: TShapeStyle;
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
     * The value monitored by `v-model` to maintain this field value.
     */
    modelValue?: string | number;
    /**
     * Sets the field placeholder.
     */
    placeholder?: string;
}

export declare type TTextFieldOptionProps = TInputTextProps & {
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
     * Sets `<textarea>` height in rows.
     */
    rows?: string | number;
    /**
     * Sets `<textarea>` height in pixel.
     */
    rowHeight?: string | number;
}

export declare type TBsTextField = ComponentObjectPropsOptions<TTextFieldOptionProps>;

export declare type TBsTextArea = ComponentObjectPropsOptions<TTextAreaOptionProps>;

export declare const BsTextField: DefineComponent<TBsTextField, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;

export declare const BsTextArea: DefineComponent<TBsTextArea, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;
