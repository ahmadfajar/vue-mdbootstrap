import type { AxiosInstance } from 'axios';
import type {
    BsAlert,
    BsAppbar,
    BsAppbarItems,
    BsAppbarTitle,
    BsAppContainer,
    BsAvatar,
    BsBadge,
    BsButton,
    BsCard,
    BsCardBody,
    BsCardContent,
    BsCardFooter,
    BsCardHeader,
    BsCardMedia,
    BsCheckbox,
    BsCheckboxGroup,
    BsChip,
    BsChipField,
    BsChipGroup,
    BsColorPicker,
    BsCombobox,
    BsContainer,
    BsContent,
    BsDatePicker,
    BsDateTimeField,
    BsDivider,
    BsDropdownMenu,
    BsExpandTransition,
    BsIcon,
    BsIconSpinner,
    BsIconSvg,
    BsImageHolder,
    BsLightbox,
    BsListbox,
    BsListNav,
    BsListNavItem,
    BsListTile,
    BsListTileAction,
    BsListTileContent,
    BsListTileLeading,
    BsListTileSubtitle,
    BsListTileTitle,
    BsListView,
    BsMaskLoader,
    BsModal,
    BsNumericField,
    BsOverlay,
    BsPopover,
    BsProgress,
    BsProgressBar,
    BsRadio,
    BsRadioGroup,
    BsRipple,
    BsSearchField,
    BsSideDrawer,
    BsSpacer,
    BsSubheader,
    BsSwitch,
    BsTab,
    BsTabs,
    BsTextArea,
    BsTextField,
    BsToggleButton,
    BsToggleField,
    BsToggleIcon,
    BsTooltip,
    IHttpService,
    INotificationProvider,
    TVueMdb
} from './dist/vue-mdb';

declare interface TypesConfig {
}

declare module '@vue/runtime-core' {
    export interface GlobalComponents {
        BsAlert: TypesConfig extends Record<'BsAlert', infer T> ? T : typeof BsAlert
        BsExpandTransition: TypesConfig extends Record<'BsExpandTransition', infer T> ? T : typeof BsExpandTransition
        BsOverlay: TypesConfig extends Record<'BsOverlay', infer T> ? T : typeof BsOverlay
        BsRipple: TypesConfig extends Record<'BsRipple', infer T> ? T : typeof BsRipple
        BsAppbar: TypesConfig extends Record<'BsAppbar', infer T> ? T : typeof BsAppbar
        BsAppbarTitle: TypesConfig extends Record<'BsAppbarTitle', infer T> ? T : typeof BsAppbarTitle
        BsAppbarItems: TypesConfig extends Record<'BsAppbarItems', infer T> ? T : typeof BsAppbarItems
        BsAvatar: TypesConfig extends Record<'BsAvatar', infer T> ? T : typeof BsAvatar
        BsBadge: TypesConfig extends Record<'BsBadge', infer T> ? T : typeof BsBadge
        BsDivider: TypesConfig extends Record<'BsDivider', infer T> ? T : typeof BsDivider
        BsImageHolder: TypesConfig extends Record<'BsImageHolder', infer T> ? T : typeof BsImageHolder
        BsSpacer: TypesConfig extends Record<'BsSpacer', infer T> ? T : typeof BsSpacer
        BsSubheader: TypesConfig extends Record<'BsSubheader', infer T> ? T : typeof BsSubheader
        BsButton: TypesConfig extends Record<'BsButton', infer T> ? T : typeof BsButton
        BsButtonToggle: TypesConfig extends Record<'BsButtonToggle', infer T> ? T : typeof BsToggleButton
        BsButtonToggleField: TypesConfig extends Record<'BsButtonToggleField', infer T> ? T : typeof BsToggleField
        BsToggleButton: TypesConfig extends Record<'BsToggleButton', infer T> ? T : typeof BsToggleButton
        BsToggleField: TypesConfig extends Record<'BsToggleField', infer T> ? T : typeof BsToggleField
        BsCard: TypesConfig extends Record<'BsCard', infer T> ? T : typeof BsCard
        BsCardBody: TypesConfig extends Record<'BsCardBody', infer T> ? T : typeof BsCardBody
        BsCardContent: TypesConfig extends Record<'BsCardContent', infer T> ? T : typeof BsCardContent
        BsCardFooter: TypesConfig extends Record<'BsCardFooter', infer T> ? T : typeof BsCardFooter
        BsCardHeader: TypesConfig extends Record<'BsCardHeader', infer T> ? T : typeof BsCardHeader
        BsCardMedia: TypesConfig extends Record<'BsCardMedia', infer T> ? T : typeof BsCardMedia
        BsCheckbox: TypesConfig extends Record<'BsCheckbox', infer T> ? T : typeof BsCheckbox
        BsCheckboxGroup: TypesConfig extends Record<'BsCheckboxGroup', infer T> ? T : typeof BsCheckboxGroup
        BsChip: TypesConfig extends Record<'BsChip', infer T> ? T : typeof BsChip
        BsChipGroup: TypesConfig extends Record<'BsChipGroup', infer T> ? T : typeof BsChipGroup
        BsColorPicker: TypesConfig extends Record<'BsColorPicker', infer T> ? T : typeof BsColorPicker
        BsCombobox: TypesConfig extends Record<'BsCombobox', infer T> ? T : typeof BsCombobox
        BsAppContainer: TypesConfig extends Record<'BsAppContainer', infer T> ? T : typeof BsAppContainer
        BsContainer: TypesConfig extends Record<'BsContainer', infer T> ? T : typeof BsContainer
        BsContent: TypesConfig extends Record<'BsContent', infer T> ? T : typeof BsContent
        BsDatePicker: TypesConfig extends Record<'BsDatePicker', infer T> ? T : typeof BsDatePicker
        BsDateTimeField: TypesConfig extends Record<'BsDateTimeField', infer T> ? T : typeof BsDateTimeField
        BsSideDrawer: TypesConfig extends Record<'BsSideDrawer', infer T> ? T : typeof BsSideDrawer
        BsChipField: TypesConfig extends Record<'BsChipField', infer T> ? T : typeof BsChipField
        BsSearchField: TypesConfig extends Record<'BsSearchField', infer T> ? T : typeof BsSearchField
        BsNumericField: TypesConfig extends Record<'BsNumericField', infer T> ? T : typeof BsNumericField
        BsTextField: TypesConfig extends Record<'BsTextField', infer T> ? T : typeof BsTextField
        BsTextArea: TypesConfig extends Record<'BsTextArea', infer T> ? T : typeof BsTextArea
        BsIcon: TypesConfig extends Record<'BsIcon', infer T> ? T : typeof BsIcon
        BsIconSpinner: TypesConfig extends Record<'BsIconSpinner', infer T> ? T : typeof BsIconSpinner
        BsIconSvg: TypesConfig extends Record<'BsIconSvg', infer T> ? T : typeof BsIconSvg
        BsIconToggle: TypesConfig extends Record<'BsIconToggle', infer T> ? T : typeof BsToggleIcon
        BsToggleIcon: TypesConfig extends Record<'BsToggleIcon', infer T> ? T : typeof BsToggleIcon
        BsListbox: TypesConfig extends Record<'BsListbox', infer T> ? T : typeof BsListbox
        BsListView: TypesConfig extends Record<'BsListView', infer T> ? T : typeof BsListView
        BsListNav: TypesConfig extends Record<'BsListNav', infer T> ? T : typeof BsListNav
        BsListNavItem: TypesConfig extends Record<'BsListNavItem', infer T> ? T : typeof BsListNavItem
        BsListTile: TypesConfig extends Record<'BsListTile', infer T> ? T : typeof BsListTile
        BsListTileAction: TypesConfig extends Record<'BsListTileAction', infer T> ? T : typeof BsListTileAction
        BsListTileContent: TypesConfig extends Record<'BsListTileContent', infer T> ? T : typeof BsListTileContent
        BsListTileLeading: TypesConfig extends Record<'BsListTileLeading', infer T> ? T : typeof BsListTileLeading
        BsListTileSubtitle: TypesConfig extends Record<'BsListTileSubtitle', infer T> ? T : typeof BsListTileSubtitle
        BsListTileTitle: TypesConfig extends Record<'BsListTileTitle', infer T> ? T : typeof BsListTileTitle
        BsDropdownMenu: TypesConfig extends Record<'BsDropdownMenu', infer T> ? T : typeof BsDropdownMenu
        BsPopover: TypesConfig extends Record<'BsPopover', infer T> ? T : typeof BsPopover
        BsMaskLoader: TypesConfig extends Record<'BsMaskLoader', infer T> ? T : typeof BsMaskLoader
        BsProgress: TypesConfig extends Record<'BsProgress', infer T> ? T : typeof BsProgress
        BsProgressBar: TypesConfig extends Record<'BsProgressBar', infer T> ? T : typeof BsProgressBar
        BsRadio: TypesConfig extends Record<'BsRadio', infer T> ? T : typeof BsRadio
        BsRadioGroup: TypesConfig extends Record<'BsRadioGroup', infer T> ? T : typeof BsRadioGroup
        BsSwitch: TypesConfig extends Record<'BsSwitch', infer T> ? T : typeof BsSwitch
        BsTab: TypesConfig extends Record<'BsTab', infer T> ? T : typeof BsTab
        BsTabs: TypesConfig extends Record<'BsTabs', infer T> ? T : typeof BsTabs
        BsTooltip: TypesConfig extends Record<'BsTooltip', infer T> ? T : typeof BsTooltip
        BsModal: TypesConfig extends Record<'BsModal', infer T> ? T : typeof BsModal
        BsLightbox: TypesConfig extends Record<'BsLightbox', infer T> ? T : typeof BsLightbox
    }

    export interface ComponentCustomProperties {
        $axios: TypesConfig extends Record<'$axios', infer T> ? T : AxiosInstance
        $http: TypesConfig extends Record<'$http', infer T> ? T : IHttpService
        $VueMdb: TypesConfig extends Record<'$VueMdb', infer T> ? T : TVueMdb
        $notification: TypesConfig extends Record<'$notification', infer T> ? T : INotificationProvider
    }
}
