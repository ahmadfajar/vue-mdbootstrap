import {
    useAddTooltipListener,
    useRemoveTooltipListener,
    useSetTooltipPosition,
} from '@/components/Tooltip/mixins/tooltipApi.ts';
import { Resize, Scroll } from '@/directives';
import { cssPrefix, useRenderTransition } from '@/mixins/CommonApi.ts';
import {
    booleanProp,
    stringOrNumberProp,
    stringProp,
    validStringOrNumberProp,
} from '@/mixins/CommonProps.ts';
import type { TBsTooltip, TPlacementPosition, TTooltipOptionProps } from '@/types';
import Helper from '@/utils/Helper';
import type { ComponentInternalInstance, ComponentPublicInstance, Prop } from 'vue';
import {
    computed,
    createCommentVNode,
    defineComponent,
    Fragment,
    getCurrentInstance,
    h,
    nextTick,
    onBeforeUnmount,
    onMounted,
    ref,
    Teleport,
    toDisplayString,
    watch,
    withDirectives,
} from 'vue';

export default defineComponent<TBsTooltip>({
    name: 'BsTooltip',
    props: {
        activator: {
            type: [String, Object],
            default: undefined,
        } as Prop<string | Element | ComponentPublicInstance>,
        arrowOff: booleanProp,
        content: stringProp,
        disabled: booleanProp,
        show: booleanProp,
        placement: {
            type: String,
            default: 'bottom',
            validator: (v: string) => ['top', 'bottom', 'left', 'right'].includes(v),
        } as Prop<TPlacementPosition>,
        width: stringOrNumberProp,
        maxWidth: validStringOrNumberProp,
        zIndex: {
            type: [String, Number],
            default: 2000,
            validator: (value: string): boolean => !isNaN(parseInt(value, 10)),
        },
    },
    emits: [
        /**
         * Fired when this Tooltip state is updated.
         */
        'update:show',
    ],
    setup(props, { slots }) {
        const thisProps = props as Readonly<TTooltipOptionProps>;
        const tooltip = ref<Element | null>(null);
        const tooltipArrow = ref<Element | null>(null);
        const activator = ref<Element | null>(null);
        const active = ref<boolean>(false);
        const isDisabled = ref<boolean>(thisProps.disabled ?? false);
        const isActive = computed(() => active.value || thisProps.show);
        const placement = ref<TPlacementPosition>(thisProps.placement ?? 'bottom');
        const transition = computed(() => `${cssPrefix}tooltip-${placement.value}`);
        const classNames = computed(() => [`${cssPrefix}tooltip`, transition.value]);
        const styles = computed(() => ({
            width: thisProps.width === 'auto' ? undefined : Helper.cssUnit(thisProps.width),
            'max-width': Helper.cssUnit(thisProps.maxWidth),
            'z-index': thisProps.zIndex,
            [`--${cssPrefix}tooltip-arrow-height`]: thisProps.arrowOff ? 0 : undefined,
            [`--${cssPrefix}tooltip-arrow-width`]: thisProps.arrowOff ? 0 : undefined,
        }));
        const setPosition = () => {
            nextTick().then(() =>
                useSetTooltipPosition(activator, tooltip, tooltipArrow, placement)
            );
        };

        let instance: ComponentInternalInstance | null;

        watch(
            () => thisProps.disabled as boolean,
            (value) => (isDisabled.value = value)
        );

        onMounted(() => {
            instance = getCurrentInstance();
            useAddTooltipListener(
                tooltip,
                tooltipArrow,
                activator,
                placement,
                active,
                isDisabled,
                instance,
                thisProps.activator
            );
        });
        onBeforeUnmount(() => useRemoveTooltipListener(activator));

        return () =>
            h(Fragment, null, [
                h(
                    Teleport,
                    { to: 'body' },
                    useRenderTransition({ name: transition.value }, [
                        isActive.value
                            ? withDirectives(
                                  h(
                                      'div',
                                      {
                                          class: classNames.value,
                                          style: styles.value,
                                          ref: tooltip,
                                      },
                                      [
                                          !thisProps.arrowOff &&
                                              h('div', {
                                                  ref: tooltipArrow,
                                                  class: 'tooltip-arrow',
                                              }),
                                          h(
                                              'div',
                                              {
                                                  class: `${cssPrefix}tooltip-inner`,
                                                  role: 'tooltip',
                                              },
                                              toDisplayString(thisProps.content)
                                          ),
                                      ]
                                  ),
                                  [
                                      [Resize, setPosition],
                                      [Scroll, setPosition],
                                  ]
                              )
                            : createCommentVNode(' BsTooltip ', true),
                    ])
                ),
                slots.default && slots.default(),
            ]);
    },
});
