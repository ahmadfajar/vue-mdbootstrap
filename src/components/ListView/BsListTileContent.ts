import type { TBsListTileContent, TListTileContentOptionProps } from '@/components/ListView/types';
import { cssPrefix, useWrapSlotDefault } from '@/mixins/CommonApi';
import { booleanProp, tagProp } from '@/mixins/CommonProps';
import { defineComponent } from 'vue';

export default defineComponent<TBsListTileContent>({
  name: 'BsListTileContent',
  props: {
    tag: tagProp,
    /**
     * Useful when you want to display multiline text. The subtitle default will be display
     * in a single line, if the text length is beyond the container's width then the text will be
     * truncate with an ellipses at the end.
     * @type {boolean}
     */
    multiLine: booleanProp,
  },
  setup(props, { slots }) {
    const thisProps = props as Readonly<TListTileContentOptionProps>;

    return () =>
      useWrapSlotDefault(<string>thisProps.tag, slots, {
        [`${cssPrefix}list-tile-content`]: true,
        [`${cssPrefix}multiline`]: thisProps.multiLine === true,
      });
  },
});
