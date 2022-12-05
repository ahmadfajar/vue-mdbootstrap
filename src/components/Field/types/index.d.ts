import type {ComponentObjectPropsOptions, ComponentOptionsMixin, ComputedOptions, DefineComponent, EmitsOptions} from "vue";
import type {TInputBaseProps, TRecord, TShapeStyle, TValidationProps} from "../../../types";

export declare type TInputFieldProps = TInputBaseProps & TValidationProps & {
    actionIconVariant?: TShapeStyle;
    clearButton?: boolean;
    flat?: boolean;
    filled?: boolean;
    floatingLabel?: boolean;
    outlined?: boolean;
    validationIcon?: boolean;
    appendIcon?: string;
    appendIconOuter?: string;
    prependIcon?: string;
    prependIconOuter?: string;
}

export declare type TInputTextProps = TInputFieldProps & {
    autocomplete?: string | boolean;
    autofocus?: boolean;
    modelValue?: string | number;
    placeholder?: string;
}

export declare type TTextFieldOptionProps = TInputTextProps & {
    type?: string;
    datalist?: string;
    passwordToggle?: boolean;
    maxlength?: string | number;
    minlength?: string | number;
}

export declare type TTextAreaOptionProps = TInputTextProps & {
    autoGrow?: boolean;
    noResize?: boolean;
    rows?: string | number;
    rowHeight?: string | number;
}

export declare type TBsTextField = ComponentObjectPropsOptions<TTextFieldOptionProps>;

export declare type TBsTextArea = ComponentObjectPropsOptions<TTextAreaOptionProps>;

export declare const BsTextField: DefineComponent<TBsTextField, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;

export declare const BsTextArea: DefineComponent<TBsTextArea, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;
