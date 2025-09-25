import type { App, ObjectPlugin } from 'vue';
import BsListNav from './BsListNav.ts';
import BsListNavItem from './BsListNavItem.ts';
import BsListTile from './BsListTile.ts';
import BsListTileAction from './BsListTileAction.ts';
import BsListTileContent from './BsListTileContent.ts';
import BsListTileLeading from './BsListTileLeading.ts';
import BsListTileSubtitle from './BsListTileSubtitle.ts';
import BsListTileTitle from './BsListTileTitle.ts';
import BsListView from './BsListView.ts';

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
  BsListNav,
  BsListNavItem,
  BsListTile,
  BsListTileAction,
  BsListTileContent,
  BsListTileLeading,
  BsListTileSubtitle,
  BsListTileTitle,
  BsListView,
  BsListViewPlugin,
};
