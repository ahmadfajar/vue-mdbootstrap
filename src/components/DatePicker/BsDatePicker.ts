/* eslint-disable @typescript-eslint/no-empty-object-type */
import {
  DatePickerConst,
  useParseDate,
  useRenderDatePicker,
  useSetupDatePickerWatchers,
} from '@/components/DatePicker/mixins/datePickerApi.ts';
import { datePickerProps } from '@/components/DatePicker/mixins/datePickerProps.ts';
import type {
  TBsDatePicker,
  TDatePickerOptionProps,
  TDateTimePickerMode,
} from '@/components/DatePicker/types';
import { isServer } from '@/mixins/CommonApi.ts';
import type { TRecord } from '@/types';
import type { UpdateModelValueEventProps, UpdateModelValueEventPublic } from '@/types/internals.ts';
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

export default defineComponent<TBsDatePicker>({
  name: 'BsDatePicker',
  props: datePickerProps,
  emits: ['update:model-value'],
  setup(props, { emit }) {
    const thisProps = props as Readonly<TDatePickerOptionProps>;
    const locale = ref<string>(
      thisProps.locale || (isServer ? DatePickerConst.defaultLocale : window.navigator.language)
    );
    const localValue = ref(useParseDate(thisProps.modelValue).setLocale(locale.value));
    const calendarDate = ref<Date>(localValue.value.toJSDate());
    const currentView = ref<TDateTimePickerMode>(
      (thisProps.viewMode || thisProps.mode || DatePickerConst.DATE) as TDateTimePickerMode
    );
    const pickerMode = computed(
      () => (thisProps.viewMode || thisProps.mode || DatePickerConst.DATE) as TDateTimePickerMode
    );
    const showTime = computed(() =>
      [DatePickerConst.DATETIME, DatePickerConst.TIME].includes(pickerMode.value)
    );

    useSetupDatePickerWatchers(
      thisProps,
      pickerMode,
      currentView,
      locale,
      localValue,
      calendarDate
    );

    return () =>
      useRenderDatePicker(
        emit,
        thisProps,
        showTime,
        pickerMode,
        currentView,
        locale,
        localValue,
        calendarDate
      );
  },
}) as DefineComponent<
  TBsDatePicker,
  {},
  {},
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  UpdateModelValueEventProps<string>,
  string,
  PublicProps,
  Readonly<TDatePickerOptionProps> & Readonly<UpdateModelValueEventPublic<string>>,
  ExtractDefaultPropTypes<TBsDatePicker>,
  {},
  {},
  {},
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;
