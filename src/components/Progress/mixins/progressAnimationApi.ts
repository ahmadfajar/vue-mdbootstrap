import {ComputedRef, h, Transition, VNode} from "vue";
import {ISpinnerElement, TProgressOptionProps, TSpinnerRecord} from "../types";
import {cssPrefix, useBrowserIE} from "../../../mixins/CommonApi";
import {useCircleSizeStyles, useCreateSvgCircleNode, useCreateSvgNode} from "../../Icon/mixins/svgApi";
import INDETERMINATE_ANIMATION_TEMPLATE from "./ProgressSpinnerAnimation";

const progressSpinner: TSpinnerRecord = {
    styleTag: undefined,
    diameters: new Set<number>(),
};

export const maskLoaderVariant = {
    type: String,
    default: 'linear',
    validator: (value: string): boolean => ['linear', 'progress', 'spinner', 'grow'].includes(value)
}

export function useBufferMode(props: Readonly<TProgressOptionProps>) {
    return props.mode.toLowerCase() === 'buffer';
}

export function useDeterminateMode(props: Readonly<TProgressOptionProps>) {
    return props.mode.toLowerCase() === 'determinate';
}

export function useIndeterminateMode(props: Readonly<TProgressOptionProps>) {
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

export function useRenderProgressBar(
    props: Readonly<TProgressOptionProps>,
    progressBarTrackStyle: ComputedRef<string | undefined>,
    progressBarValueStyle: ComputedRef<string | undefined>,
    progressBarBufferStyle: ComputedRef<string | undefined>,
): VNode {
    return h(Transition, {
        name: `${cssPrefix}progress-bar`,
        appear: true,
    }, {
        default: () => {
            return h("div", {
                class: [
                    `${cssPrefix}progress-bar`,
                    `progress-bar-${props.color}`,
                    `${cssPrefix}${props.mode.toLowerCase()}`,
                ],
                style: {
                    height: `${props.height}px`
                }
            }, [
                h("div", {
                    class: [`${cssPrefix}progress-bar-track`],
                    style: progressBarTrackStyle.value,
                }),
                h("div", {
                    class: [`${cssPrefix}progress-bar-fill`],
                    style: progressBarValueStyle.value,
                }),
                h("div", {
                    class: [`${cssPrefix}progress-bar-buffer`],
                    style: progressBarBufferStyle.value,
                }),
            ]);
        }
    });
}

export function useRenderProgressSpinner(
    props: Readonly<TProgressOptionProps>,
    circleStrokeDashOffset: ComputedRef<string | undefined>,
    circleCircumference: ComputedRef<number>,
    circleRadius: ComputedRef<number>,
): VNode {
    return h(Transition, {
        name: `${cssPrefix}progress-spinner`,
        appear: true,
    }, {
        default: () => {
            return h("div", {
                class: [
                    `${cssPrefix}progress-spinner`,
                    `spinner-${props.color}`,
                    useBrowserIE() ? `${cssPrefix}indeterminate-fallback` : "",
                    useDeterminateMode(props) ? `${cssPrefix}determinate` : `${cssPrefix}indeterminate`,
                ],
            }, [
                useCreateSvgNode(
                    [`${cssPrefix}progress-spinner-draw`],
                    useCircleSizeStyles(props.diameter as number),
                    false, "xMidYMid meet",
                    `0 0 ${props.diameter} ${props.diameter}`,
                    {},
                    [useCreateSvgCircleNode(
                        [`${cssPrefix}progress-spinner-circle`],
                        {
                            "stroke-dashoffset": circleStrokeDashOffset.value,
                            "stroke-dasharray": `${circleCircumference.value}px`,
                            "stroke-width": `${props.stroke}px`,
                            "animation-name": `${cssPrefix}progress-spinner-stroke-rotate-${props.diameter}`
                        },
                        circleRadius.value
                    )],
                ),
            ]);
        }
    });
}
