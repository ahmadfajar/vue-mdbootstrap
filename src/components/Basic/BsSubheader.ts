import type {ComponentOptionsMixin, ComputedOptions, EmitsOptions} from "vue";
import {defineComponent} from "vue";
import {booleanProp} from "../../mixins/CommonProps";
import {cssPrefix, useSimpleRenderWithSlots} from "../../mixins/CommonApi";
import type {TBsSubheader, TRecord} from "../../types";

export default defineComponent<TBsSubheader, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
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
