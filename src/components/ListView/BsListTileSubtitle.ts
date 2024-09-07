import { defineComponent, h } from 'vue';
import { cssPrefix } from '../../mixins/CommonApi';
import { stringProp } from '../../mixins/CommonProps';
import Helper from '../../utils/Helper';
import type { TBsListTileSubtitle } from './types';

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
