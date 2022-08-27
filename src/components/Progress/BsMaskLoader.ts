import {
    ComponentOptionsMixin,
    computed,
    ComputedOptions,
    createCommentVNode,
    defineComponent,
    EmitsOptions,
    h, Prop
} from "vue";
import {cssPrefix, useRenderTransition} from "../../mixins/CommonApi";
import {maskLoaderProps} from "./mixins/maskLoaderProps";
import {BsOverlay} from "../Animation";
import {TBsOverlay} from "../Animation/types";
import {BsIconSpinner} from "../Icon";
import {TBsIconSpinner} from "../Icon/types";
import {TBsMaskLoader, TBsProgress} from "./types";
import BsProgress from "./BsProgress";
import Helper from "../../utils/Helper";

export default defineComponent<TBsMaskLoader, unknown, unknown, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsMaskLoader",
    props: maskLoaderProps,
    setup(props) {
        const loaderVariant = computed<string>(() => (props.variant as string) || (props.spinnerType as string));

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
                                                ? Helper.sizeUnit(props.spinnerThickness as string)
                                                : null,
                                            'height': Helper.sizeUnit(props.spinnerDiameter as string),
                                            'width': Helper.sizeUnit(props.spinnerDiameter as string),
                                        }
                                    })
                            ),
                        h<TBsOverlay>(BsOverlay, {
                            color: props.overlayColor as Prop<string>,
                            opacity: props.overlayOpacity as Prop<string | number>,
                            show: props.show as Prop<boolean>,
                            zIndex: ((props.zIndex as number) - 1) as Prop<string | number>,
                        }),
                    ])
                    : createCommentVNode(" BsMaskLoader ", true)
            );
    }
});
