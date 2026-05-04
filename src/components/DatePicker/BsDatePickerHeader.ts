/* eslint-disable @typescript-eslint/no-empty-object-type */
import { DatePickerConst } from '@/components/DatePicker/mixins/datePickerApi.ts';
import {
  useDatePickerHeaderStyles,
  useHeaderTitleFormatOpts,
  useRenderDatePickerHeader,
  useWatchOfDatePickerHeaderProps,
} from '@/components/DatePicker/mixins/datePickerHeader.ts';
import { datePickerHeaderProps } from '@/components/DatePicker/mixins/datePickerProps.ts';
import type { TDateTimePickerMode } from '@/components/DatePicker/types';
import type {
  TBsDatePickerHeader,
  TDatePickerHeaderProps,
} from '@/components/DatePicker/types/internals.ts';
import type { TRecord } from '@/types';
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

export default defineComponent<TBsDatePickerHeader>({
  name: 'BsDatePickerHeader',
  props: datePickerHeaderProps,
  emits: ['change-view'],
  setup(props, { emit }) {
    const thisProps = props as Readonly<TDatePickerHeaderProps>;
    const reverse = ref(false);
    const formatOpts = ref<Intl.DateTimeFormatOptions>(
      useHeaderTitleFormatOpts(thisProps.pickerMode)
    );
    const localValue = ref<DateTime>(
      thisProps.modelValue ? DateTime.fromJSDate(thisProps.modelValue) : DateTime.now()
    );
    const isTimeActive = computed(
      () => thisProps.displayMode === DatePickerConst.TIME && !thisProps.readonly
    );
    const isYearActive = computed(
      () => thisProps.displayMode === DatePickerConst.YEAR && !thisProps.readonly
    );
    const isTitleActive = computed(
      () =>
        ((thisProps.displayMode === DatePickerConst.DATE &&
          [DatePickerConst.DATE, DatePickerConst.DATETIME].includes(
            <string>thisProps.pickerMode
          )) ||
          (thisProps.displayMode === DatePickerConst.MONTH &&
            thisProps.pickerMode === DatePickerConst.MONTH)) &&
        !thisProps.readonly
    );
    const transitionName = computed(() =>
      reverse.value === true ? 'slide-top-bottom' : 'slide-bottom-top'
    );
    const styles = computed<TRecord>(() =>
      useDatePickerHeaderStyles(thisProps, isYearActive, isTimeActive, isTitleActive)
    );

    thisProps.locale && (localValue.value = localValue.value.setLocale(thisProps.locale));
    useWatchOfDatePickerHeaderProps(thisProps, formatOpts, localValue, reverse);

    return () =>
      useRenderDatePickerHeader(
        emit,
        thisProps,
        styles,
        isYearActive,
        isTimeActive,
        isTitleActive,
        transitionName,
        formatOpts,
        localValue
      );
  },
}) as DefineComponent<
  TBsDatePickerHeader,
  {},
  {},
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  DatePickerHeaderEventProps,
  string,
  PublicProps,
  Readonly<TDatePickerHeaderProps> & Readonly<DatePickerHeaderEventPublic>,
  ExtractDefaultPropTypes<TBsDatePickerHeader>,
  {},
  {},
  {},
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;

declare type DatePickerHeaderEventProps = {
  'change-view'?: (view: TDateTimePickerMode) => void;
};

declare interface DatePickerHeaderEventPublic {
  onChangeView?: (view: TDateTimePickerMode) => void;
  '@change-view'?: (view: TDateTimePickerMode) => void;
}
