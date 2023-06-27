import type { App, Component, Directive } from 'vue';
import { createApp } from 'vue';
import * as _cmpPlugins from './components';
import * as _directives from './directives';
import { AxiosPlugin } from './utils/AxiosPlugin';

export { AxiosPlugin } from './utils/AxiosPlugin';
export * from "./model";
export * from './shared';
export { default as Helper } from './utils/Helper';

export function createVueMdb(rootComponent: Component): App {
    const vApp = createApp(rootComponent);

    vApp.use(AxiosPlugin);
    Object.values(_cmpPlugins).forEach(plg => vApp.use(plg));
    for (const key in _directives) {
        if (Object.hasOwn(_directives, key)) {
            // @ts-ignore
            vApp.directive(key, _directives[key] as Directive);
        }
    }

    return vApp;
}
