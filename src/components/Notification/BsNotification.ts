import { useRenderNotificationContainer } from '@/components/Notification/mixins/notificationApi.ts';
import type { INotificationProvider } from '@/components/Notification/mixins/NotificationProvider.ts';
import { useVueMdbNotification } from '@/mixins/CommonApi.ts';
import type { TRecord } from '@/types';
import {
  defineComponent,
  onMounted,
  shallowRef,
  type Component,
  type ComponentOptionsMixin,
  type ComponentProvideOptions,
  type ComputedOptions,
  type DefineComponent,
  type Directive,
  type EmitsOptions,
  type ExtractDefaultPropTypes,
  type MethodOptions,
  type PublicProps,
  type SlotsType,
  type VNode,
} from 'vue';

export default defineComponent({
  name: 'BsNotification',
  setup() {
    const provider = shallowRef<INotificationProvider>();

    onMounted(() => {
      provider.value = useVueMdbNotification();
    });

    return () => useRenderNotificationContainer(provider);
  },
}) as DefineComponent<
  TRecord,
  () => VNode,
  TRecord,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  EmitsOptions,
  string,
  PublicProps,
  Readonly<TRecord>,
  ExtractDefaultPropTypes<TRecord>,
  SlotsType,
  Record<string, Component>,
  Record<string, Directive>,
  string,
  ComponentProvideOptions,
  true,
  TRecord,
  never
>;
