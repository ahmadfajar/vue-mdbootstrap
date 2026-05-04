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
    app.component('BsListView', BsListView);
    app.component('BsListNav', BsListNav);
    app.component('BsListNavItem', BsListNavItem);
    app.component('BsListTile', BsListTile);
    app.component('BsListTileAction', BsListTileAction);
    app.component('BsListTileContent', BsListTileContent);
    app.component('BsListTileLeading', BsListTileLeading);
    app.component('BsListTileSubtitle', BsListTileSubtitle);
    app.component('BsListTileTitle', BsListTileTitle);
  },
};

export type { IListViewProvider } from '@/components/ListView/mixins/ListViewProvider.ts';
export type * from '@/components/ListView/types';
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
