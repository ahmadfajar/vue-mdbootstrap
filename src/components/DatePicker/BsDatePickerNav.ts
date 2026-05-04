/* eslint-disable @typescript-eslint/no-empty-object-type */
import { DatePickerConst } from '@/components/DatePicker/mixins/datePickerApi.ts';
import {
  useRenderDatePickerNav,
  useWatchOfDatePickerNavProps,
} from '@/components/DatePicker/mixins/datePickerNav.ts';
import { datePickerNavProps } from '@/components/DatePicker/mixins/datePickerProps.ts';
import type { TDateTimePickerMode } from '@/components/DatePicker/types';
import type {
  TBsDatePickerNav,
  TDatePickerNavProps,
} from '@/components/DatePicker/types/internals.ts';
import type { TRecord } from '@/types';
import type { UpdateModelValueEventProps, UpdateModelValueEventPublic } from '@/types/internals.ts';
import { DateTime } from 'luxon';
import type {
  ComponentOptionsMixin,
  ComponentProvideOptions,
  ComputedOptions,
  DefineComponent,
  ExtractDefaultPropTypes,
  MethodOptions,
  PublicProps,
} from 'vue';
import { computed, defineComponent, ref } from 'vue';

export default defineComponent<TBsDatePickerNav>({
  name: 'BsDatePickerNav',
  props: datePickerNavProps,
  emits: ['toggle', 'update:model-value'],
  setup(props, { emit }) {
    const thisProps = props as Readonly<TDatePickerNavProps>;
    const reverse = ref(false);
    const formatOpts = ref<Intl.DateTimeFormatOptions>({
      month: 'long',
      year: 'numeric',
    });
    const localValue = ref<DateTime>(
      thisProps.modelValue ? DateTime.fromJSDate(thisProps.modelValue) : DateTime.now()
    );
    const transitionName = computed(() =>
      reverse.value === true ? DatePickerConst.transitionReverse : DatePickerConst.transition
    );

    thisProps.locale && (localValue.value = localValue.value.setLocale(thisProps.locale));
    useWatchOfDatePickerNavProps(thisProps, formatOpts, localValue, reverse);

    return () => useRenderDatePickerNav(emit, thisProps, transitionName, formatOpts, localValue);
  },
}) as DefineComponent<
  TBsDatePickerNav,
  {},
  {},
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  DatePickerNavEventProps,
  string,
  PublicProps,
  Readonly<TDatePickerNavProps> & Readonly<DatePickerNavEventPublic>,
  ExtractDefaultPropTypes<TBsDatePickerNav>,
  {},
  {},
  {},
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;

declare type DatePickerNavEventProps = UpdateModelValueEventProps<Date> & {
  toggle?: (view: TDateTimePickerMode) => void;
};

declare interface DatePickerNavEventPublic extends UpdateModelValueEventPublic<Date> {
  onToggle?: (view: TDateTimePickerMode) => void;
  '@toggle'?: (view: TDateTimePickerMode) => void;
}
