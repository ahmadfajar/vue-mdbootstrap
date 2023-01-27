import type {ComponentOptionsMixin, ComputedOptions, EmitsOptions} from "vue";
import {defineComponent} from "vue";
import {cssPrefix, useSimpleRenderWithSlots} from "../../mixins/CommonApi";
import {booleanProp, validStringOrNumberProp} from "../../mixins/CommonProps";
import type {TBsDivider, TDividerOptionProps, TRecord} from "../../types";
import Helper from "../../utils/Helper";

export default defineComponent<TBsDivider, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsDivider",
    props: {
        dark: booleanProp,
        leftIndent: validStringOrNumberProp,
        rightIndent: validStringOrNumberProp,
        thickness: validStringOrNumberProp,
    },
    setup(props) {
        const thisProps = props as Readonly<TDividerOptionProps>;

        return () => useSimpleRenderWithSlots(
            "hr", undefined,
            [
                `${cssPrefix}divider`,
                props.dark ? "divider--dark" : "divider--light"
            ], {
                marginLeft: props.leftIndent ? Helper.sizeUnit(thisProps.leftIndent) : null,
                marginRight: props.rightIndent ? Helper.sizeUnit(thisProps.rightIndent) : null,
                height: props.thickness ? Helper.sizeUnit(thisProps.thickness) : null,
            })
    }
});
