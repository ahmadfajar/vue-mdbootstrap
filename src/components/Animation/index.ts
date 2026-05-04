import type { App, ObjectPlugin } from 'vue';
import BsExpandTransition from './BsExpandTransition.ts';
import BsOverlay from './BsOverlay.ts';
import BsRipple from './BsRipple.ts';

const BsAnimationPlugin: ObjectPlugin = {
  install: (app: App): void => {
    app.component('BsExpandTransition', BsExpandTransition);
    app.component('BsOverlay', BsOverlay);
    app.component('BsRipple', BsRipple);
  },
};

export type * from '@/components/Animation/types';
export { BsAnimationPlugin, BsExpandTransition, BsOverlay, BsRipple };
