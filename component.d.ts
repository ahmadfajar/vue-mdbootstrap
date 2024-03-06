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
    TVueMdb,
} from './dist/vue-mdb';

declare module 'vue' {
    export interface GlobalComponents {
        BsAlert: typeof BsAlert;
        BsAppContainer: typeof BsAppContainer;
        BsAppbar: typeof BsAppbar;
        BsAppbarItems: typeof BsAppbarItems;
        BsAppbarTitle: typeof BsAppbarTitle;
        BsAvatar: typeof BsAvatar;
        BsBadge: typeof BsBadge;
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
        BsColorPicker: typeof BsColorPicker;
        BsCombobox: typeof BsCombobox;
        BsContainer: typeof BsContainer;
        BsContent: typeof BsContent;
        BsDatePicker: typeof BsDatePicker;
        BsDateTimeField: typeof BsDateTimeField;
        BsDivider: typeof BsDivider;
        BsDropdownMenu: typeof BsDropdownMenu;
        BsExpandTransition: typeof BsExpandTransition;
        BsIcon: typeof BsIcon;
        BsIconSpinner: typeof BsIconSpinner;
        BsIconSvg: typeof BsIconSvg;
        BsIconToggle: typeof BsToggleIcon;
        BsImageHolder: typeof BsImageHolder;
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
        BsSubheader: typeof BsSubheader;
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
    }
}
