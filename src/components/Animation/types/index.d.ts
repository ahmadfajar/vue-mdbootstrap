export declare type TRipple = {
    uuid: string;
    waveStyles: Record<string, unknown>;
}

export declare type TRippleData = {
    ripples: TRipple[];
    eventType: string | null;
    touchTimeout?: number | undefined;
}

export declare type TSpinnerRecord = {
    styleTag?: ISpinnerElement;
    diameters: Set<number>;
}

export declare type TBsRippleOptionProps = {
    active?: boolean | Event;
    centered: boolean;
    disabled: boolean;
    eventTrigger?: boolean;
    tag: string;
}

export declare type TBsProgressOptionProps = {
    buffer: number;
    color: string;
    diameter: number;
    height: number;
    stroke: number;
    mode: string;
    type: string;
}

export declare interface IRippleEvent extends MouseEvent, TouchEvent {
}

export declare interface ISpinnerElement extends Element {
    sheet?: CSSStyleSheet;
}
