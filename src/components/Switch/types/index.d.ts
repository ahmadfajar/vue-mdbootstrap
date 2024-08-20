import {
    AllowedComponentProps,
    ComponentCustomProps,
    ComponentObjectPropsOptions,
    Plugin,
    VNode,
    VNodeProps
} from 'vue';
import { EventUpdateModelValueProps, TLabelPosition, TRadioOptionProps } from '../../../types';

export declare type TSwitchOptionProps = TRadioOptionProps & {
    labelPosition?: TLabelPosition;
    labelClass?: string | string[];
    insetMode?: boolean;
    insetOutlined?: boolean;
    checkoffIcon?: boolean;
    checkedIcon?: boolean;
}

export declare type TBsSwitch = ComponentObjectPropsOptions<TSwitchOptionProps>;

declare type AllowedSwitchProps = AllowedComponentProps & ComponentCustomProps &
    VNodeProps & EventUpdateModelValueProps<string | number | boolean> & {
    onChecked?: (checked: boolean) => void;
    '@checked'?: (checked: boolean) => void;
}

export declare const BsSwitch: {
    new(): {
        $props: AllowedSwitchProps & TSwitchOptionProps;
        $slots: {
            default?: () => VNode[];
        };
        $emit: [
            /**
             * Fired when this component's state is changed.
             */
            'checked',
            /**
             * Fired when this component's checked value is updated.
             */
            'update:model-value',
        ];
    };
};

export declare const BsSwitchPlugin: Plugin;
