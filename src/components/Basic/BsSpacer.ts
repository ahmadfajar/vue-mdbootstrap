import {ComponentOptionsMixin, ComputedOptions, defineComponent, EmitsOptions} from "vue";
import {useSimpleRenderWithSlots} from "../Card/mixins/cardApi";
import {booleanTrueProp, validStringOrNumberProp} from "../../mixins/CommonProps";
import {TBsSpacer} from "./types";
import Helper from "../../utils/Helper";

export default defineComponent<TBsSpacer, unknown, unknown, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
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
        return () => useSimpleRenderWithSlots("div", null,
            {'flex-grow-1': props.fill && !props.width},
            {width: props.width ? Helper.sizeUnit(props.width) : null},
        )
    }
});
