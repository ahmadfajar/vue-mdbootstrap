import {DefineComponent, TransitionProps} from "vue";

export declare type TRipple = {
    uuid: string;
    waveStyles: Record<string, unknown>;
}

export declare type TRippleData = {
    ripples: TRipple[];
    eventType: string | null;
    touchTimeout?: number | undefined;
}

export declare type TRippleOptionProps = {
    active?: boolean | Event;
    centered: boolean;
    disabled: boolean;
    eventTrigger?: boolean;
    tag: string;
}

export declare type TOverlayOptionProps = {
    color?: string;
    fixed: boolean;
    opacity?: string | number;
    show: boolean;
    zIndex?: number;
}

export declare interface IRippleEvent extends MouseEvent, TouchEvent {
}

export declare const BsExpandTransition: DefineComponent<TransitionProps>;

export declare const BsOverlay: DefineComponent<TOverlayOptionProps>;

export declare const BsRipple: DefineComponent<TRippleOptionProps>;
