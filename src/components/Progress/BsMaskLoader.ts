import { BsOverlay } from '@/components/Animation';
import { BsIconSpinner } from '@/components/Icon';
import { BsProgress } from '@/components/Progress';
import { maskLoaderProps } from '@/components/Progress/mixins/maskLoaderProps.ts';
import { cssPrefix, useRenderTransition } from '@/mixins/CommonApi.ts';
import type {
    TBsIconSpinner,
    TBsMaskLoader,
    TBsOverlay,
    TBsProgress,
    TMaskLoaderOptionProps,
    TMaskLoaderVariant,
    TProgressControlVariant,
} from '@/types';
import Helper from '@/utils/Helper';
import type { Prop } from 'vue';
import { computed, createCommentVNode, defineComponent, h } from 'vue';

export default defineComponent<TBsMaskLoader>({
    name: 'BsMaskLoader',
    props: maskLoaderProps,
    setup(props) {
        const thisProps = props as Readonly<TMaskLoaderOptionProps>;
        const loaderVariant = computed<TMaskLoaderVariant>(
            () => (thisProps.spinnerType || thisProps.type) as TMaskLoaderVariant
        );

        return () =>
            useRenderTransition(
                { name: thisProps.transition },
                thisProps.show
                    ? h(
                          'div',
                          {
                              class: [`${cssPrefix}mask-loader`],
                              style: {
                                  position: thisProps.fixedPosition ? 'fixed' : null,
                                  'z-index': thisProps.zIndex,
                              },
                          },
                          [
                              ['linear-alt', 'progress'].includes(loaderVariant.value)
                                  ? h<TBsProgress>(BsProgress, {
                                        class: 'align-self-center',
                                        color: props.spinnerColor,
                                        diameter: props.spinnerDiameter,
                                        stroke: props.spinnerThickness,
                                        type: 'spinner' as Prop<TProgressControlVariant>,
                                    })
                                  : loaderVariant.value === 'spinner'
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
                                              [`text-${thisProps.spinnerColor}`]:
                                                  thisProps.spinnerColor,
                                          },
                                          style: {
                                              'border-width':
                                                  loaderVariant.value === 'linear'
                                                      ? Helper.cssUnit(thisProps.spinnerThickness)
                                                      : null,
                                              height: Helper.cssUnit(thisProps.spinnerDiameter),
                                              width: Helper.cssUnit(thisProps.spinnerDiameter),
                                          },
                                      }),
                              h<TBsOverlay>(BsOverlay, {
                                  color: props.overlayColor,
                                  opacity: props.overlayOpacity,
                                  show: props.show,
                                  zIndex: ((props.zIndex as number) - 1) as Prop<string>,
                              }),
                          ]
                      )
                    : createCommentVNode(' BsMaskLoader ', true)
            );
    },
});
