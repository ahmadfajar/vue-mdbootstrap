import {
    AllowedComponentProps,
    ComponentCustomProps,
    ComponentObjectPropsOptions,
    Plugin,
    VNode,
    VNodeProps
} from 'vue';
import { EventUpdateModelValueProps, TInputGroupProps, TRadioOptionProps, TRadioProps } from '../../../types';

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

declare type AllowedCheckboxProps = AllowedComponentProps & ComponentCustomProps &
    VNodeProps & EventUpdateModelValueProps<string | number | boolean | null> & {
    onChecked?: (checked: boolean) => void;
    '@checked'?: (checked: boolean) => void;
}

declare type AllowedCheckboxGroupProps = AllowedComponentProps & ComponentCustomProps &
    VNodeProps & EventUpdateModelValueProps<string[] | number[] | unknown[]>;

export declare const BsCheckbox: {
    new(): {
        $props: AllowedCheckboxProps & TCheckboxOptionProps;
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

export declare const BsCheckboxGroup: {
    new(): {
        $props: AllowedCheckboxGroupProps & TCheckboxGroupOptionProps;
        $slots: {
            default?: () => VNode[];
            'help-text'?: () => VNode;
        };
        $emit: [
            /**
             * Fired when this component's checked value is updated.
             */
            'update:model-value',
        ];
    };
};

export declare const BsCheckboxPlugin: Plugin;

