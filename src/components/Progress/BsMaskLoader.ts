import type { ComponentOptionsMixin, ComputedOptions, EmitsOptions, MethodOptions, Prop } from 'vue';
import { computed, createCommentVNode, defineComponent, h } from 'vue';
import { cssPrefix, useRenderTransition } from '../../mixins/CommonApi';
import type {
    TBsIconSpinner,
    TBsMaskLoader,
    TBsOverlay,
    TBsProgress,
    TMaskLoaderOptionProps,
    TMaskLoaderVariant,
    TProgressControlVariant,
    TRecord
} from '../../types';
import Helper from '../../utils/Helper';
import { BsOverlay } from '../Animation';
import { BsIconSpinner } from '../Icon';
import BsProgress from './BsProgress';
import { maskLoaderProps } from './mixins/maskLoaderProps';

export default defineComponent<TBsMaskLoader, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>({
    name: 'BsMaskLoader',
    props: maskLoaderProps,
    setup(props) {
        const thisProps = props as Readonly<TMaskLoaderOptionProps>;
        const loaderVariant = computed<TMaskLoaderVariant>(
            () => <TMaskLoaderVariant>(thisProps.spinnerType || thisProps.variant)
        );

        return () =>
            useRenderTransition(
                {name: thisProps.transition},
                thisProps.show
                    ? h('div', {
                        class: [`${cssPrefix}mask-loader`],
                        style: {
                            'position': thisProps.fixedPosition ? 'fixed' : null,
                            'z-index': thisProps.zIndex
                        }
                    }, [
                        (loaderVariant.value === 'progress')
                            ? h<TBsProgress>(BsProgress, {
                                class: 'align-self-center',
                                color: props.spinnerColor,
                                diameter: props.spinnerDiameter,
                                stroke: props.spinnerThickness,
                                type: 'spinner' as Prop<TProgressControlVariant>
                            })
                            : ((loaderVariant.value === 'spinner')
                                    ? h<TBsIconSpinner>(BsIconSpinner, {
                                        color: props.spinnerColor,
                                        size: props.spinnerDiameter,
                                        // @ts-ignore
                                        spin: true as Prop<boolean>,
                                    })
                                    : h('div', {
                                        class: {
                                            'spinner-grow': loaderVariant.value === 'grow',
                                            'spinner-border': loaderVariant.value === 'linear',
                                            [`text-${thisProps.spinnerColor}`]: thisProps.spinnerColor
                                        },
                                        style: {
                                            'border-width': loaderVariant.value === 'linear'
                                                ? Helper.cssUnit(thisProps.spinnerThickness)
                                                : null,
                                            'height': Helper.cssUnit(thisProps.spinnerDiameter),
                                            'width': Helper.cssUnit(thisProps.spinnerDiameter),
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
                    : createCommentVNode(' BsMaskLoader ', true)
            );
    }
});
