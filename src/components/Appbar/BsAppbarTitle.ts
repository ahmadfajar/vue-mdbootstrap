import {
    ComponentOptionsMixin,
    ComputedOptions,
    createTextVNode,
    defineComponent,
    EmitsOptions,
    h,
    toDisplayString
} from "vue";
import {cssPrefix, useRenderSlot} from "../../mixins/CommonApi";
import {stringProp} from "../../mixins/CommonProps";
import {TAppbarTitleOptionProps, TBsAppbarTitle, TRecord} from "../../types";
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
        const cmpProps = props as Readonly<TAppbarTitleOptionProps>;

        return () =>
            h("div", {
                    class: `${cssPrefix}appbar-title`
                },
                useRenderSlot(
                    slots, "default",
                    {key: Helper.uuid()},
                    [createTextVNode(toDisplayString(cmpProps.title))],
                )
            )
    }
});
