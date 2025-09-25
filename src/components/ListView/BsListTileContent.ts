import type { TBsListTileContent, TListTileContentOptionProps } from '@/components/ListView/types';
import { cssPrefix, useWrapSlotDefault } from '@/mixins/CommonApi.ts';
import { booleanProp, tagProp } from '@/mixins/CommonProps.ts';
import { defineComponent } from 'vue';

export default defineComponent<TBsListTileContent>({
  name: 'BsListTileContent',
  props: {
    tag: tagProp,
    multiLine: booleanProp,
  },
  setup(props, { slots }) {
    const thisProps = props as Readonly<TListTileContentOptionProps>;

    return () =>
      useWrapSlotDefault(thisProps.tag || 'div', slots, {
        [`${cssPrefix}list-tile-content`]: true,
        [`${cssPrefix}multiline`]: thisProps.multiLine === true,
      });
  },
});
