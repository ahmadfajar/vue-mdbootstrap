import type { ComponentOptionsMixin, ComputedOptions, EmitsOptions, MethodOptions } from 'vue';
import { defineComponent, h } from 'vue';
import { cssPrefix } from '../../mixins/CommonApi';
import { stringProp } from '../../mixins/CommonProps';
import type { TBsListTileTitle, TRecord } from '../../types';
import Helper from '../../utils/Helper';

export default defineComponent<TBsListTileTitle, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>({
    name: 'BsListTileTitle',
    props: {
        rawHtml: stringProp,
    },
    setup(props, {slots}) {
        return () =>
            !Helper.isEmpty(props.rawHtml)
                ? h('div', {
                        class: [`${cssPrefix}list-tile-title`],
                        innerHTML: props.rawHtml,
                    }
                )
                : h('div', {
                    class: [`${cssPrefix}list-tile-title`]
                }, slots.default && slots.default())
    }
});
