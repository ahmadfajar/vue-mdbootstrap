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

export declare type TRadioProps = {
    id?: string;
    name?: string | number;
    disabled?: boolean;
    readonly?: boolean;
    color?: string;
    value: string | number | boolean | unknown;
    label: string;
}

export declare type TInputGroupProps<D, M> = TInputBaseProps & TValidationProps & {
    color?: string;
    column?: string | number;
    items: Array<D>;
    modelValue?: M;
}

export declare type TRadioOptionProps = TInputBaseProps & {
    color?: string;
    value?: string | number | boolean | unknown;
    modelValue?: string | number | boolean | unknown;
}

export declare type TRadioGroupOptionProps = TInputGroupProps<TRadioProps, string | number | boolean | unknown>;

export declare type TBsRadio = ComponentObjectPropsOptions<TRadioOptionProps>;

export declare type TBsRadioGroup = ComponentObjectPropsOptions<TRadioGroupOptionProps>;

export declare const BsRadio: DefineComponent<TBsRadio, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;

export declare const BsRadioGroup: DefineComponent<TBsRadioGroup, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;
