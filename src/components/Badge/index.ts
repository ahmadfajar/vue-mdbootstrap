import type { App, ObjectPlugin } from 'vue';
import BsBadge from './BsBadge';
import '../../../scss/_utilities.scss';
import './badge.scss';

const BsBadgePlugin: ObjectPlugin = {
    install: (app: App): void => {
        app.component(BsBadge.name as string, BsBadge);
    },
};

export { BsBadgePlugin, BsBadge };
