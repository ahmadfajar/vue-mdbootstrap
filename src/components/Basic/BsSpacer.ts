import type {ComponentOptionsMixin, ComputedOptions, EmitsOptions} from "vue";
import {defineComponent} from "vue";
import {booleanTrueProp, validStringOrNumberProp} from "../../mixins/CommonProps";
import {useSimpleRenderWithSlots} from "../../mixins/CommonApi";
import type {TBsSpacer, TRecord} from "../../types";
import Helper from "../../utils/Helper";

export default defineComponent<TBsSpacer, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsSpacer",
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
        return () => useSimpleRenderWithSlots("div", undefined,
            {'flex-grow-1': props.fill && !props.width},
            {width: props.width ? Helper.cssUnit(<string>props.width) : undefined},
        )
    }
});
