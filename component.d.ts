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
  ClickOutside,
  IHttpService,
  INotificationProvider,
  Resize,
  Scroll,
  TVueMdb,
  Touch,
} from './dist/vue-mdb';

declare module 'vue' {
  export interface GlobalComponents {
    BsAlert: typeof BsAlert;
    BsApp: typeof BsApp;
    BsAppContainer: typeof BsApp;
    BsAppbar: typeof BsAppbar;
    BsAppbarItems: typeof BsAppbarItems;
    BsAppbarTitle: typeof BsAppbarTitle;
    BsAvatar: typeof BsAvatar;
    BsBadge: typeof BsBadge;
    BsBreadcrumb: typeof BsBreadcrumb;
    BsButton: typeof BsButton;
    BsButtonToggle: typeof BsToggleButton;
    BsButtonToggleField: typeof BsToggleField;
    BsCard: typeof BsCard;
    BsCardBody: typeof BsCardBody;
    BsCardContent: typeof BsCardContent;
    BsCardFooter: typeof BsCardFooter;
    BsCardHeader: typeof BsCardHeader;
    BsCardMedia: typeof BsCardMedia;
    BsCheckbox: typeof BsCheckbox;
    BsCheckboxGroup: typeof BsCheckboxGroup;
    BsChip: typeof BsChip;
    BsChipField: typeof BsChipField;
    BsChipGroup: typeof BsChipGroup;
    BsCloseButton: typeof BsCloseButton;
    BsColorPicker: typeof BsColorPicker;
    BsCombobox: typeof BsCombobox;
    BsContainer: typeof BsContainer;
    BsContent: typeof BsContent;
    BsDatePicker: typeof BsDatePicker;
    BsDateTimeField: typeof BsDateTimeField;
    BsDivider: typeof BsDivider;
    BsDropdownMenu: typeof BsDropdownMenu;
    BsExpandTransition: typeof BsExpandTransition;
    BsFontawesomeIcon: typeof BsFontawesomeIcon;
    BsIcon: typeof BsIcon;
    BsIconFontawesome: typeof BsFontawesomeIcon;
    BsIconSpinner: typeof BsSpinnerIcon;
    BsIconSvg: typeof BsSvgIcon;
    BsIconToggle: typeof BsToggleIcon;
    BsImageHolder: typeof BsImageHolder;
    BsImageUploader: typeof BsImageUploader;
    BsLightbox: typeof BsLightbox;
    BsListNav: typeof BsListNav;
    BsListNavItem: typeof BsListNavItem;
    BsListTile: typeof BsListTile;
    BsListTileAction: typeof BsListTileAction;
    BsListTileContent: typeof BsListTileContent;
    BsListTileLeading: typeof BsListTileLeading;
    BsListTileSubtitle: typeof BsListTileSubtitle;
    BsListTileTitle: typeof BsListTileTitle;
    BsListView: typeof BsListView;
    BsListbox: typeof BsListbox;
    BsMaskLoader: typeof BsMaskLoader;
    BsMenu: typeof BsDropdownMenu;
    BsModal: typeof BsModal;
    BsNotification: typeof BsNotification;
    BsNumericField: typeof BsNumericField;
    BsOverlay: typeof BsOverlay;
    BsPopover: typeof BsPopover;
    BsProgress: typeof BsProgress;
    BsProgressBar: typeof BsProgressBar;
    BsRadio: typeof BsRadio;
    BsRadioGroup: typeof BsRadioGroup;
    BsRipple: typeof BsRipple;
    BsSearchField: typeof BsSearchField;
    BsSideDrawer: typeof BsSideDrawer;
    BsSpacer: typeof BsSpacer;
    BsSpinLoader: typeof BsSpinLoader;
    BsSpinnerIcon: typeof BsSpinnerIcon;
    BsSubheader: typeof BsSubheader;
    BsSvgIcon: typeof BsSvgIcon;
    BsSwitch: typeof BsSwitch;
    BsTab: typeof BsTab;
    BsTabs: typeof BsTabs;
    BsTextArea: typeof BsTextArea;
    BsTextField: typeof BsTextField;
    BsToggleButton: typeof BsToggleButton;
    BsToggleField: typeof BsToggleField;
    BsToggleIcon: typeof BsToggleIcon;
    BsTooltip: typeof BsTooltip;
  }

  export interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $http: IHttpService;
    $VueMdb: TVueMdb;
    $notification: INotificationProvider;
    vClickOutside: typeof ClickOutside;
    vResize: typeof Resize;
    vScroll: typeof Scroll;
    vTouch: typeof Touch;
  }
}
