import type { App, Component } from 'vue';
import { createApp } from 'vue';
import { AxiosPlugin } from './utils/AxiosPlugin';
import * as _directives from './directives';
import * as _cmpPlugins from './components';

import '../scss/banner.scss';
import '../scss/global_vars.scss';
import '../scss/css_animation.scss';
import '../scss/base/colors.scss';
import '../scss/base/others.scss';
import '../scss/base/shadows.scss';
import './components/Animation/animation.scss';
import './components/Alert/alert.scss';
import './components/Card/card.scss';
import './components/Container/container.scss';
import './components/Appbar/appbar.scss';
import './components/Basic/basic.scss';
import './components/Icon/icon.scss';
import './components/Avatar/avatar.scss';
import './components/Badge/badge.scss';
import './components/Drawer/sidedrawer.scss';
import './components/Field/field.scss';
import './components/Field/chipField.scss';
import './components/Field/numericField.scss';
import './components/Field/searchField.scss';
import './components/Checkbox/checkbox.scss';
import './components/Radio/radio.scss';
import './components/Switch/switch.scss';
import './components/Chip/chip.scss';
import './components/Chip/chipGroup.scss';
import './components/Combobox/combobox.scss';
import './components/Button/button.scss';
import './components/Listbox/listbox.scss';
import './components/ListView/listView.scss';
import './components/ListView/listNav.scss';
import './components/ListView/listTile.scss';
import './components/ColorPicker/colorPicker.scss';
import './components/DatePicker/datePicker.scss';
import './components/Progress/progress.scss';
import './components/Popover/popover.scss';
import './components/Menu/dropdownMenu.scss';
import './components/Modal/modal.scss';
import './components/Modal/lightbox.scss';
import './components/Notification/notification.scss';
import './components/Tabs/tabView.scss';
import './components/Tooltip/tooltip.scss';

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
