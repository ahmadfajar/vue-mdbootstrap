import type {ComponentObjectPropsOptions, ComponentOptionsMixin, ComputedOptions, DefineComponent, EmitsOptions} from "vue";
import type {TInputGroupProps, TRadioOptionProps, TRadioProps, TRecord} from "../../../types";

export declare type TCheckboxProps = TRadioProps & {
    indeterminate?: boolean;
}

export declare type TCheckboxOptionProps = TRadioOptionProps & {
    indeterminate?: boolean;
}

export declare type TCheckboxGroupOptionProps = TInputGroupProps<TCheckboxProps, Array<string | number | unknown>> & {
    indeterminate?: boolean;
}

export declare type TBsCheckbox = ComponentObjectPropsOptions<TCheckboxOptionProps>;

export declare type TBsCheckboxGroup = ComponentObjectPropsOptions<TCheckboxGroupOptionProps>;

export declare const BsCheckbox: DefineComponent<TBsCheckbox, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;

export declare const BsCheckboxGroup: DefineComponent<TBsCheckboxGroup, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;
