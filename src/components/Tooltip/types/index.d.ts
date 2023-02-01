import type {
    ComponentObjectPropsOptions,
    ComponentOptionsMixin,
    ComputedOptions,
    DefineComponent,
    EmitsOptions
} from "vue";
import type {TPositionType, TRecord} from "../../../types";

export declare type TTooltipOptionProps = {
    /**
     * This tooltip content.
     */
    content: string;
    /**
     * Put this tooltip into disable state.
     */
    disabled?: boolean;
    /**
     * Value monitored by `v-model` to show or hide this tooltip programmatically.
     */
    show?: boolean;
    /**
     * This tooltip display placement.
     */
    placement?: TPositionType;
    /**
     * This tooltip display width.
     */
    width?: string | number;
    /**
     * This tooltip maximum display width.
     */
    maxWidth?: string | number;
    /**
     * This tooltip inline-css 'z-index'.
     */
    zIndex?: string | number;
}

export declare type TBsTooltip = ComponentObjectPropsOptions<TTooltipOptionProps>;

export declare const BsTooltip: DefineComponent<TBsTooltip, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;
