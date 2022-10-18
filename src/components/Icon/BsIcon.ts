import {ComponentOptionsMixin, ComputedOptions, defineComponent, EmitsOptions, h, Prop} from "vue";
import {useSizeHeight, useSizeStyles, useSizeWidth} from "./mixins/iconApi";
import {cssPrefix} from "../../mixins/CommonApi";
import {iconProps, iconSize as size} from "./mixins/iconProps";
import {TBsIcon, TBsIconSvg, TIconOptionProps, TRecord} from "../../types";
import BsIconSvg from "./BsIconSvg";

export default defineComponent<TBsIcon, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsIcon",
    props: {
        /**
         * Shortcut to create icon with equal height and width.
         * @type {string|number}
         */
        size,
        ...iconProps,
    },
    setup(props) {
        const cmpProps = props as Readonly<TIconOptionProps>;
        const szHeight = useSizeHeight(cmpProps) as Prop<string>;
        const szWidth = useSizeWidth(cmpProps) as Prop<string>;

        return () => h(
            "span", {
                class: [`${cssPrefix}icon`],
                style: useSizeStyles(cmpProps),
            }, h<TBsIconSvg>(BsIconSvg, {
                icon: props.icon,
                height: szHeight,
                width: szWidth,
                spin: props.spin,
                pulse: props.pulse,
                flip: props.flip,
                rotate: props.rotate,
            }),
        );
    }
});
