import type {
    ComponentObjectPropsOptions,
    ComponentOptionsMixin,
    ComputedOptions,
    DefineComponent,
    EmitsOptions
} from "vue";
import type {TAvatarIconProps, TIconVariant, TRecord} from "../../../types";

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

export declare const BsAlert: DefineComponent<TBsAlert, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;
