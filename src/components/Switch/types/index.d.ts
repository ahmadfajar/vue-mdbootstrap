import type {
    ComponentObjectPropsOptions,
    ComponentOptionsMixin,
    ComputedOptions,
    DefineComponent,
    EmitsOptions,
    MethodOptions,
    Plugin
} from 'vue';
import type { TLabelPosition, TRadioOptionProps, TRecord } from '../../../types';

export declare type TSwitchOptionProps = TRadioOptionProps & {
    labelPosition?: TLabelPosition | string;
    labelClass?: string | string[];
    insetMode?: boolean;
    insetOutlined?: boolean;
    checkoffIcon?: boolean;
    checkedIcon?: boolean;
}

export declare type TBsSwitch = ComponentObjectPropsOptions<TSwitchOptionProps>;

export declare const BsSwitch: DefineComponent<TBsSwitch, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>;

export declare const BsSwitchPlugin: Plugin;
