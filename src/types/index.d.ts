import { AxiosInstance } from 'axios';
import { BsAlert } from '../components/Alert/types';
import { BsExpandTransition, BsOverlay, BsRipple } from '../components/Animation/types';
import { BsAppbar, BsAppbarItems, BsAppbarTitle } from '../components/Appbar/types';
import { BsAvatar } from '../components/Avatar/types';
import { BsBadge } from '../components/Badge/types';
import { BsDivider, BsImageHolder, BsSpacer, BsSubheader } from '../components/Basic/types';
import { BsButton, BsToggleButton, BsToggleField } from '../components/Button/types';
import { BsCard, BsCardBody, BsCardContent, BsCardFooter, BsCardHeader, BsCardMedia } from '../components/Card/types';
import { BsCheckbox, BsCheckboxGroup } from '../components/Checkbox/types';
import { BsChip, BsChipGroup } from '../components/Chip/types';
import { BsColorPicker } from '../components/ColorPicker/types';
import { BsCombobox } from '../components/Combobox/types';
import { BsAppContainer, BsContainer, BsContent } from '../components/Container/types';
import { BsDatePicker, BsDateTimeField } from '../components/DatePicker/types';
import { BsSideDrawer } from '../components/Drawer/types';
import { BsChipField, BsNumericField, BsSearchField, BsTextArea, BsTextField } from '../components/Field/types';
import { BsIcon, BsIconSpinner, BsIconSvg, BsToggleIcon } from '../components/Icon/types';
import { BsListbox } from '../components/Listbox/types';
import {
    BsListNav,
    BsListNavItem,
    BsListTile,
    BsListTileAction,
    BsListTileContent,
    BsListTileLeading,
    BsListTileSubtitle,
    BsListTileTitle,
    BsListView
} from '../components/ListView/types';
import { BsDropdownMenu } from '../components/Menu/types';
import { BsLightbox, BsModal } from '../components/Modal/types';
import { BsNotification, INotificationProvider } from '../components/Notification/types';
import { BsPopover } from '../components/Popover/types';
import { BsMaskLoader, BsProgress, BsProgressBar } from '../components/Progress/types';
import { BsRadio, BsRadioGroup } from '../components/Radio/types';
import { BsSwitch } from '../components/Switch/types';
import { BsTab, BsTabs } from '../components/Tabs/types';
import { BsTooltip } from '../components/Tooltip/types';
import { IHttpService, TVueMdb } from './library';

export * from '../components/Alert/types';
export * from '../components/Animation/types';
export * from '../components/Appbar/types';
export * from '../components/Avatar/types';
export * from '../components/Badge/types';
export * from '../components/Basic/types';
export * from '../components/Button/types';
export * from '../components/Card/types';
export * from '../components/Checkbox/types';
export * from '../components/Chip/types';
export * from '../components/ColorPicker/types';
export * from '../components/Combobox/types';
export * from '../components/Container/types';
export * from '../components/DatePicker/types';
export * from '../components/Drawer/types';
export * from '../components/Field/types';
export * from '../components/Icon/types';
export * from '../components/Listbox/types';
export * from '../components/ListView/types';
export * from '../components/Menu/types';
export * from '../components/Popover/types';
export * from '../components/Progress/types';
export * from '../components/Radio/types';
export * from '../components/Switch/types';
export * from '../components/Tabs/types';
export * from '../components/Tooltip/types';
export * from '../components/Modal/types';
export * from '../components/Notification/types';
export * from '../directives/types';
export * from './library';

/**
 * @internal
 */
declare interface TypesConfig {
}

declare module '@vue/runtime-core' {
    export interface GlobalComponents {
        BsAlert: TypesConfig extends Record<'BsAlert', infer T> ? T : typeof BsAlert
        BsAppContainer: TypesConfig extends Record<'BsAppContainer', infer T> ? T : typeof BsAppContainer
        BsAppbar: TypesConfig extends Record<'BsAppbar', infer T> ? T : typeof BsAppbar
        BsAppbarItems: TypesConfig extends Record<'BsAppbarItems', infer T> ? T : typeof BsAppbarItems
        BsAppbarTitle: TypesConfig extends Record<'BsAppbarTitle', infer T> ? T : typeof BsAppbarTitle
        BsAvatar: TypesConfig extends Record<'BsAvatar', infer T> ? T : typeof BsAvatar
        BsBadge: TypesConfig extends Record<'BsBadge', infer T> ? T : typeof BsBadge
        BsButton: TypesConfig extends Record<'BsButton', infer T> ? T : typeof BsButton
        BsButtonToggle: TypesConfig extends Record<'BsButtonToggle', infer T> ? T : typeof BsToggleButton
        BsButtonToggleField: TypesConfig extends Record<'BsButtonToggleField', infer T> ? T : typeof BsToggleField
        BsCard: TypesConfig extends Record<'BsCard', infer T> ? T : typeof BsCard
        BsCardBody: TypesConfig extends Record<'BsCardBody', infer T> ? T : typeof BsCardBody
        BsCardContent: TypesConfig extends Record<'BsCardContent', infer T> ? T : typeof BsCardContent
        BsCardFooter: TypesConfig extends Record<'BsCardFooter', infer T> ? T : typeof BsCardFooter
        BsCardHeader: TypesConfig extends Record<'BsCardHeader', infer T> ? T : typeof BsCardHeader
        BsCardMedia: TypesConfig extends Record<'BsCardMedia', infer T> ? T : typeof BsCardMedia
        BsCheckbox: TypesConfig extends Record<'BsCheckbox', infer T> ? T : typeof BsCheckbox
        BsCheckboxGroup: TypesConfig extends Record<'BsCheckboxGroup', infer T> ? T : typeof BsCheckboxGroup
        BsChip: TypesConfig extends Record<'BsChip', infer T> ? T : typeof BsChip
        BsChipField: TypesConfig extends Record<'BsChipField', infer T> ? T : typeof BsChipField
        BsChipGroup: TypesConfig extends Record<'BsChipGroup', infer T> ? T : typeof BsChipGroup
        BsColorPicker: TypesConfig extends Record<'BsColorPicker', infer T> ? T : typeof BsColorPicker
        BsCombobox: TypesConfig extends Record<'BsCombobox', infer T> ? T : typeof BsCombobox
        BsContainer: TypesConfig extends Record<'BsContainer', infer T> ? T : typeof BsContainer
        BsContent: TypesConfig extends Record<'BsContent', infer T> ? T : typeof BsContent
        BsDatePicker: TypesConfig extends Record<'BsDatePicker', infer T> ? T : typeof BsDatePicker
        BsDateTimeField: TypesConfig extends Record<'BsDateTimeField', infer T> ? T : typeof BsDateTimeField
        BsDivider: TypesConfig extends Record<'BsDivider', infer T> ? T : typeof BsDivider
        BsDropdownMenu: TypesConfig extends Record<'BsDropdownMenu', infer T> ? T : typeof BsDropdownMenu
        BsExpandTransition: TypesConfig extends Record<'BsExpandTransition', infer T> ? T : typeof BsExpandTransition
        BsIcon: TypesConfig extends Record<'BsIcon', infer T> ? T : typeof BsIcon
        BsIconSpinner: TypesConfig extends Record<'BsIconSpinner', infer T> ? T : typeof BsIconSpinner
        BsIconSvg: TypesConfig extends Record<'BsIconSvg', infer T> ? T : typeof BsIconSvg
        BsIconToggle: TypesConfig extends Record<'BsIconToggle', infer T> ? T : typeof BsToggleIcon
        BsImageHolder: TypesConfig extends Record<'BsImageHolder', infer T> ? T : typeof BsImageHolder
        BsLightbox: TypesConfig extends Record<'BsLightbox', infer T> ? T : typeof BsLightbox
        BsListNav: TypesConfig extends Record<'BsListNav', infer T> ? T : typeof BsListNav
        BsListNavItem: TypesConfig extends Record<'BsListNavItem', infer T> ? T : typeof BsListNavItem
        BsListTile: TypesConfig extends Record<'BsListTile', infer T> ? T : typeof BsListTile
        BsListTileAction: TypesConfig extends Record<'BsListTileAction', infer T> ? T : typeof BsListTileAction
        BsListTileContent: TypesConfig extends Record<'BsListTileContent', infer T> ? T : typeof BsListTileContent
        BsListTileLeading: TypesConfig extends Record<'BsListTileLeading', infer T> ? T : typeof BsListTileLeading
        BsListTileSubtitle: TypesConfig extends Record<'BsListTileSubtitle', infer T> ? T : typeof BsListTileSubtitle
        BsListTileTitle: TypesConfig extends Record<'BsListTileTitle', infer T> ? T : typeof BsListTileTitle
        BsListView: TypesConfig extends Record<'BsListView', infer T> ? T : typeof BsListView
        BsListbox: TypesConfig extends Record<'BsListbox', infer T> ? T : typeof BsListbox
        BsMaskLoader: TypesConfig extends Record<'BsMaskLoader', infer T> ? T : typeof BsMaskLoader
        BsModal: TypesConfig extends Record<'BsModal', infer T> ? T : typeof BsModal
        BsNotification: TypesConfig extends Record<'BsNotification', infer T> ? T : typeof BsNotification
        BsNumericField: TypesConfig extends Record<'BsNumericField', infer T> ? T : typeof BsNumericField
        BsOverlay: TypesConfig extends Record<'BsOverlay', infer T> ? T : typeof BsOverlay
        BsPopover: TypesConfig extends Record<'BsPopover', infer T> ? T : typeof BsPopover
        BsProgress: TypesConfig extends Record<'BsProgress', infer T> ? T : typeof BsProgress
        BsProgressBar: TypesConfig extends Record<'BsProgressBar', infer T> ? T : typeof BsProgressBar
        BsRadio: TypesConfig extends Record<'BsRadio', infer T> ? T : typeof BsRadio
        BsRadioGroup: TypesConfig extends Record<'BsRadioGroup', infer T> ? T : typeof BsRadioGroup
        BsRipple: TypesConfig extends Record<'BsRipple', infer T> ? T : typeof BsRipple
        BsSearchField: TypesConfig extends Record<'BsSearchField', infer T> ? T : typeof BsSearchField
        BsSideDrawer: TypesConfig extends Record<'BsSideDrawer', infer T> ? T : typeof BsSideDrawer
        BsSpacer: TypesConfig extends Record<'BsSpacer', infer T> ? T : typeof BsSpacer
        BsSubheader: TypesConfig extends Record<'BsSubheader', infer T> ? T : typeof BsSubheader
        BsSwitch: TypesConfig extends Record<'BsSwitch', infer T> ? T : typeof BsSwitch
        BsTab: TypesConfig extends Record<'BsTab', infer T> ? T : typeof BsTab
        BsTabs: TypesConfig extends Record<'BsTabs', infer T> ? T : typeof BsTabs
        BsTextArea: TypesConfig extends Record<'BsTextArea', infer T> ? T : typeof BsTextArea
        BsTextField: TypesConfig extends Record<'BsTextField', infer T> ? T : typeof BsTextField
        BsToggleButton: TypesConfig extends Record<'BsToggleButton', infer T> ? T : typeof BsToggleButton
        BsToggleField: TypesConfig extends Record<'BsToggleField', infer T> ? T : typeof BsToggleField
        BsToggleIcon: TypesConfig extends Record<'BsToggleIcon', infer T> ? T : typeof BsToggleIcon
        BsTooltip: TypesConfig extends Record<'BsTooltip', infer T> ? T : typeof BsTooltip
    }

    export interface ComponentCustomProperties {
        $axios: TypesConfig extends Record<'$axios', infer T> ? T : AxiosInstance
        $http: TypesConfig extends Record<'$http', infer T> ? T : IHttpService
        $VueMdb: TypesConfig extends Record<'$VueMdb', infer T> ? T : TVueMdb
        $notification: TypesConfig extends Record<'$notification', infer T> ? T : INotificationProvider
    }
}
