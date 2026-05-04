/* eslint-disable @typescript-eslint/no-empty-object-type */
import {
  startRipple,
  type TRippleData,
  useRenderRipples,
} from '@/components/Animation/mixins/rippleApi.ts';
import type { TBsRipple, TRippleOptionProps } from '@/components/Animation/types';
import { cssPrefix } from '@/mixins/CommonApi.ts';
import { booleanProp, tagProp } from '@/mixins/CommonProps.ts';
import type { TRecord } from '@/types';
import type { VoidDefaultSlots } from '@/types/internals.ts';
import type {
  ComponentOptionsMixin,
  ComponentProvideOptions,
  ComputedOptions,
  DefineComponent,
  ExtractDefaultPropTypes,
  MethodOptions,
  PublicProps,
  SlotsType,
} from 'vue';
import { computed, defineComponent, ref, watch } from 'vue';

export default defineComponent<TBsRipple>({
  name: 'BsRipple',
  props: {
    active: {
      type: [Boolean, Event],
      default: undefined,
    },
    centered: booleanProp,
    disabled: booleanProp,
    tag: tagProp,
  },
  emits: ['update:active'],
  setup(props, { emit, slots }) {
    const thisProps = props as Readonly<TRippleOptionProps>;
    const ripples = ref<TRippleData[]>([]);
    const element = ref<HTMLElement | null>(null);
    const touchTimeout = ref<number>(0);
    const eventType = ref<string>('');
    const disabled = ref(thisProps.disabled ?? false);
    const centered = ref(thisProps.centered ?? false);
    const classNames = computed<TRecord>(() => ({
      [`${cssPrefix}ripple`]: true,
      'ripple-off': disabled.value,
    }));
    const rippleClassNames = computed<TRecord>(() => ({
      [`${cssPrefix}center`]: centered.value,
    }));

    watch(
      () => thisProps.disabled,
      (value) => {
        disabled.value = value ?? false;
      }
    );

    watch(
      () => thisProps.active,
      (value) => {
        const isBoolean = typeof value === 'boolean';
        // prettier-ignore
        // @ts-expect-error: constructor may be null
        const isEvent = value?.constructor.toString().match(/function (\w*)/)[1].toLowerCase() === 'mouseevent';

        if (isBoolean && !disabled.value && value) {
          startRipple(element, ripples, eventType, disabled, centered, {
            type: 'mousedown',
          } as MouseEvent & TouchEvent);
        } else if (isEvent) {
          startRipple(
            element,
            ripples,
            eventType,
            disabled,
            centered,
            value as MouseEvent & TouchEvent
          );
        }
        emit('update:active', false);
      }
    );

    return () =>
      useRenderRipples(
        thisProps.tag || 'div',
        slots,
        element,
        ripples,
        classNames,
        rippleClassNames,
        eventType,
        disabled,
        centered,
        touchTimeout
      );
  },
}) as DefineComponent<
  TBsRipple,
  {},
  {},
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  RippleEventProps,
  string,
  PublicProps,
  Readonly<TRippleOptionProps> & Readonly<RippleEventPublic>,
  ExtractDefaultPropTypes<TBsRipple>,
  SlotsType<VoidDefaultSlots>,
  {},
  {},
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;

declare type RippleEventProps = {
  /**
   * Fired when the ripple effect is updated.
   */
  'update:active'?: (value: boolean) => void;
};

declare interface RippleEventPublic {
  /**
   * Fired when the ripple effect is updated.
   */
  'onUpdate:active'?: (value: boolean) => void;

  /**
   * Fired when the ripple effect is updated.
   */
  '@update:active'?: (value: boolean) => void;
}
