import { defineComponent } from 'vue';
import { cssPrefix, useRenderSlotDefault } from '../../mixins/CommonApi';
import { booleanProp } from '../../mixins/CommonProps';
import type { TBsSubheader } from './types';

export default defineComponent<TBsSubheader>({
    name: 'BsSubheader',
    props: {
        /**
         * Define explicitly when placed inside element that has dark background color.
         * @type {boolean}
         */
        dark: booleanProp,
    },
    setup(props, { slots }) {
        return () =>
            useRenderSlotDefault('div', slots, [
                `${cssPrefix}subheader`,
                props.dark ? 'subheader--dark' : 'subheader--light',
            ]);
    },
});
