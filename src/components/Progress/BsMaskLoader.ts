import {computed, createCommentVNode, defineComponent, h, Transition} from "vue";
import {
    booleanProp,
    defaultTransitionProp,
    primaryColorProp,
    stringProp,
    validStringOrFloatProp
} from "../../mixins/CommonProps";
import {cssPrefix} from "../../mixins/CommonApi";
import {maskLoaderVariant} from "./mixins/progressAnimationApi";
import {BsOverlay} from "../Animation";
import {BsIconSpinner} from "../Icon";
import BsProgress from "./BsProgress";
import Helper from "../../utils/Helper";

export default defineComponent({
    name: "BsMaskLoader",
    props: {
        /**
         * Sets the css-style `position` value. If `true` then css-style `position` is set to `fixed`.
         * @type {boolean}
         */
        fixedPosition: booleanProp,
        /**
         * Mask loader state, show or hide.
         * @type {boolean}
         */
        show: booleanProp,
        /**
         * Backdrop overlay opacity value.
         * @type {number}
         */
        overlayOpacity: validStringOrFloatProp,
        /**
         * Backdrop overlay color.
         * @type {string}
         */
        overlayColor: stringProp,
        /**
         * Mask loader spinner color.
         * @type {string}
         */
        spinnerColor: primaryColorProp,
        /**
         * Mask loader spinner diameter.
         * @type {number}
         */
        spinnerDiameter: {
            type: [String, Number],
            default: 36,
            validator: (value: string): boolean => !isNaN(parseInt(value, 10)),
        },
        /**
         * Mask loader spinner thickness.
         * @type {number}
         */
        spinnerThickness: {
            type: [String, Number],
            default: 5,
            validator: (value: string): boolean => !isNaN(parseInt(value, 10)),
        },
        /**
         * Mask loader variant type [deprecated], use `variant` instead.
         * @type {string}
         */
        spinnerType: maskLoaderVariant,
        /**
         * Mask loader variant type.
         * @type {string}
         */
        variant: maskLoaderVariant,
        /**
         * The animation transition to be used when displaying the mask loader.
         * @type {string}
         */
        transition: defaultTransitionProp,
        /**
         * Sets the css style `z-index` value.
         * @type {number}
         */
        zIndex: {
            type: [String, Number],
            default: 100,
            validator: (value: string): boolean => !isNaN(parseInt(value, 10)),
        },
    },
    setup(props) {
        const loaderSpinnerType = computed<string>(() => props.variant || props.spinnerType);

        return () => {
            return h(Transition, {
                name: props.transition
            }, {
                default: () => {
                    return props.show
                        ? h("div", {
                            class: [`${cssPrefix}-mask-loader`],
                            style: {
                                'position': props.fixedPosition ? 'fixed' : null,
                                'z-index': props.zIndex
                            }
                        }, [
                            (loaderSpinnerType.value === "progress")
                                ? h(BsProgress, {
                                    class: "align-self-center",
                                    color: props.spinnerColor,
                                    diameter: props.spinnerDiameter,
                                    stroke: props.spinnerThickness,
                                    type: "spinner"
                                })
                                : ((loaderSpinnerType.value === "spinner")
                                        ? h(BsIconSpinner, {
                                            color: props.spinnerColor,
                                            size: props.spinnerDiameter,
                                            spin: true,
                                        })
                                        : h("div", {
                                            class: {
                                                'spinner-grow': loaderSpinnerType.value === "grow",
                                                'spinner-border': loaderSpinnerType.value === "linear",
                                                [`text-${props.spinnerColor}`]: props.spinnerColor
                                            },
                                            style: {
                                                'border-width': loaderSpinnerType.value === "linear"
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
                }
            });
        }
    }
});
