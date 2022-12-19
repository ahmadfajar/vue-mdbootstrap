import type {
    ComponentObjectPropsOptions,
    ComponentOptionsMixin,
    ComputedOptions,
    DefineComponent,
    EmitsOptions,
    TransitionProps
} from "vue";
import type {TRecord} from "../../../types";


export declare type TRippleOptionProps = {
    /**
     * Ripple animation state.
     */
    active?: boolean;
    /**
     * Start animation from center or from mouse click position.
     * If true then animation always start from center, otherwise animation
     * will start from mouse click position.
     */
    centered?: boolean;
    /**
     * Enable or disable ripple animation.
     */
    disabled?: boolean;
    /**
     * Html tag used to render this component.
     */
    tag?: string;
}

export declare type TOverlayOptionProps = {
    color?: string;
    fixed?: boolean;
    show?: boolean;
    opacity?: string | number;
    zIndex?: string | number;
}

export declare interface IRippleEvent extends MouseEvent, TouchEvent {
}

export declare type TBsOverlay = ComponentObjectPropsOptions<TOverlayOptionProps>;

export declare type TBsRipple = ComponentObjectPropsOptions<TRippleOptionProps>;

export declare const BsExpandTransition: DefineComponent<TransitionProps>;

export declare const BsOverlay: DefineComponent<TBsOverlay, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;

export declare const BsRipple: DefineComponent<TBsRipple, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>;
