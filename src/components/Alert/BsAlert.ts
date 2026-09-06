import {
  useAlertClassNames,
  useAlertColor,
  useAlertIcon,
  useRenderAlert,
} from '@/components/Alert/mixins/alertApi.ts';
import { alertProps } from '@/components/Alert/mixins/alertProps.ts';
import type {
  AlertEventProps,
  AlertEventPublic,
  AlertSlots,
  TAlertOptionProps,
  TBsAlert,
} from '@/components/Alert/types';
import type { TBooleanRecord, TContextColor, TRecord } from '@/types';
import {
  computed,
  defineComponent,
  nextTick,
  ref,
  watch,
  type Component,
  type ComponentOptionsMixin,
  type ComponentProvideOptions,
  type ComputedOptions,
  type DefineComponent,
  type Directive,
  type ExtractDefaultPropTypes,
  type MethodOptions,
  type PublicProps,
  type SlotsType,
} from 'vue';

export default defineComponent<TBsAlert>({
  name: 'BsAlert',
  props: alertProps,
  emits: ['close', 'update:model-value'],
  setup(props, { emit, slots }) {
    const thisProps = props as Readonly<TAlertOptionProps>;
    const dismissed = ref<boolean>(false);
    const alertColor = computed<TContextColor>(() => useAlertColor(thisProps));
    const alertIcon = computed<string | undefined>(() => useAlertIcon(thisProps));
    const classNames = computed<TBooleanRecord>(() => useAlertClassNames(thisProps, alertColor));
    const show = computed(() => !dismissed.value && thisProps.modelValue);

    const dismissedAlert = async () => {
      dismissed.value = true;
      emit('update:model-value', false);
      await nextTick().then(() => emit('close'));
    };

    watch(
      () => thisProps.modelValue,
      (value) => {
        if (thisProps.dismissible) {
          dismissed.value = !(value === true);
        }
      }
    );

    return () =>
      useRenderAlert(slots, thisProps, show, classNames, alertColor, alertIcon, dismissedAlert);
  },
}) as DefineComponent<
  TBsAlert,
  TRecord,
  TRecord,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  AlertEventProps,
  string,
  PublicProps,
  Readonly<TAlertOptionProps> & Readonly<AlertEventPublic>,
  ExtractDefaultPropTypes<TBsAlert>,
  SlotsType<AlertSlots>,
  Record<string, Component>,
  Record<string, Directive>,
  string,
  ComponentProvideOptions,
  true,
  TRecord,
  never
>;
