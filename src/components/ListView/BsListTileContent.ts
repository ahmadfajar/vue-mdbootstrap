import type { ComponentOptionsMixin, ComputedOptions, EmitsOptions, MethodOptions } from 'vue';
import { defineComponent } from 'vue';
import { cssPrefix, useRenderSlotDefault } from '../../mixins/CommonApi';
import { booleanProp } from '../../mixins/CommonProps';
import type { TBsListTileContent, TListTileContentOptionProps, TRecord } from '../../types';
import { baseTagProps } from '../Card/mixins/cardProps';

export default defineComponent<TBsListTileContent, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>({
    name: 'BsListTileContent',
    props: {
        ...baseTagProps,
        /**
         * Useful when you want to display multiline text. The subtitle default will be display
         * in a single line, if the text length is beyond the container's width then the text will be
         * truncate with an ellipses at the end.
         * @type {boolean}
         */
        multiLine: booleanProp,
    },
    setup(props, {slots}) {
        const cmpProps = props as Readonly<TListTileContentOptionProps>;

        return () =>
            useRenderSlotDefault(<string>props.tag, slots, {
                [`${cssPrefix}list-tile-content`]: true,
                [`${cssPrefix}multiline`]: cmpProps.multiLine === true,
            })
    }
});
