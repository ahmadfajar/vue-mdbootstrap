import { useRenderListTileText } from '@/components/ListView/mixins/listTileApi.ts';
import type { TBsListTileSubtitle, TListTileTextOptionProps } from '@/components/ListView/types';
import { cssPrefix } from '@/mixins/CommonApi.ts';
import { stringProp } from '@/mixins/CommonProps.ts';
import { defineComponent } from 'vue';

export default defineComponent<TBsListTileSubtitle>({
  name: 'BsListTileSubtitle',
  props: {
    rawHtml: stringProp,
  },
  setup(props, { slots }) {
    return () =>
      useRenderListTileText(slots, props as Readonly<TListTileTextOptionProps>, [
        `${cssPrefix}list-tile-subtitle`,
        'w-full',
      ]);
  },
});
