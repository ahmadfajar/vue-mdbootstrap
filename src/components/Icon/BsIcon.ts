import {ComponentOptionsMixin, ComputedOptions, defineComponent, EmitsOptions, h} from "vue";
import {useSizeHeight, useSizeStyles, useSizeWidth} from "./mixins/iconApi";
import {cssPrefix} from "../../mixins/CommonApi";
import {iconProps, iconSize as size} from "./mixins/iconProps";
import {TBsIcon, TIconOptionProps} from "./types";
import BsIconSvg from "./BsIconSvg";

export default defineComponent<TBsIcon, unknown, unknown, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
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
        const szHeight = useSizeHeight(props as Readonly<TIconOptionProps>);
        const szWidth = useSizeWidth(props as Readonly<TIconOptionProps>);

        return () => h(
            "span", {
                class: [`${cssPrefix}icon`],
                style: useSizeStyles(props as Readonly<TIconOptionProps>),
            }, h(BsIconSvg, {
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
