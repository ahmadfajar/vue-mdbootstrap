import BsListView from "./BsListView";
import BsListTile from "./BsListTile";
import BsListTileAction from "./BsListTileAction";
import BsListTileLeading from "./BsListTileLeading";
import BsListTileContent from "./BsListTileContent";
import BsListTileTitle from "./BsListTileTitle";
import BsListTileSubtitle from "./BsListTileSubtitle";
import BsListNav from "./BsListNav";
import BsListNavItem from "./BsListNavItem";
import "../../../scss/_others.scss";
import "../../../scss/utilities/_shadows.scss";

export default Vue => {
    Vue.component(BsListView.name, BsListView);
    Vue.component(BsListTile.name, BsListTile);
    Vue.component(BsListTileAction.name, BsListTileAction);
    Vue.component(BsListTileLeading.name, BsListTileLeading);
    Vue.component(BsListTileContent.name, BsListTileContent);
    Vue.component(BsListTileTitle.name, BsListTileTitle);
    Vue.component(BsListTileSubtitle.name, BsListTileSubtitle);
    Vue.component(BsListNav.name, BsListNav);
    Vue.component(BsListNavItem.name, BsListNavItem);
};
