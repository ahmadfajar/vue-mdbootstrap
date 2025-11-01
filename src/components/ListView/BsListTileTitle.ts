import { useRenderListTileText } from '@/components/ListView/mixins/listTileApi.ts';
import type { TBsListTileTitle, TListTileTextOptionProps } from '@/components/ListView/types';
import { cssPrefix } from '@/mixins/CommonApi.ts';
import { stringProp } from '@/mixins/CommonProps.ts';
import { defineComponent } from 'vue';

export default defineComponent<TBsListTileTitle>({
  name: 'BsListTileTitle',
  props: {
    rawHtml: stringProp,
  },
  setup(props, { slots }) {
    return () =>
      useRenderListTileText(slots, props as Readonly<TListTileTextOptionProps>, [
        `${cssPrefix}list-tile-title`,
        'w-full',
      ]);
  },
});
