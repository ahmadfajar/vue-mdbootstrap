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
            () => (<string>props.variant) || (<string>props.spinnerType)
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
                                color: props.spinnerColor as Prop<string>,
                                diameter: props.spinnerDiameter as Prop<string | number>,
                                stroke: props.spinnerThickness as Prop<string | number>,
                                type: "spinner" as Prop<string>
                            })
                            : ((loaderVariant.value === "spinner")
                                    ? h<TBsIconSpinner>(BsIconSpinner, {
                                        color: props.spinnerColor as Prop<string>,
                                        size: props.spinnerDiameter as Prop<string | number>,
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
                                                ? Helper.sizeUnit(<string>props.spinnerThickness)
                                                : null,
                                            'height': Helper.sizeUnit(<string>props.spinnerDiameter),
                                            'width': Helper.sizeUnit(<string>props.spinnerDiameter),
                                        }
                                    })
                            ),
                        h<TBsOverlay>(BsOverlay, {
                            color: props.overlayColor as Prop<string>,
                            opacity: props.overlayOpacity as Prop<string | number>,
                            show: props.show as Prop<boolean>,
                            zIndex: ((<number>props.zIndex) - 1) as Prop<string | number>,
                        }),
                    ])
                    : createCommentVNode(" BsMaskLoader ", true)
            );
    }
});
