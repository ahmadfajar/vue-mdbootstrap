import type { ComponentOptionsMixin, ComputedOptions, EmitsOptions, MethodOptions } from 'vue';
import { defineComponent } from 'vue';
import { useRenderSlotDefault } from '../../mixins/CommonApi';
import { booleanTrueProp, validStringOrNumberProp } from '../../mixins/CommonProps';
import type { TBsSpacer, TRecord } from '../../types';
import Helper from '../../utils/Helper';

export default defineComponent<TBsSpacer, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>({
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
        return () => useRenderSlotDefault('div', undefined,
            {'flex-grow-1': props.fill && !props.width},
            {width: props.width ? Helper.cssUnit(<string>props.width) : undefined},
        )
    }
});
