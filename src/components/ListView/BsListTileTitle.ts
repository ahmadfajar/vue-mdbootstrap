import { defineComponent, h } from 'vue';
import { cssPrefix } from '../../mixins/CommonApi';
import { stringProp } from '../../mixins/CommonProps';
import Helper from '../../utils/Helper';
import type { TBsListTileTitle } from './types';

export default defineComponent<TBsListTileTitle>({
    name: 'BsListTileTitle',
    props: {
        rawHtml: stringProp,
    },
    setup(props, { slots }) {
        return () =>
            !Helper.isEmpty(props.rawHtml)
                ? h('div', {
                      class: [`${cssPrefix}list-tile-title`],
                      innerHTML: props.rawHtml,
                  })
                : h(
                      'div',
                      {
                          class: [`${cssPrefix}list-tile-title`],
                      },
                      slots.default && slots.default()
                  );
    },
});
