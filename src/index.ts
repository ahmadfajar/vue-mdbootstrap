import type {App, Component, Directive} from "vue";
import {createApp} from "vue";
import * as _cmpPlugins from './components';
import * as _directives from './directives';
import {AxiosPlugin} from './utils/AxiosPlugin';

export {AxiosPlugin} from "./utils/AxiosPlugin";
export {
    RestProxyAdapter, AbstractStore,
    BsArrayStore, BsStore, BsModel
} from "./model";
export {default as Helper} from "./utils/Helper";
export {
    useMobileDevice, useBreakpointMax, useBreakpointMin, useAxiosPlugin,
    useHttpService, useCurrentRoute, useMergeClass, useCreateSvgComponent,
    StringHelper
} from "./shared";

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
    // app.directive("click-outside", _directives.ClickOutside);
    // app.directive("resize", _directives.Resize);
    // app.directive("scroll", _directives.Scroll);
    // app.directive("touch", _directives.Touch);

    return vApp;
}
