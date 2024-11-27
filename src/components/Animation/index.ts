import type { App, ObjectPlugin } from 'vue';
import BsExpandTransition from './BsExpandTransition';
import BsOverlay from './BsOverlay';
import BsRipple from './BsRipple';

const BsAnimationPlugin: ObjectPlugin = {
    install: (app: App): void => {
        app.component(BsExpandTransition.name as string, BsExpandTransition);
        app.component(BsOverlay.name as string, BsOverlay);
        app.component(BsRipple.name as string, BsRipple);
    },
};

export { BsAnimationPlugin, BsExpandTransition, BsOverlay, BsRipple };
