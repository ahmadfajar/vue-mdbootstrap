import {
    ComponentOptionsMixin,
    computed,
    ComputedOptions,
    createCommentVNode,
    defineComponent,
    EmitsOptions,
    h
} from "vue";
import {cssPrefix, useRenderTransition} from "../../mixins/CommonApi";
import {maskLoaderProps} from "./mixins/maskLoaderProps";
import {BsOverlay} from "../Animation";
import {BsIconSpinner} from "../Icon";
import {TBsMaskLoader} from "./types";
import BsProgress from "./BsProgress";
import Helper from "../../utils/Helper";

export default defineComponent<TBsMaskLoader, unknown, unknown, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsMaskLoader",
    props: maskLoaderProps,
    setup(props) {
        const loaderVariant = computed<string>(() => props.variant || props.spinnerType);

        return () =>
            useRenderTransition(
                {name: props.transition},
                props.show
                    ? h("div", {
                        class: [`${cssPrefix}mask-loader`],
                        style: {
                            'position': props.fixedPosition ? 'fixed' : null,
                            'z-index': props.zIndex
                        }
                    }, [
                        (loaderVariant.value === "progress")
                            ? h(BsProgress, {
                                class: "align-self-center",
                                color: props.spinnerColor,
                                diameter: props.spinnerDiameter,
                                stroke: props.spinnerThickness,
                                type: "spinner"
                            })
                            : ((loaderVariant.value === "spinner")
                                    ? h(BsIconSpinner, {
                                        color: props.spinnerColor,
                                        size: props.spinnerDiameter,
                                        spin: true,
                                    })
                                    : h("div", {
                                        class: {
                                            'spinner-grow': loaderVariant.value === "grow",
                                            'spinner-border': loaderVariant.value === "linear",
                                            [`text-${props.spinnerColor}`]: props.spinnerColor
                                        },
                                        style: {
                                            'border-width': loaderVariant.value === "linear"
                                                ? Helper.sizeUnit(props.spinnerThickness)
                                                : null,
                                            'height': Helper.sizeUnit(props.spinnerDiameter),
                                            'width': Helper.sizeUnit(props.spinnerDiameter),
                                        }
                                    })
                            ),
                        h(BsOverlay, {
                            color: props.overlayColor,
                            opacity: props.overlayOpacity,
                            show: props.show,
                            zIndex: (props.zIndex as number) - 1,
                        }),
                    ])
                    : createCommentVNode(" BsMaskLoader ", true)
            );
    }
});
