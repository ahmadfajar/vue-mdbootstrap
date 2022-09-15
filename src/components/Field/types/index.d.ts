import {ComponentObjectPropsOptions, ComponentOptionsMixin, ComputedOptions, DefineComponent, EmitsOptions} from "vue";
import {TInputBaseProps, TValidationProps} from "../../Radio/types";
import {TRecord} from "../../../types";

export declare type TInputFieldProps = TInputBaseProps & TValidationProps & {
    flat?: boolean;
    filled?: boolean;
    floatingLabel?: boolean;
    outlined?: boolean;
    appendIcon?: string;
    prependIcon?: string;
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
    actionIconVariant?: string;
    clearButton?: boolean;
    passwordToggle?: boolean;
    validationIcon?: boolean;
    appendIconOuter?: string;
    prependIconOuter?: string;
    maxlength?: string | number;
    minlength?: string | number;
}

export declare type TBsTextField = ComponentObjectPropsOptions<TTextFieldOptionProps>;

export declare const BsTextField: DefineComponent<TBsTextField, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;
