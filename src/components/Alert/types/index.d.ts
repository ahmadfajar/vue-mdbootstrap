import {
    AllowedComponentProps,
    ComponentCustomProps,
    ComponentObjectPropsOptions,
    ObjectPlugin,
    VNode,
    VNodeProps,
} from 'vue';
import { EventUpdateModelValueProps, EventVoidClosableProps, TIconProps } from '../../../types';

export declare type TAlertVariant = 'success' | 'info' | 'warning' | 'danger' | 'help';

export declare type TAlertOptionProps = TIconProps & {
    /**
     * Alert color
     */
    color?: string;
    /**
     * When sets, display the close button to dismiss/hide the component.
     */
    dismissible?: boolean;
    /**
     * Create alert with solid fill style.
     */
    filled?: boolean;
    /**
     * @deprecated
     * Use `variant` property instead.
     */
    iconType?: TAlertVariant;
    /**
     * The value monitored by `v-model` to display or hide the alert component.
     */
    modelValue?: boolean;
    /**
     * Create outlined alert style.
     */
    outlined?: boolean;
    /**
     * @deprecated
     * Use `filled` property instead.
     */
    solidFill?: boolean;
    /**
     * The component animation transition to display/hide.
     */
    transition?: string;
    /**
     * Use predefined icon to create contextual alert.
     */
    variant?: TAlertVariant;
};

export declare type TBsAlert = ComponentObjectPropsOptions<TAlertOptionProps>;

declare type AllowedAlertProps = AllowedComponentProps &
    ComponentCustomProps &
    VNodeProps &
    EventVoidClosableProps &
    EventUpdateModelValueProps<boolean>;

export declare const BsAlert: {
    new (): {
        $props: AllowedAlertProps & TAlertOptionProps;
        $slots: {
            default?: () => VNode[];
            icon?: () => VNode;
        };
        $emit: ['close', 'update:model-value'];
    };
};

export declare const BsAlertPlugin: ObjectPlugin;
