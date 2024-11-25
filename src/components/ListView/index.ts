import type { App, ObjectPlugin } from 'vue';
import BsListView from './BsListView';
import BsListNav from './BsListNav';
import BsListNavItem from './BsListNavItem';
import BsListTile from './BsListTile';
import BsListTileAction from './BsListTileAction';
import BsListTileContent from './BsListTileContent';
import BsListTileSubtitle from './BsListTileSubtitle';
import BsListTileTitle from './BsListTileTitle';
import BsListTileLeading from './BsListTileLeading';
import '../Basic/basic.scss';
import './listView.scss';
import './listNav.scss';
import './listTile.scss';

const BsListViewPlugin: ObjectPlugin = {
    install: (app: App): void => {
        app.component(BsListView.name as string, BsListView);
        app.component(BsListNav.name as string, BsListNav);
        app.component(BsListNavItem.name as string, BsListNavItem);
        app.component(BsListTile.name as string, BsListTile);
        app.component(BsListTileAction.name as string, BsListTileAction);
        app.component(BsListTileContent.name as string, BsListTileContent);
        app.component(BsListTileLeading.name as string, BsListTileLeading);
        app.component(BsListTileSubtitle.name as string, BsListTileSubtitle);
        app.component(BsListTileTitle.name as string, BsListTileTitle);
    },
};

export {
    BsListViewPlugin,
    BsListView,
    BsListNav,
    BsListNavItem,
    BsListTile,
    BsListTileAction,
    BsListTileContent,
    BsListTileLeading,
    BsListTileSubtitle,
    BsListTileTitle,
};
