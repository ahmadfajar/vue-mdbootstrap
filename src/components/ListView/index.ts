import type {App, Plugin as Plugin_2} from "vue";
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


const BsListViewPlugin: Plugin_2 = {
    install: (app: App): void => {
        app.component(BsListView.name, BsListView);
        app.component(BsListNav.name, BsListNav);
        app.component(BsListNavItem.name, BsListNavItem);
        app.component(BsListTile.name, BsListTile);
        app.component(BsListTileAction.name, BsListTileAction);
        app.component(BsListTileContent.name, BsListTileContent);
        app.component(BsListTileLeading.name, BsListTileLeading);
        app.component(BsListTileSubtitle.name, BsListTileSubtitle);
        app.component(BsListTileTitle.name, BsListTileTitle);
    }
}

export {
    BsListViewPlugin, BsListView, BsListNav, BsListNavItem, BsListTile, BsListTileAction,
    BsListTileContent, BsListTileLeading, BsListTileSubtitle, BsListTileTitle,
}
