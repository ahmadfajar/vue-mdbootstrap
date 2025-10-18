import { Directive } from 'vue';

export declare type ClickOutside = Directive<HTMLElement> & {
  name?: 'click-outside';
};

export declare type Resize = Directive<HTMLElement> & {
  name?: 'resize';
};

export declare type Scroll = Directive<HTMLElement> & {
  name?: 'scroll';
};

export declare type Touch = Directive<HTMLElement> & {
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

export declare interface TouchEventListener {
  touchstart(e: TouchEvent): void;
  touchend(e: TouchEvent): void;
  touchmove(e: TouchEvent): void;
}
