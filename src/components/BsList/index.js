import BsList from "./BsList";
import BsListItem from "./BsListItem";
import BsListTileAction from "./BsListTileAction";
import BsListTileAvatar from "./BsListTileAvatar";
import BsListTileContent from "./BsListTileContent";
import BsListTileTitle from "./BsListTileTitle";
import BsListTileSubtitle from "./BsListTileSubtitle";

export default Vue => {
    Vue.component(BsList.name, BsList);
    Vue.component(BsListItem.name, BsListItem);
    Vue.component(BsListTileAction.name, BsListTileAction);
    Vue.component(BsListTileAvatar.name, BsListTileAvatar);
    Vue.component(BsListTileContent.name, BsListTileContent);
    Vue.component(BsListTileTitle.name, BsListTileTitle);
    Vue.component(BsListTileSubtitle.name, BsListTileSubtitle);
};