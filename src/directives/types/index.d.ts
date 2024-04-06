import { ObjectDirective } from 'vue';

export declare const vClickOutside: ObjectDirective<HTMLElement> & {
    name?: 'click-outside';
};

export declare const vResize: ObjectDirective<HTMLElement> & {
    name?: 'resize';
};

export declare const vScroll: ObjectDirective<HTMLElement> & {
    name?: 'scroll';
};

export declare const vTouch: ObjectDirective<HTMLElement> & {
    name?: 'touch';
};

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
