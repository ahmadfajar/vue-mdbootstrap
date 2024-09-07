import { DateTime } from 'luxon';
import { computed, defineComponent, ref } from 'vue';
import {
    DatePickerConst,
    useRenderDatePickerNav,
    useWatchOfDatePickerNavProps,
} from './mixins/datePickerApi';
import { datePickerNavProps } from './mixins/datePickerProps';
import type { TBsDatePickerNav, TDatePickerNavProps } from './types';

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

        return () =>
            useRenderDatePickerNav(thisProps, emit, transitionName, formatOpts, localValue);
    },
});
