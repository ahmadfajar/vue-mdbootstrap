import type { ComponentOptionsMixin, ComputedOptions, EmitsOptions, MethodOptions } from 'vue';
import { defineComponent } from 'vue';
import { cssPrefix, useRenderSlotDefault } from '../../mixins/CommonApi';
import { booleanProp } from '../../mixins/CommonProps';
import type { TBsListTileAction, TListTileActionOptionProps, TRecord } from '../../types';
import { baseTagProps } from '../Card/mixins/cardProps';

export default defineComponent<TBsListTileAction, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>({
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
    setup(props, {slots}) {
        const cmpProps = props as Readonly<TListTileActionOptionProps>;

        return () =>
            useRenderSlotDefault(<string>props.tag, slots, {
                [`${cssPrefix}list-tile-action`]: true,
                [`${cssPrefix}action-stack`]: cmpProps.stack === true,
                'd-flex': !cmpProps.stack && cmpProps.center === true,
                'align-self-center': cmpProps.center === true,
            })
    }
});
