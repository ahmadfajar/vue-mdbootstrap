import {
    useCircleSizeStyles,
    useCreateSvgCircleNode,
    useCreateSvgNode,
} from '@/components/Icon/mixins/svgApi.ts';
import INDETERMINATE_ANIMATION_TEMPLATE from '@/components/Progress/mixins/ProgressSpinnerAnimation';
import type {
    TProgressBarLabelPosition,
    TProgressBarOptionProps,
    TProgressOptionProps,
} from '@/components/Progress/types';
import { cssPrefix, useBrowserIE } from '@/mixins/CommonApi.ts';
import Helper from '@/utils/Helper';
import type { ComputedRef, VNode } from 'vue';
import { h, Transition } from 'vue';

declare interface ISpinnerElement extends Element {
    sheet?: CSSStyleSheet;
}

declare type TSpinnerRecord = {
    styleTag?: ISpinnerElement;
    diameters: Set<number>;
};

const progressSpinner: TSpinnerRecord = {
    styleTag: undefined,
    diameters: new Set<number>(),
};

export function useBufferMode(props: Readonly<TProgressOptionProps>) {
    return props.mode?.toLowerCase() === 'buffer';
}

export function useDeterminateMode(props: Readonly<TProgressOptionProps>) {
    return props.mode?.toLowerCase() === 'determinate';
}

export function useIndeterminateMode(props: Readonly<TProgressOptionProps>) {
    return props.mode?.toLowerCase() === 'indeterminate';
}

export function useGetCSSAnimation(circleCircumference: number, diameter: number) {
    return INDETERMINATE_ANIMATION_TEMPLATE.replace(/START_VALUE/g, `${0.95 * circleCircumference}`)
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

export function useRenderAnimatedProgressBar(
    props: Readonly<TProgressOptionProps>,
    progressBarTrackStyle: ComputedRef<string | undefined>,
    progressBarValueStyle: ComputedRef<string | undefined>,
    progressBarBufferStyle: ComputedRef<string | undefined>
): VNode {
    return h(
        Transition,
        {
            name: `${cssPrefix}progress-bar`,
            appear: true,
        },
        {
            default: () => {
                return h(
                    'div',
                    {
                        class: [
                            `${cssPrefix}progress-bar`,
                            `progress-bar-${props.color}`,
                            `${cssPrefix}${props.mode?.toLowerCase()}`,
                        ],
                        style: {
                            height: `${props.height}px`,
                        },
                    },
                    [
                        h('div', {
                            class: [`${cssPrefix}progress-bar-track`],
                            style: progressBarTrackStyle.value,
                        }),
                        h('div', {
                            class: [`${cssPrefix}progress-bar-fill`],
                            style: progressBarValueStyle.value,
                        }),
                        h('div', {
                            class: [`${cssPrefix}progress-bar-buffer`],
                            style: progressBarBufferStyle.value,
                        }),
                    ]
                );
            },
        }
    );
}

export function useRenderAnimatedProgressSpinner(
    props: Readonly<TProgressOptionProps>,
    circleStrokeDashOffset: ComputedRef<string | undefined>,
    circleCircumference: ComputedRef<number>,
    circleRadius: ComputedRef<number>
): VNode {
    return h(
        Transition,
        {
            name: `${cssPrefix}progress-spinner`,
            appear: true,
        },
        {
            default: () => {
                return h(
                    'div',
                    {
                        class: [
                            `${cssPrefix}progress-spinner`,
                            `spinner-${props.color}`,
                            useBrowserIE() ? `${cssPrefix}indeterminate-fallback` : '',
                            useDeterminateMode(props)
                                ? `${cssPrefix}determinate`
                                : `${cssPrefix}indeterminate`,
                        ],
                    },
                    [
                        useCreateSvgNode(
                            [`${cssPrefix}progress-spinner-draw`],
                            useCircleSizeStyles(props.diameter as number),
                            false,
                            'xMidYMid meet',
                            `0 0 ${props.diameter} ${props.diameter}`,
                            {},
                            [
                                useCreateSvgCircleNode(
                                    [`${cssPrefix}progress-spinner-circle`],
                                    {
                                        'stroke-dashoffset': circleStrokeDashOffset.value,
                                        'stroke-dasharray': `${circleCircumference.value}px`,
                                        'stroke-width': `${props.stroke}px`,
                                        'animation-name': `${cssPrefix}progress-spinner-stroke-rotate-${props.diameter}`,
                                    },
                                    circleRadius.value
                                ),
                            ]
                        ),
                    ]
                );
            },
        }
    );
}

export function useRenderProgressBar(props: Readonly<TProgressBarOptionProps>): VNode {
    if (props.label || (props.showValue && props.valuePosition !== 'inside')) {
        return h('div', { class: `${cssPrefix}progress-wrapper` }, [
            props.labelPosition === 'top' || props.valuePosition === 'top'
                ? createProgressBarLabel(props, 'top')
                : undefined,
            h('div', { class: 'd-flex' }, [
                props.labelPosition === 'start' || props.valuePosition === 'start'
                    ? createProgressBarLabel(props, 'start')
                    : undefined,
                createProgressBar(props),
                props.labelPosition === 'end' || props.valuePosition === 'end'
                    ? createProgressBarLabel(props, 'end')
                    : undefined,
            ]),
            props.labelPosition === 'bottom' || props.valuePosition === 'bottom'
                ? createProgressBarLabel(props, 'bottom')
                : undefined,
        ]);
    } else {
        return createProgressBar(props);
    }
}

function createProgressBar(props: Readonly<TProgressBarOptionProps>): VNode {
    return h(
        'div',
        {
            class: ['progress flex-grow-1', props.roundedOff ? 'rounded-0' : ''],
            style: {
                height: Helper.cssUnit(props.height),
            },
        },
        [
            h(
                'div',
                {
                    class: [
                        'progress-bar',
                        props.striped ? 'progress-bar-striped' : '',
                        props.stripedAnimation ? 'progress-bar-animated' : '',
                        props.color ? `bg-${props.color}` : '',
                        props.innerCls ?? '',
                    ],
                    style: {
                        width: `${props.modelValue}%`,
                    },
                    role: 'progressbar',
                    'aria-label': props.label ?? 'progressbar',
                    'aria-valuenow': props.modelValue,
                    'aria-valuemin': 0,
                    'aria-valuemax': 100,
                },
                props.showValue && props.valuePosition === 'inside' ? `${props.modelValue}%` : ''
            ),
        ]
    );
}

function createProgressBarLabel(
    props: Readonly<TProgressBarOptionProps>,
    position: TProgressBarLabelPosition
): VNode {
    return h(
        'div',
        {
            class: [
                `${cssPrefix}progress-label`,
                props.labelPosition === 'start' || props.valuePosition === 'start' ? 'me-2' : '',
                props.labelPosition === 'end' ||
                (props.valuePosition === 'end' && props.valuePosition === position)
                    ? 'ms-2'
                    : '',
                props.labelAlignment === 'start' &&
                props.labelPosition === position &&
                ['top', 'bottom'].includes(props.labelPosition)
                    ? 'text-start'
                    : '',
                props.labelAlignment === 'end' &&
                props.labelPosition === position &&
                ['top', 'bottom'].includes(props.labelPosition)
                    ? 'text-end'
                    : '',
            ],
        },
        [
            props.label && props.labelPosition === position
                ? h('span', { class: ['text-label'] }, props.label)
                : undefined,
            props.valuePosition === position && props.label && props.labelPosition === position
                ? h('span', { class: 'ms-1' }, ':')
                : undefined,
            props.valuePosition === position
                ? h(
                      'span',
                      { class: props.label && props.labelPosition === position ? 'ms-2' : null },
                      `${props.modelValue}%`
                  )
                : undefined,
        ]
    );
}
