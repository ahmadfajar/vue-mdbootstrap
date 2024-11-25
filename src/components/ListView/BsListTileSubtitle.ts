import type { TBsListTileSubtitle } from '@/components/ListView/types';
import { cssPrefix } from '@/mixins/CommonApi';
import { stringProp } from '@/mixins/CommonProps';
import Helper from '@/utils/Helper';
import { defineComponent, h } from 'vue';

export default defineComponent<TBsListTileSubtitle>({
    name: 'BsListTileSubtitle',
    props: {
        rawHtml: stringProp,
    },
    setup(props, { slots }) {
        return () =>
            !Helper.isEmpty(props.rawHtml)
                ? h('div', {
                      class: [`${cssPrefix}list-tile-subtitle`],
                      innerHTML: props.rawHtml,
                  })
                : h(
                      'div',
                      {
                          class: [`${cssPrefix}list-tile-subtitle`],
                      },
                      slots.default && slots.default()
                  );
    },
});
