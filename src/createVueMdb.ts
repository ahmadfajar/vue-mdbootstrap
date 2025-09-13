import type { App, Component } from 'vue';
import { createApp } from 'vue';
import * as _cmpPlugins from './components';
import * as _directives from './directives';
import { AxiosPlugin } from './utils/AxiosPlugin';

export function createVueMdb(rootComponent: Component): App {
  const vApp = createApp(rootComponent);

  for (const [key, drv] of Object.entries(_directives)) {
    // console.info(`${key}: ${drv}`);
    vApp.directive(key, drv);
  }

  vApp.use(AxiosPlugin);
  for (const [_key, plg] of Object.entries(_cmpPlugins)) {
    // console.info(`${key}: ${plg}`);
    plg && vApp.use(plg);
  }

  return vApp;
}
