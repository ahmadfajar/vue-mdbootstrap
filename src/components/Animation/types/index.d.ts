export declare type TRipple = {
    uuid: string;
    waveStyles: Record<string, unknown>;
}

export declare type TRippleData = {
    ripples: TRipple[];
    eventType: string | null;
    touchTimeout?: number | undefined;
}

export declare type TBsRippleOptionProps = {
    active?: boolean | Event;
    centered: boolean;
    disabled: boolean;
    eventTrigger?: boolean;
    tag: string;
}

export declare interface IRippleEvent extends MouseEvent, TouchEvent {
}
