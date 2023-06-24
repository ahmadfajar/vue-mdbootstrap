import type { Directive } from 'vue';

export declare const ClickOutside: Directive;

export declare const Resize: Directive;

export declare const Scroll: Directive;

export declare interface TouchDirectiveEvent {
    touchstartX: number;
    touchstartY: number;
    touchendX: number;
    touchendY: number;
    touchmoveX: number;
    touchmoveY: number;
    deltaX: number;
    deltaY: number;
    left?: (evt: TouchDirectiveEvent) => void;
    right?: (evt: TouchDirectiveEvent) => void;
    up?: (evt: TouchDirectiveEvent) => void;
    down?: (evt: TouchDirectiveEvent) => void;
    start?: (evt: TouchDirectiveEvent) => void;
    move?: (evt: TouchDirectiveEvent) => void;
    end?: (evt: TouchDirectiveEvent) => void;
}
export declare const Touch: Directive;
