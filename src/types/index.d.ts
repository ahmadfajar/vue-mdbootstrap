import { AxiosInstance } from 'axios';
import { BsAlert } from '../components/Alert/types';
import { BsExpandTransition, BsOverlay, BsRipple } from '../components/Animation/types';
import { BsAppbar, BsAppbarItems, BsAppbarTitle } from '../components/Appbar/types';
import { BsAvatar } from '../components/Avatar/types';
import { BsBadge } from '../components/Badge/types';
import { BsDivider, BsImageHolder, BsSpacer, BsSubheader } from '../components/Basic/types';
import { BsButton, BsToggleButton, BsToggleField } from '../components/Button/types';
import {
    BsCard,
    BsCardBody,
    BsCardContent,
    BsCardFooter,
    BsCardHeader,
    BsCardMedia,
} from '../components/Card/types';
import { BsCheckbox, BsCheckboxGroup } from '../components/Checkbox/types';
import { BsChip, BsChipGroup } from '../components/Chip/types';
import { BsColorPicker } from '../components/ColorPicker/types';
import { BsCombobox } from '../components/Combobox/types';
import { BsAppContainer, BsContainer, BsContent } from '../components/Container/types';
import { BsDatePicker, BsDateTimeField } from '../components/DatePicker/types';
import { BsSideDrawer } from '../components/Drawer/types';
import {
    BsChipField,
    BsNumericField,
    BsSearchField,
    BsTextArea,
    BsTextField,
} from '../components/Field/types';
import { BsIcon, BsIconSpinner, BsIconSvg, BsToggleIcon } from '../components/Icon/types';
import {
    BsListNav,
    BsListNavItem,
    BsListTile,
    BsListTileAction,
    BsListTileContent,
    BsListTileLeading,
    BsListTileSubtitle,
    BsListTileTitle,
    BsListView,
} from '../components/ListView/types';
import { BsListbox } from '../components/Listbox/types';
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
export * from '../components/ListView/types';
export * from '../components/Listbox/types';
export * from '../components/Menu/types';
export * from '../components/Modal/types';
export * from '../components/Notification/types';
export * from '../components/Popover/types';
export * from '../components/Progress/types';
export * from '../components/Radio/types';
export * from '../components/Switch/types';
export * from '../components/Tabs/types';
export * from '../components/Tooltip/types';
export * from '../directives/types';
export * from './library';

declare module '@vue/runtime-core' {
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
