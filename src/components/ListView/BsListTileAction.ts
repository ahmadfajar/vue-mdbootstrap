import type { TBsListTileAction, TListTileActionOptionProps } from '@/components/ListView/types';
import { cssPrefix, useWrapSlotDefault } from '@/mixins/CommonApi.ts';
import { booleanProp, tagProp } from '@/mixins/CommonProps.ts';
import { defineComponent } from 'vue';

export default defineComponent<TBsListTileAction>({
  name: 'BsListTileAction',
  props: {
    tag: tagProp,
    center: booleanProp,
    stack: booleanProp,
  },
  setup(props, { slots }) {
    const thisProps = props as Readonly<TListTileActionOptionProps>;

    return () =>
      useWrapSlotDefault(thisProps.tag || 'div', slots, {
        [`${cssPrefix}list-tile-action`]: true,
        [`${cssPrefix}action-stack`]: thisProps.stack === true,
        flex: !thisProps.stack && thisProps.center === true,
        'self-center': thisProps.center === true,
      });
  },
});
