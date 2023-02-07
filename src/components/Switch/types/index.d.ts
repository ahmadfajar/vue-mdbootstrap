import type {ComponentObjectPropsOptions, ComponentOptionsMixin, ComputedOptions, DefineComponent, EmitsOptions} from "vue";
import type {TLabelPosition, TRadioOptionProps, TRecord} from "../../../types";

export declare type TSwitchOptionProps = TRadioOptionProps & {
    labelPosition?: TLabelPosition | string;
    labelClass?: string | string[];
    insetMode?: boolean;
    insetOutlined?: boolean;
    offIcon?: boolean;
    onIcon?: boolean;
}

export declare type TBsSwitch = ComponentObjectPropsOptions<TSwitchOptionProps>;

export declare const BsSwitch: DefineComponent<TBsSwitch, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;
