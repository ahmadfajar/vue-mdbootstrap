import { defineComponent } from 'vue';
import { cssPrefix, useRenderSlotDefault } from '../../mixins/CommonApi';
import { booleanProp } from '../../mixins/CommonProps';
import { baseTagProps } from '../Card/mixins/cardProps';
import type { TBsListTileAction, TListTileActionOptionProps } from './types';

export default defineComponent<TBsListTileAction>({
    name: 'BsListTileAction',
    props: {
        ...baseTagProps,
        /**
         * Center item inside it vertically.
         * @type {boolean}
         */
        center: booleanProp,
        /**
         * Arrange item inside it vertically.
         * @type {boolean}
         */
        stack: booleanProp,
    },
    setup(props, { slots }) {
        const thisProps = props as Readonly<TListTileActionOptionProps>;

        return () =>
            useRenderSlotDefault(thisProps.tag as string, slots, {
                [`${cssPrefix}list-tile-action`]: true,
                [`${cssPrefix}action-stack`]: thisProps.stack === true,
                'd-flex': !thisProps.stack && thisProps.center === true,
                'align-self-center': thisProps.center === true,
            });
    },
});
