import {defineComponent} from "vue";
import {useSimpleRenderWithSlots} from "../Card/mixins/cardFunc";
import {booleanProp, cssPrefix} from "../../mixins/Commons";

export default defineComponent({
    name: "BsSubheader",
    props: {
        /**
         * Define explicitly when placed inside element that has dark background color.
         * @type {boolean}
         */
        dark: booleanProp,
    },
    setup(props, {slots}) {
        return () => useSimpleRenderWithSlots(
            "div", slots,
            [`${cssPrefix}-subheader`, props.dark ? 'subheader--dark' : 'subheader--light'],
        )
    }
});
