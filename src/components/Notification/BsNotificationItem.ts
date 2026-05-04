/* eslint-disable @typescript-eslint/no-empty-object-type */
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
  ComponentOptionsMixin,
  ComponentProvideOptions,
  ComputedOptions,
  DefineComponent,
  ExtractDefaultPropTypes,
  MethodOptions,
  Prop,
  PublicProps,
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
  {},
  {},
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  NotificationItemEventProps,
  string,
  PublicProps,
  Readonly<TNotificationItemOptionProps> & Readonly<NotificationItemEventPublic>,
  ExtractDefaultPropTypes<TBsNotificationItem>,
  {},
  {},
  {},
  string,
  ComponentProvideOptions,
  false,
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
