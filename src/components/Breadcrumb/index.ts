import type { App, ObjectPlugin } from 'vue';
import BsBreadcrumb from './BsBreadcrumb';

const BsBreadcrumbPlugin: ObjectPlugin = {
    install: (app: App): void => {
        app.component(BsBreadcrumb.name as string, BsBreadcrumb);
    },
};

export { BsBreadcrumbPlugin, BsBreadcrumb };
