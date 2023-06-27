import type { ComponentOptionsMixin, ComputedOptions, EmitsOptions, MethodOptions } from 'vue';
import { defineComponent, h } from 'vue';
import { cssPrefix } from '../../mixins/CommonApi';
import { stringProp } from '../../mixins/CommonProps';
import type { TBsListTileSubtitle, TRecord } from '../../types';
import Helper from '../../utils/Helper';

export default defineComponent<TBsListTileSubtitle, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>({
    name: 'BsListTileSubtitle',
    props: {
        rawHtml: stringProp,
    },
    setup(props, {slots}) {
        return () =>
            !Helper.isEmpty(props.rawHtml)
                ? h('div', {
                        class: [`${cssPrefix}list-tile-subtitle`],
                        innerHTML: props.rawHtml,
                    }
                )
                : h('div', {
                    class: [`${cssPrefix}list-tile-subtitle`]
                }, slots.default && slots.default())
    }
});
