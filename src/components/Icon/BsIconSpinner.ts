import {ComponentOptionsMixin, ComputedOptions, defineComponent, EmitsOptions, h} from "vue";
import {cssPrefix} from "../../mixins/CommonApi";
import {iconSpinnerProps} from "./mixins/iconProps";
import {spinnerSvgData, useCircleSizeStyles, useCreateSvgNode} from "./mixins/svgApi";
import {TBsIconSpinner} from "./types";
import {TRecord} from "../../types";

export default defineComponent<TBsIconSpinner, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsIconSpinner",
    props: iconSpinnerProps,
    setup(props) {
        return () => {
            return useCreateSvgNode(
                [
                    `${cssPrefix}svg-inline`,
                    "align-self-center",
                    props.spin ? `${cssPrefix}spin` : (props.pulse ? `${cssPrefix}pulse` : ""),
                    props.color ? `text-${props.color}` : "",
                ],
                useCircleSizeStyles(<number>props.size),
                false, null,
                "0 0 512 512", {
                    role: "img"
                }, [
                    h("path", {
                        d: spinnerSvgData,
                        fill: "currentColor"
                    }),
                ]
            )
        }
    }
});
