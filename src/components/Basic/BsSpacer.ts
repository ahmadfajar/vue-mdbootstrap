import { defineComponent } from 'vue';
import { useRenderSlotDefault } from '../../mixins/CommonApi';
import { booleanTrueProp, validStringOrNumberProp } from '../../mixins/CommonProps';
import Helper from '../../utils/Helper';
import type { TBsSpacer } from './types';

export default defineComponent<TBsSpacer>({
    name: 'BsSpacer',
    props: {
        /**
         * Sets this component to fill the available space or not.
         * @type {boolean}
         */
        fill: booleanTrueProp,
        /**
         * Sets this component width.
         * @type {string|number}
         */
        width: validStringOrNumberProp,
    },
    setup(props) {
        return () =>
            useRenderSlotDefault(
                'div',
                undefined,
                { 'flex-grow-1': props.fill && !props.width },
                { width: props.width ? Helper.cssUnit(props.width as string) : undefined }
            );
    },
});
