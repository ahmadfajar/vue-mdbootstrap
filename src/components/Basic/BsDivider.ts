import {defineComponent} from "vue";
import {useSimpleRenderWithSlots} from "../Card/mixins/cardApi";
import {cssPrefix} from "../../mixins/CommonApi";
import {booleanProp, validStringOrNumberProp} from "../../mixins/CommonProps";
import Helper from "../../utils/Helper";

export default defineComponent({
    name: "BsDivider",
    props: {
        /**
         * Set to `TRUE` when divider is placed inside element that has dark background color.
         * @type {boolean}
         */
        dark: booleanProp,
        /**
         * Indentation from left side.
         * @type {string|number|*}
         */
        leftIndent: validStringOrNumberProp,
        /**
         * Indentation from right side.
         * @type {string|number|*}
         */
        rightIndent: validStringOrNumberProp,
        /**
         * Divider thickness.
         * @type {string|number|*}
         */
        thickness: validStringOrNumberProp,
    },
    setup(props) {
        return () => useSimpleRenderWithSlots(
            "hr", null,
            [
                `${cssPrefix}divider`,
                props.dark ? "divider--dark" : "divider--light"
            ], {
                marginLeft: props.leftIndent ? Helper.sizeUnit(props.leftIndent) : null,
                marginRight: props.rightIndent ? Helper.sizeUnit(props.rightIndent) : null,
                height: props.thickness ? Helper.sizeUnit(props.thickness) : null,
            })
    }
});
