import type {
    AllowedComponentProps,
    ComponentCustomProps,
    ComponentObjectPropsOptions,
    Plugin,
    VNode,
    VNodeProps
} from 'vue';
import { EventClosableProps, EventUpdateModelValueProps, EventUpdateOpenProps } from '../../../types';
import type { TAvatarIconProps, TIconVariant } from '../../../types';

export declare type TAlertOptionProps = TAvatarIconProps & {
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
    iconType?: string;
    /**
     * Use predefined icon style to create contextual alert.
     */
    iconVariant?: TIconVariant;
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
    variant?: string;
}

export declare type TBsAlert = ComponentObjectPropsOptions<TAlertOptionProps>;

declare type AllowedAlertProps = AllowedComponentProps &
    ComponentCustomProps & VNodeProps & EventClosableProps &
    EventUpdateModelValueProps<boolean>;

export declare const BsAlert: {
    new(): {
        $props: AllowedAlertProps & TAlertOptionProps;
        $slots: {
            default?: () => VNode[];
            alertIcon?: () => VNode;
        };
        $emit: ['close', 'update:model-value'];
    };
};

export declare const BsAlertPlugin: {
    new(): Plugin;
};
