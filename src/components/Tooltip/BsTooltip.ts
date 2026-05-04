/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { TPlacementPosition } from '@/components/Tabs/types';
import {
  useAddTooltipListener,
  useRemoveTooltipListener,
  useSetTooltipPosition,
} from '@/components/Tooltip/mixins/tooltipApi.ts';
import type { TBsTooltip, TTooltipOptionProps } from '@/components/Tooltip/types';
import { Resize, Scroll } from '@/directives';
import { cssPrefix, useGenerateId, useRenderTransition } from '@/mixins/CommonApi.ts';
import {
  booleanProp,
  stringOrNumberProp,
  stringProp,
  validStringOrNumberProp,
} from '@/mixins/CommonProps.ts';
import type { TRecord } from '@/types';
import type { VoidDefaultSlots } from '@/types/internals.ts';
import Helper from '@/utils/Helper.ts';
import type {
  ComponentInternalInstance,
  ComponentOptionsMixin,
  ComponentProvideOptions,
  ComponentPublicInstance,
  ComputedOptions,
  DefineComponent,
  ExtractDefaultPropTypes,
  MethodOptions,
  Prop,
  PublicProps,
  SlotsType,
  VNode,
} from 'vue';
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
      default: 1030,
      validator: (value: string): boolean => !isNaN(parseInt(value, 10)),
    },
  },
  emits: ['update:show'],
  setup(props, { slots }) {
    const thisProps = props as Readonly<TTooltipOptionProps>;
    const tooltipID = useGenerateId();
    const tooltipRef = ref<Element | null>(null);
    const tooltipArrow = ref<Element | null>(null);
    const activator = ref<Element | null>(null);
    const active = ref(false);
    const isDisabled = ref(thisProps.disabled ?? false);
    const placementRef = ref<TPlacementPosition>(thisProps.placement || 'bottom');

    const isActive = computed(() => active.value || thisProps.show);
    const transition = computed(() => `${cssPrefix}tooltip-${placementRef.value}`);
    const classNames = computed(() => [`${cssPrefix}tooltip`, transition.value]);

    const styles = computed<TRecord>(() => ({
      width: thisProps.width === 'auto' ? undefined : Helper.cssUnit(thisProps.width),
      'max-width': Helper.cssUnit(thisProps.maxWidth),
      'z-index': thisProps.zIndex,
      [`--${cssPrefix}tooltip-arrow-height`]: thisProps.arrowOff ? 0 : undefined,
      [`--${cssPrefix}tooltip-arrow-width`]: thisProps.arrowOff ? 0 : undefined,
    }));

    const setPosition = async () => {
      await nextTick().then(() =>
        useSetTooltipPosition(activator, tooltipRef, tooltipArrow, placementRef)
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
        tooltipID,
        tooltipRef,
        tooltipArrow,
        activator,
        placementRef,
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
                      ref: tooltipRef,
                    },
                    [
                      !thisProps.arrowOff &&
                        h('div', {
                          ref: tooltipArrow,
                          class: `${cssPrefix}tooltip-arrow`,
                        }),
                      h(
                        'div',
                        {
                          class: `${cssPrefix}tooltip-inner`,
                          id: tooltipID,
                          role: 'tooltip',
                        },
                        (slots.content && slots.content()) || toDisplayString(thisProps.content)
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
}) as DefineComponent<
  TBsTooltip,
  {},
  {},
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  TooltipEventProps,
  string,
  PublicProps,
  Readonly<TTooltipOptionProps> & Readonly<TooltipEventPublic>,
  ExtractDefaultPropTypes<TBsTooltip>,
  SlotsType<TooltipSlots>,
  {},
  {},
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;

declare type TooltipEventProps = {
  /**
   * Fired when this Tooltip state is updated.
   */
  'update:show'?: (value: boolean) => void;
};

declare interface TooltipEventPublic {
  /**
   * Fired when this Tooltip state is updated.
   */
  'onUpdate:show'?: (value: boolean) => void;

  /**
   * Fired when this Tooltip state is updated.
   */
  '@update:show'?: (value: boolean) => void;
}

declare interface TooltipSlots extends VoidDefaultSlots {
  /**
   * Additional slot used to place the Tooltip's custom content.
   */
  content?: () => VNode[] | VNode;
}
