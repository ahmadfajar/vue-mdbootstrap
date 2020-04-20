import BsListView from "./BsListView";
import BsListTile from "./BsListTile";
import BsListTileAction from "./BsListTileAction";
import BsListTileLeading from "./BsListTileLeading";
import BsListTileContent from "./BsListTileContent";
import BsListTileTitle from "./BsListTileTitle";
import BsListTileSubtitle from "./BsListTileSubtitle";

export default Vue => {
    Vue.component(BsListView.name, BsListView);
    Vue.component(BsListTile.name, BsListTile);
    Vue.component(BsListTileAction.name, BsListTileAction);
    Vue.component(BsListTileLeading.name, BsListTileLeading);
    Vue.component(BsListTileContent.name, BsListTileContent);
    Vue.component(BsListTileTitle.name, BsListTileTitle);
    Vue.component(BsListTileSubtitle.name, BsListTileSubtitle);
};
