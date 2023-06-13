import type {ComponentOptionsMixin, ComputedOptions, EmitsOptions, Prop} from "vue";
import {computed, createCommentVNode, defineComponent, h} from "vue";
import {cssPrefix, useRenderTransition} from "../../mixins/CommonApi";
import {maskLoaderProps} from "./mixins/maskLoaderProps";
import {BsOverlay} from "../Animation";
import {BsIconSpinner} from "../Icon";
import type {TBsIconSpinner, TBsMaskLoader, TBsOverlay, TBsProgress} from "../../types";
import BsProgress from "./BsProgress";
import Helper from "../../utils/Helper";

export default defineComponent<TBsMaskLoader, unknown, unknown, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsMaskLoader",
    props: maskLoaderProps,
    setup(props) {
        const loaderVariant = computed<string>(
            () => <string>(props.spinnerType || props.variant)
        );

        return () =>
            useRenderTransition(
                {name: props.transition as string},
                props.show
                    ? h("div", {
                        class: [`${cssPrefix}mask-loader`],
                        style: {
                            'position': props.fixedPosition ? 'fixed' : null,
                            'z-index': props.zIndex
                        }
                    }, [
                        (loaderVariant.value === "progress")
                            ? h<TBsProgress>(BsProgress, {
                                class: "align-self-center",
                                color: props.spinnerColor,
                                diameter: props.spinnerDiameter,
                                stroke: props.spinnerThickness,
                                type: "spinner" as Prop<string>
                            })
                            : ((loaderVariant.value === "spinner")
                                    ? h<TBsIconSpinner>(BsIconSpinner, {
                                        color: props.spinnerColor,
                                        size: props.spinnerDiameter,
                                        // @ts-ignore
                                        spin: true as Prop<boolean>,
                                    })
                                    : h("div", {
                                        class: {
                                            'spinner-grow': loaderVariant.value === "grow",
                                            'spinner-border': loaderVariant.value === "linear",
                                            [`text-${props.spinnerColor}`]: props.spinnerColor
                                        },
                                        style: {
                                            'border-width': loaderVariant.value === "linear"
                                                ? Helper.cssUnit(<string>props.spinnerThickness)
                                                : null,
                                            'height': Helper.cssUnit(<string>props.spinnerDiameter),
                                            'width': Helper.cssUnit(<string>props.spinnerDiameter),
                                        }
                                    })
                            ),
                        h<TBsOverlay>(BsOverlay, {
                            color: props.overlayColor,
                            opacity: props.overlayOpacity,
                            show: props.show,
                            zIndex: ((<number>props.zIndex) - 1) as Prop<string | number>,
                        }),
                    ])
                    : createCommentVNode(" BsMaskLoader ", true)
            );
    }
});
