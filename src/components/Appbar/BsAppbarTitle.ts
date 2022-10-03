import {ComponentOptionsMixin, ComputedOptions, defineComponent, EmitsOptions, h, toDisplayString} from "vue";
import {cssPrefix, useRenderSlot} from "../../mixins/CommonApi";
import {stringProp} from "../../mixins/CommonProps";
import {TBsAppbarTitle} from "./types";
import {TRecord} from "../../types";
import Helper from "../../utils/Helper";

export default defineComponent<TBsAppbarTitle, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsAppbarTitle",
    props: {
        /**
         * The text to display.
         * @type {string}
         */
        title: stringProp
    },
    setup(props, {slots}) {
        return () =>
            h("div", {
                    class: `${cssPrefix}appbar-title`
                },
                useRenderSlot(
                    slots, "default",
                    {key: Helper.uuid()},
                    toDisplayString(props.title),
                )
            )
    }
});
