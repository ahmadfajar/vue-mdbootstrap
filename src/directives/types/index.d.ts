import { Directive } from 'vue';

export declare const ClickOutside: Directive<HTMLElement>;

export declare const Resize: Directive<HTMLElement>;

export declare const Scroll: Directive<HTMLElement>;

export declare const Touch: Directive<HTMLElement>;

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

export declare interface TouchEventListener {
  touchstart(e: TouchEvent): void;
  touchend(e: TouchEvent): void;
  touchmove(e: TouchEvent): void;
}
