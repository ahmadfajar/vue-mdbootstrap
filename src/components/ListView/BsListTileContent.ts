import { defineComponent } from 'vue';
import { cssPrefix, useRenderSlotDefault } from '../../mixins/CommonApi';
import { booleanProp } from '../../mixins/CommonProps';
import { baseTagProps } from '../Card/mixins/cardProps';
import type { TBsListTileContent, TListTileContentOptionProps } from './types';

export default defineComponent<TBsListTileContent>({
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
    setup(props, { slots }) {
        const thisProps = props as Readonly<TListTileContentOptionProps>;

        return () =>
            useRenderSlotDefault(<string>thisProps.tag, slots, {
                [`${cssPrefix}list-tile-content`]: true,
                [`${cssPrefix}multiline`]: thisProps.multiLine === true,
            });
    },
});
