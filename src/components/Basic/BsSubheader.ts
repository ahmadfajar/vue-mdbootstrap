import {ComponentOptionsMixin, ComputedOptions, defineComponent, EmitsOptions} from "vue";
import {useSimpleRenderWithSlots} from "../Card/mixins/cardApi";
import {booleanProp} from "../../mixins/CommonProps";
import {cssPrefix} from "../../mixins/CommonApi";
import {TBsSubheader} from "./types";

export default defineComponent<TBsSubheader, unknown, unknown, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
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
            [`${cssPrefix}subheader`, props.dark ? 'subheader--dark' : 'subheader--light'],
        )
    }
});
