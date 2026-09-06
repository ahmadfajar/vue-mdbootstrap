import type { AxiosInstance } from 'axios';
import type {
  BsAlertConstructor,
  BsAppConstructor,
  BsAppbarConstructor,
  BsAppbarItemsConstructor,
  BsAppbarTitleConstructor,
  BsAvatarConstructor,
  BsBadgeConstructor,
  BsBreadcrumbConstructor,
  BsButtonConstructor,
  BsCardBodyConstructor,
  BsCardConstructor,
  BsCardContentConstructor,
  BsCardFooterConstructor,
  BsCardHeaderConstructor,
  BsCardMediaConstructor,
  BsCheckboxConstructor,
  BsCheckboxGroupConstructor,
  BsChipConstructor,
  BsChipFieldConstructor,
  BsChipGroupConstructor,
  BsCloseButtonConstructor,
  BsColorPickerConstructor,
  BsComboboxConstructor,
  BsContainerConstructor,
  BsContentConstructor,
  BsDatePickerConstructor,
  BsDateTimeFieldConstructor,
  BsDividerConstructor,
  BsDropdownMenuConstructor,
  BsExpandTransitionConstructor,
  BsFontawesomeIconConstructor,
  BsIconConstructor,
  BsImageHolderConstructor,
  BsImageUploaderConstructor,
  BsLightboxConstructor,
  BsListNavConstructor,
  BsListNavItemConstructor,
  BsListTileActionConstructor,
  BsListTileConstructor,
  BsListTileContentConstructor,
  BsListTileLeadingConstructor,
  BsListTileSubtitleConstructor,
  BsListTileTitleConstructor,
  BsListViewConstructor,
  BsListboxConstructor,
  BsMaskLoaderConstructor,
  BsModalConstructor,
  BsNotificationConstructor,
  BsNumericFieldConstructor,
  BsOverlayConstructor,
  BsPopoverConstructor,
  BsProgressBarConstructor,
  BsProgressConstructor,
  BsRadioConstructor,
  BsRadioGroupConstructor,
  BsRippleConstructor,
  BsSearchFieldConstructor,
  BsSideDrawerConstructor,
  BsSpacerConstructor,
  BsSpinLoaderConstructor,
  BsSpinnerIconConstructor,
  BsSubheaderConstructor,
  BsSvgIconConstructor,
  BsSwitchConstructor,
  BsTabConstructor,
  BsTabsConstructor,
  BsTextAreaConstructor,
  BsTextFieldConstructor,
  BsToggleButtonConstructor,
  BsToggleFieldConstructor,
  BsToggleIconConstructor,
  BsTooltipConstructor,
  IHttpService,
  INotificationProvider,
  TVueMdb,
  vClickOutside,
  vResize,
  vScroll,
  vTouch,
} from './dist/vue-mdb';

declare module 'vue' {
  export interface GlobalComponents {
    BsAlert: BsAlertConstructor;
    BsApp: BsAppConstructor;
    BsAppContainer: BsAppConstructor;
    BsAppbar: BsAppbarConstructor;
    BsAppbarItems: BsAppbarItemsConstructor;
    BsAppbarTitle: BsAppbarTitleConstructor;
    BsAvatar: BsAvatarConstructor;
    BsBadge: BsBadgeConstructor;
    BsBreadcrumb: BsBreadcrumbConstructor;
    BsButton: BsButtonConstructor;
    BsButtonToggle: BsToggleButtonConstructor;
    BsButtonToggleField: BsToggleFieldConstructor;
    BsCard: BsCardConstructor;
    BsCardBody: BsCardBodyConstructor;
    BsCardContent: BsCardContentConstructor;
    BsCardFooter: BsCardFooterConstructor;
    BsCardHeader: BsCardHeaderConstructor;
    BsCardMedia: BsCardMediaConstructor;
    BsCheckbox: BsCheckboxConstructor;
    BsCheckboxGroup: BsCheckboxGroupConstructor;
    BsChip: BsChipConstructor;
    BsChipField: BsChipFieldConstructor;
    BsChipGroup: BsChipGroupConstructor;
    BsCloseButton: BsCloseButtonConstructor;
    BsColorPicker: BsColorPickerConstructor;
    BsCombobox: BsComboboxConstructor;
    BsContainer: BsContainerConstructor;
    BsContent: BsContentConstructor;
    BsDatePicker: BsDatePickerConstructor;
    BsDateTimeField: BsDateTimeFieldConstructor;
    BsDivider: BsDividerConstructor;
    BsDropdownMenu: BsDropdownMenuConstructor;
    BsExpandTransition: BsExpandTransitionConstructor;
    BsFontawesomeIcon: BsFontawesomeIconConstructor;
    BsIcon: BsIconConstructor;
    BsIconFontawesome: BsFontawesomeIconConstructor;
    BsIconSpinner: BsSpinnerIconConstructor;
    BsIconSvg: BsSvgIconConstructor;
    BsIconToggle: BsToggleIconConstructor;
    BsImageHolder: BsImageHolderConstructor;
    BsImageUploader: BsImageUploaderConstructor;
    BsLightbox: BsLightboxConstructor;
    BsListNav: BsListNavConstructor;
    BsListNavItem: BsListNavItemConstructor;
    BsListTile: BsListTileConstructor;
    BsListTileAction: BsListTileActionConstructor;
    BsListTileContent: BsListTileContentConstructor;
    BsListTileLeading: BsListTileLeadingConstructor;
    BsListTileSubtitle: BsListTileSubtitleConstructor;
    BsListTileTitle: BsListTileTitleConstructor;
    BsListView: BsListViewConstructor;
    BsListbox: BsListboxConstructor;
    BsMaskLoader: BsMaskLoaderConstructor;
    BsMenu: BsDropdownMenuConstructor;
    BsModal: BsModalConstructor;
    BsNotification: BsNotificationConstructor;
    BsNumericField: BsNumericFieldConstructor;
    BsOverlay: BsOverlayConstructor;
    BsPopover: BsPopoverConstructor;
    BsProgress: BsProgressConstructor;
    BsProgressBar: BsProgressBarConstructor;
    BsRadio: BsRadioConstructor;
    BsRadioGroup: BsRadioGroupConstructor;
    BsRipple: BsRippleConstructor;
    BsSearchField: BsSearchFieldConstructor;
    BsSideDrawer: BsSideDrawerConstructor;
    BsSpacer: BsSpacerConstructor;
    BsSpinLoader: BsSpinLoaderConstructor;
    BsSpinnerIcon: BsSpinnerIconConstructor;
    BsSubheader: BsSubheaderConstructor;
    BsSvgIcon: BsSvgIconConstructor;
    BsSwitch: BsSwitchConstructor;
    BsTab: BsTabConstructor;
    BsTabs: BsTabsConstructor;
    BsTextArea: BsTextAreaConstructor;
    BsTextField: BsTextFieldConstructor;
    BsToggleButton: BsToggleButtonConstructor;
    BsToggleField: BsToggleFieldConstructor;
    BsToggleIcon: BsToggleIconConstructor;
    BsTooltip: BsTooltipConstructor;
  }

  export interface GlobalDirectives {
    vClickOutside: vClickOutside;
    vResize: vResize;
    vScroll: vScroll;
    vTouch: vTouch;
  }

  export interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $http: IHttpService;
    $VueMdb: TVueMdb;
    $notification: INotificationProvider;
  }
}
