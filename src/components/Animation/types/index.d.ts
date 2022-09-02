import {
    ComponentObjectPropsOptions,
    ComponentOptionsMixin,
    ComputedOptions,
    DefineComponent,
    EmitsOptions,
    TransitionProps
} from "vue";
import {TRecord} from "../../../types";

export declare type TRipple = {
    uuid: string;
    waveStyles: TRecord;
}

export declare type TRippleData = {
    ripples: TRipple[];
    eventType: string | null;
    touchTimeout?: number | undefined;
}

export declare type TRippleOptionProps = {
    active?: boolean;
    centered?: boolean;
    disabled?: boolean;
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
