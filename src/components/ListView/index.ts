import type {App, Plugin} from "vue";
import BsListView from "./BsListView";
import BsListNav from "./BsListNav";
import BsListNavItem from "./BsListNavItem";
import BsListTile from "./BsListTile";
import BsListTileAction from "./BsListTileAction";
import BsListTileContent from "./BsListTileContent";
import BsListTileSubtitle from "./BsListTileSubtitle";
import BsListTileTitle from "./BsListTileTitle";
import BsListTileLeading from "./BsListTileLeading";
import "../Basic/basic.scss";
import "./listView.scss";
import "./listNav.scss";
import "./listTile.scss";


const BsListViewPlugin: Plugin = {
    install: (app: App): void => {
        app.component(<string>BsListView.name, BsListView);
        app.component(<string>BsListNav.name, BsListNav);
        app.component(<string>BsListNavItem.name, BsListNavItem);
        app.component(<string>BsListTile.name, BsListTile);
        app.component(<string>BsListTileAction.name, BsListTileAction);
        app.component(<string>BsListTileContent.name, BsListTileContent);
        app.component(<string>BsListTileLeading.name, BsListTileLeading);
        app.component(<string>BsListTileSubtitle.name, BsListTileSubtitle);
        app.component(<string>BsListTileTitle.name, BsListTileTitle);
    }
}

export {
    BsListViewPlugin, BsListView, BsListNav, BsListNavItem, BsListTile, BsListTileAction,
    BsListTileContent, BsListTileLeading, BsListTileSubtitle, BsListTileTitle,
}
