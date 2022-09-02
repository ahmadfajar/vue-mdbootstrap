import {ComponentObjectPropsOptions, ComponentOptionsMixin, ComputedOptions, DefineComponent, EmitsOptions} from "vue";
import {TRecord} from "../../../types";

export declare type TInputBaseProps = {
    id?: string;
    name?: string | number;
    disabled?: boolean;
    readonly?: boolean;
    required?: boolean;
}

export declare type TCheckboxOptionProps = TInputBaseProps & {
    color?: string;
    indeterminate?: boolean;
    value?: string | number | boolean | unknown;
    modelValue?: string | number | boolean | unknown;
}

export declare type TBsCheckbox = ComponentObjectPropsOptions<TCheckboxOptionProps>;

export declare const BsCheckbox = DefineComponent<TBsCheckbox, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;
