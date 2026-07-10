import {
  useDeferHideNotification,
  useRenderNotificationItem,
} from '@/components/Notification/mixins/notificationApi.ts';
import type {
  TBsNotificationItem,
  TNotificationItemOptionProps,
  TNotificationVariant,
} from '@/components/Notification/types';
import {
  booleanProp,
  booleanTrueProp,
  numberProp,
  stringMandatoryProp,
  stringProp,
} from '@/mixins/CommonProps.ts';
import type { TRecord } from '@/types';
import type {
  Component,
  ComponentOptionsMixin,
  ComponentProvideOptions,
  ComputedOptions,
  DefineComponent,
  Directive,
  ExtractDefaultPropTypes,
  MethodOptions,
  Prop,
  PublicProps,
  SlotsType,
  VNode,
} from 'vue';
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent<TBsNotificationItem>({
  name: 'BsNotificationItem',
  props: {
    message: stringMandatoryProp,
    title: stringProp,
    timeout: numberProp,
    clickClose: booleanProp,
    closeButton: booleanTrueProp,
    iconOff: booleanProp,
    progressBar: booleanProp,
    variant: stringMandatoryProp as Prop<TNotificationVariant>,
  },
  emits: ['dismiss'],
  setup(props, { emit }) {
    const thisProps = props as Readonly<TNotificationItemOptionProps>;
    const timerId = ref<number>();

    onMounted(() => {
      useDeferHideNotification(emit, timerId, thisProps.timeout);
    });

    return () => useRenderNotificationItem(emit, thisProps, timerId);
  },
}) as DefineComponent<
  TBsNotificationItem,
  () => VNode,
  TRecord,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  NotificationItemEventProps,
  string,
  PublicProps,
  Readonly<TNotificationItemOptionProps> & Readonly<NotificationItemEventPublic>,
  ExtractDefaultPropTypes<TBsNotificationItem>,
  SlotsType,
  Record<string, Component>,
  Record<string, Directive>,
  string,
  ComponentProvideOptions,
  true,
  TRecord,
  never
>;

declare type NotificationItemEventProps = {
  /**
   * Fired when this notification item is dismissed or closed.
   */
  dismiss?: () => void;
};

declare interface NotificationItemEventPublic {
  /**
   * Fired when this notification item is dismissed or closed.
   */
  onDismiss?: () => void;

  /**
   * Fired when this notification item is dismissed or closed.
   */
  '@dismiss'?: () => void;
}
