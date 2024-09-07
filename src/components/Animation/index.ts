import type { App, Plugin } from 'vue';
import BsExpandTransition from './BsExpandTransition';
import BsOverlay from './BsOverlay';
import BsRipple from './BsRipple';
import '../../../scss/_transitions.scss';
import './animation.scss';

const BsAnimationPlugin: Plugin = {
    install: (app: App): void => {
        app.component(BsExpandTransition.name as string, BsExpandTransition);
        app.component(BsOverlay.name as string, BsOverlay);
        app.component(BsRipple.name as string, BsRipple);
    },
};

export { BsAnimationPlugin, BsExpandTransition, BsOverlay, BsRipple };
