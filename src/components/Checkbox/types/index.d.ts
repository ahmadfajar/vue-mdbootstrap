import {ComponentObjectPropsOptions, ComponentOptionsMixin, ComputedOptions, DefineComponent, EmitsOptions} from "vue";
import {TRecord} from "../../../types";

export declare type TValidator = {
    validators: TRecord;
    messages: TRecord;
    hasError: boolean;
    dirty: boolean;
}

export declare type TValidationProps = {
    helpText?: string;
    persistentHelpText?: boolean;
    validator?: TValidator;
    /**
     * Deprecated, use `validator` property instead.
     */
    externalValidator?: TValidator;
}

export declare type TInputBaseProps = {
    id?: string;
    name?: string | number;
    disabled?: boolean;
    readonly?: boolean;
    required?: boolean;
}

export declare type TCheckboxProps = {
    id?: string;
    name?: string | number;
    disabled?: boolean;
    readonly?: boolean;
    color?: string;
    indeterminate?: boolean;
    value: string | number | boolean | unknown;
    label: string;
}

export declare type TCheckboxOptionProps = TInputBaseProps & {
    color?: string;
    indeterminate?: boolean;
    value?: string | number | boolean | unknown;
    modelValue?: string | number | boolean | unknown;
}

export declare type TCheckboxGroupOptionProps = TInputBaseProps & TValidationProps & {
    color?: string;
    column?: string | number;
    indeterminate?: boolean;
    items: Array<TCheckboxProps>;
    modelValue?: Array<string | number | unknown>;
}

export declare type TBsCheckbox = ComponentObjectPropsOptions<TCheckboxOptionProps>;

export declare type TBsCheckboxGroup = ComponentObjectPropsOptions<TCheckboxGroupOptionProps>;

export declare const BsCheckbox = DefineComponent<TBsCheckbox, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;

export declare const BsCheckboxGroup = DefineComponent<TBsCheckboxGroup, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;
