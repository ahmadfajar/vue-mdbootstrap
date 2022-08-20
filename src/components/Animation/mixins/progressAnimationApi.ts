import {ComputedRef, h, Transition, VNode, VNodeArrayChildren, VNodeProps} from "vue";
import {ISpinnerElement, TBsProgressOptionProps, TSpinnerRecord} from "../types";
import {cssPrefix, useBrowserIE} from "../../../mixins/CommonApi";
import INDETERMINATE_ANIMATION_TEMPLATE from "./ProgressSpinnerAnimation";

const progressSpinner: TSpinnerRecord = {
    styleTag: undefined,
    diameters: new Set<number>(),
};

export const maskLoaderVariant = {
    type: String,
    default: 'linear',
    validator: (value: string): boolean => ['linear', 'progress', 'spinner', 'glow'].includes(value)
}

export const spinnerSvgData = "M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z";

export function useBufferMode(props: Readonly<TBsProgressOptionProps>) {
    return props.mode.toLowerCase() === 'buffer';
}

export function useDeterminateMode(props: Readonly<TBsProgressOptionProps>) {
    return props.mode.toLowerCase() === 'determinate';
}

export function useIndeterminateMode(props: Readonly<TBsProgressOptionProps>) {
    return props.mode.toLowerCase() === 'indeterminate';
}

export function useGetCSSAnimation(circleCircumference: number, diameter: number) {
    return INDETERMINATE_ANIMATION_TEMPLATE
        .replace(/START_VALUE/g, `${0.95 * circleCircumference}`)
        .replace(/END_VALUE/g, `${0.2 * circleCircumference}`)
        .replace(/DIAMETER/g, `${diameter}`);
}

export function useAttachStyleTag(circleCircumference: number, diameter: number) {
    let styleTag = progressSpinner.styleTag;

    if (!styleTag) {
        styleTag = document.getElementById('bs-progress-spinner-styles') as ISpinnerElement;
    }

    if (!styleTag) {
        styleTag = document.createElement('style') as ISpinnerElement;
        styleTag.id = 'bs-progress-spinner-styles';
        document.head.appendChild(styleTag);
        progressSpinner.styleTag = styleTag;
    }

    if (styleTag && styleTag.sheet) {
        styleTag.sheet.insertRule(useGetCSSAnimation(circleCircumference, diameter), 0);
    }

    progressSpinner.diameters.add(diameter);
}

export function useCircleSizeStyles(diameter: number): Record<string, string> {
    const size = `${diameter}px`;

    return {
        width: size,
        height: size
    }
}

type RawProps = VNodeProps & Record<string, unknown>;

export function useCreateSvgNode(
    clazz: Array<string> | Record<string, unknown>,
    style: Array<string> | Record<string, unknown>,
    focusable: boolean,
    aspectRatio?: string | null,
    viewBox?: string | null,
    otherProps?: object,
    children?: string | VNode | VNodeArrayChildren | object,
): VNode {
    const nodeProps: RawProps = {
        xmlns: "http://www.w3.org/2000/svg",
        class: clazz,
        style: style,
        focusable: focusable ? "true" : "false",
        preserveAspectRatio: aspectRatio,
        viewBox: viewBox,
        ...otherProps
    }
    // @ts-ignore
    return h("svg", nodeProps, children);
}

export function useCreateSvgCircleNode(
    clazz: Array<string> | Record<string, unknown>,
    style: Array<string> | Record<string, unknown>,
    radius: number,
): VNode {
    return h("circle", {
        class: clazz,
        style: style,
        cx: "50%",
        cy: "50%",
        r: radius,
    });
}

export function useRenderProgressBar(
    props: Readonly<TBsProgressOptionProps>,
    progressBarTrackStyle: ComputedRef<string | null>,
    progressBarValueStyle: ComputedRef<string | null>,
    progressBarBufferStyle: ComputedRef<string | null>,
): VNode {
    return h(Transition, {
        name: `${cssPrefix}-progress-bar`,
        appear: true,
    }, {
        default: () => {
            return h("div", {
                class: [
                    `${cssPrefix}-progress-bar`,
                    `progress-bar-${props.color}`,
                    `${cssPrefix}-${props.mode.toLowerCase()}`,
                ],
                style: {
                    height: `${props.height}px`
                }
            }, [
                h("div", {
                    class: [`${cssPrefix}-progress-bar-track`],
                    style: progressBarTrackStyle.value,
                }),
                h("div", {
                    class: [`${cssPrefix}-progress-bar-fill`],
                    style: progressBarValueStyle.value,
                }),
                h("div", {
                    class: [`${cssPrefix}-progress-bar-buffer`],
                    style: progressBarBufferStyle.value,
                }),
            ]);
        }
    });
}

export function useRenderProgressSpinner(
    props: Readonly<TBsProgressOptionProps>,
    circleStrokeDashOffset: ComputedRef<string | null>,
    circleCircumference: ComputedRef<number>,
    circleRadius: ComputedRef<number>,
): VNode {
    return h(Transition, {
        name: `${cssPrefix}-progress-spinner`,
        appear: true,
    }, {
        default: () => {
            return h("div", {
                class: [
                    `${cssPrefix}-progress-spinner`,
                    `${cssPrefix}-progress-spinner-indeterminate`,
                    `spinner-${props.color}`,
                    useBrowserIE() ? `${cssPrefix}-progress-spinner-indeterminate-fallback` : "",
                    useDeterminateMode(props) ? `${cssPrefix}-determinate` : `${cssPrefix}-indeterminate`,
                ],
            }, [
                useCreateSvgNode(
                    [`${cssPrefix}-progress-spinner-draw`],
                    useCircleSizeStyles(props.diameter as number),
                    false, "xMidYMid meet",
                    `0 0 ${props.diameter} ${props.diameter}`,
                    {},
                    [useCreateSvgCircleNode(
                        [`${cssPrefix}-progress-spinner-circle`],
                        {
                            "stroke-dashoffset": circleStrokeDashOffset.value,
                            "stroke-dasharray": `${circleCircumference.value}px`,
                            "stroke-width": `${props.stroke}px`,
                            "animation-name": `${cssPrefix}-progress-spinner-stroke-rotate-${props.diameter}`
                        },
                        circleRadius.value
                    )],
                ),
            ]);
        }
    });
}
