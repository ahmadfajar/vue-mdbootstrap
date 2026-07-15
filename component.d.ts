import type { AxiosInstance } from 'axios';
import type {
  BsAlert,
  BsApp,
  BsAppbar,
  BsAppbarItems,
  BsAppbarTitle,
  BsAvatar,
  BsBadge,
  BsBreadcrumb,
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
  BsCloseButton,
  BsColorPicker,
  BsCombobox,
  BsContainer,
  BsContent,
  BsDatePicker,
  BsDateTimeField,
  BsDivider,
  BsDropdownMenu,
  BsExpandTransition,
  BsFontawesomeIcon,
  BsIcon,
  BsImageHolder,
  BsImageUploader,
  BsLightbox,
  BsListNav,
  BsListNavItem,
  BsListTile,
  BsListTileAction,
  BsListTileContent,
  BsListTileLeading,
  BsListTileSubtitle,
  BsListTileTitle,
  BsListView,
  BsListbox,
  BsMaskLoader,
  BsModal,
  BsNotification,
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
  BsSpinLoader,
  BsSpinnerIcon,
  BsSubheader,
  BsSvgIcon,
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
  TVueMdb,
  vClickOutside,
  vResize,
  vScroll,
  vTouch,
} from './dist/vue-mdb';

declare module 'vue' {
  export interface GlobalComponents {
    BsAlert: BsAlert;
    BsApp: BsApp;
    BsAppContainer: BsApp;
    BsAppbar: BsAppbar;
    BsAppbarItems: BsAppbarItems;
    BsAppbarTitle: BsAppbarTitle;
    BsAvatar: BsAvatar;
    BsBadge: BsBadge;
    BsBreadcrumb: BsBreadcrumb;
    BsButton: BsButton;
    BsButtonToggle: BsToggleButton;
    BsButtonToggleField: BsToggleField;
    BsCard: BsCard;
    BsCardBody: BsCardBody;
    BsCardContent: BsCardContent;
    BsCardFooter: BsCardFooter;
    BsCardHeader: BsCardHeader;
    BsCardMedia: BsCardMedia;
    BsCheckbox: BsCheckbox;
    BsCheckboxGroup: BsCheckboxGroup;
    BsChip: BsChip;
    BsChipField: BsChipField;
    BsChipGroup: BsChipGroup;
    BsCloseButton: BsCloseButton;
    BsColorPicker: BsColorPicker;
    BsCombobox: BsCombobox;
    BsContainer: BsContainer;
    BsContent: BsContent;
    BsDatePicker: BsDatePicker;
    BsDateTimeField: BsDateTimeField;
    BsDivider: BsDivider;
    BsDropdownMenu: BsDropdownMenu;
    BsExpandTransition: BsExpandTransition;
    BsFontawesomeIcon: BsFontawesomeIcon;
    BsIcon: BsIcon;
    BsIconFontawesome: BsFontawesomeIcon;
    BsIconSpinner: BsSpinnerIcon;
    BsIconSvg: BsSvgIcon;
    BsIconToggle: BsToggleIcon;
    BsImageHolder: BsImageHolder;
    BsImageUploader: BsImageUploader;
    BsLightbox: BsLightbox;
    BsListNav: BsListNav;
    BsListNavItem: BsListNavItem;
    BsListTile: BsListTile;
    BsListTileAction: BsListTileAction;
    BsListTileContent: BsListTileContent;
    BsListTileLeading: BsListTileLeading;
    BsListTileSubtitle: BsListTileSubtitle;
    BsListTileTitle: BsListTileTitle;
    BsListView: BsListView;
    BsListbox: BsListbox;
    BsMaskLoader: BsMaskLoader;
    BsMenu: BsDropdownMenu;
    BsModal: BsModal;
    BsNotification: BsNotification;
    BsNumericField: BsNumericField;
    BsOverlay: BsOverlay;
    BsPopover: BsPopover;
    BsProgress: BsProgress;
    BsProgressBar: BsProgressBar;
    BsRadio: BsRadio;
    BsRadioGroup: BsRadioGroup;
    BsRipple: BsRipple;
    BsSearchField: BsSearchField;
    BsSideDrawer: BsSideDrawer;
    BsSpacer: BsSpacer;
    BsSpinLoader: BsSpinLoader;
    BsSpinnerIcon: BsSpinnerIcon;
    BsSubheader: BsSubheader;
    BsSvgIcon: BsSvgIcon;
    BsSwitch: BsSwitch;
    BsTab: BsTab;
    BsTabs: BsTabs;
    BsTextArea: BsTextArea;
    BsTextField: BsTextField;
    BsToggleButton: BsToggleButton;
    BsToggleField: BsToggleField;
    BsToggleIcon: BsToggleIcon;
    BsTooltip: BsTooltip;
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
