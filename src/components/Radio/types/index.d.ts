import type {
    AllowedComponentProps,
    ComponentCustomProps,
    ComponentObjectPropsOptions,
    Plugin as Plugin_1,
    VNode,
    VNodeProps
} from 'vue';
import type { EventUpdateModelValueProps, TValidationProps } from '../../../types';

export declare type TInputBaseProps = {
    /**
     * Sets the `<input>` element `ID` attribute. This property value is auto generates.
     */
    id?: string;
    /**
     * Sets the `<input>` element `name` attribute.
     */
    name?: string | number;
    /**
     * This input field state.
     */
    disabled?: boolean;
    /**
     * This input field state.
     */
    readonly?: boolean;
    /**
     * Whether this input field is required or not.
     */
    required?: boolean;
}

export declare type TRadioProps = {
    /**
     * Sets the `<input>` element `ID` attribute. This property value is auto generates.
     */
    id?: string;
    /**
     * Sets the `<input>` element `name` attribute.
     */
    name?: string | number;
    /**
     * This input field state.
     */
    disabled?: boolean;
    /**
     * This input field state.
     */
    readonly?: boolean;
    /**
     * Sets this component color.
     */
    color?: string;
    /**
     * The `<input>` element `value` attribute.
     */
    value: string | number | boolean | unknown;
    /**
     * The text label to display.
     */
    label: string;
}

export declare type TInputGroupProps<D, M> = TInputBaseProps & TValidationProps & {
    /**
     * Sets this component color.
     */
    color?: string;
    /**
     * Sets the maximum number of columns to display the checkbox. When the number of items
     * exceed the number of columns, then the remaining items will be displayed on the
     * next row. The maximum number of columns must be less than 7.
     */
    column?: string | number;
    /**
     * The collection of `<bs-radio>` property-value.
     */
    items: Array<D>;
    /**
     * The value monitored by `v-model` to maintain the checked state.
     */
    modelValue?: M;
}

export declare type TRadioOptionProps = TInputBaseProps & {
    /**
     * Sets this component color.
     */
    color?: string;
    /**
     * The `<input>` element `value` attribute.
     */
    value?: string | number | boolean | unknown;
    /**
     * The input value to be monitored by `v-model`.
     */
    modelValue?: string | number | boolean | unknown;
}

export declare type TRadioGroupOptionProps = TInputGroupProps<TRadioProps, string | number | boolean | unknown>;

export declare type TBsRadio = ComponentObjectPropsOptions<TRadioOptionProps>;

export declare type TBsRadioGroup = ComponentObjectPropsOptions<TRadioGroupOptionProps>;

declare type AllowedRadioProps = AllowedComponentProps & ComponentCustomProps &
    VNodeProps & EventUpdateModelValueProps<string | number | boolean> & {
    onChecked?: (checked: boolean) => void;
}

declare type AllowedRadioGroupProps = AllowedComponentProps & ComponentCustomProps &
    VNodeProps & EventUpdateModelValueProps<string | number>;

export declare const BsRadio: {
    new(): {
        $props: AllowedRadioProps & TRadioOptionProps;
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

export declare const BsRadioGroup: {
    new(): {
        $props: AllowedRadioGroupProps & TRadioGroupOptionProps;
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

export declare const BsRadioPlugin = Plugin_1;
