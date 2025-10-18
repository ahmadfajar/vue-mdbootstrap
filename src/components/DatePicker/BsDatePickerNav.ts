import {
  DatePickerConst,
  useRenderDatePickerNav,
  useWatchOfDatePickerNavProps,
} from '@/components/DatePicker/mixins/datePickerApi.ts';
import { datePickerNavProps } from '@/components/DatePicker/mixins/datePickerProps.ts';
import type { TBsDatePickerNav, TDatePickerNavProps } from '@/components/DatePicker/types';
import { DateTime } from 'luxon';
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
});
