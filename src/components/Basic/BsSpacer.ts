import {defineComponent} from "vue";
import {useSimpleRenderWithSlots} from "../Card/mixins/cardFunc";
import {booleanTrueProp, validStringOrNumberProp} from "../../mixins/Commons";
import Helper from "../../utils/Helper";

export default defineComponent({
    name: "BsSpacer",
    props: {
        /**
         * Sets this component to fill the available space or not.
         * @type {boolean}
         */
        fill: booleanTrueProp,
        /**
         * Sets this component width.
         * @type {number|string|*}
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
