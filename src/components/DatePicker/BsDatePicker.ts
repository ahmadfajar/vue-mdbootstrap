import { computed, defineComponent, ref, watch } from 'vue';
import { isServer } from '../../mixins/CommonApi';
import { DatePickerConst, useParseDate, useRenderDatePicker } from './mixins/datePickerApi';
import { datePickerProps } from './mixins/datePickerProps';
import type { TBsDatePicker, TDatePickerOptionProps, TDateTimePickerMode } from './types';

export default defineComponent<TBsDatePicker>({
    name: 'BsDatePicker',
    props: datePickerProps,
    emits: [
        /**
         * Fired when this component's value is updated.
         */
        'update:model-value',
    ],
    setup(props, { emit }) {
        const thisProps = props as Readonly<TDatePickerOptionProps>;
        const locale = ref<string>(
            thisProps.locale ||
                (isServer ? DatePickerConst.defaultLocale : window.navigator.language)
        );
        const localValue = ref(useParseDate(thisProps.modelValue).setLocale(locale.value));
        const calendarDate = ref<Date>(localValue.value.toJSDate());
        const currentView = ref<TDateTimePickerMode>(
            (thisProps.viewMode || thisProps.mode || DatePickerConst.DATE) as TDateTimePickerMode
        );
        const pickerMode = computed(
            () =>
                (thisProps.viewMode ||
                    thisProps.mode ||
                    DatePickerConst.DATE) as TDateTimePickerMode
        );
        const showTime = computed(() =>
            [DatePickerConst.DATETIME, DatePickerConst.TIME].includes(pickerMode.value)
        );
        const ensureViewMode = () => {
            if (currentView.value === DatePickerConst.DATETIME) {
                currentView.value = DatePickerConst.DATE as TDateTimePickerMode;
            }
        };

        ensureViewMode();
        watch(
            () => (thisProps.viewMode || thisProps.mode) as TDateTimePickerMode | undefined,
            (value) => {
                value && (currentView.value = value);
                ensureViewMode();
            }
        );
        watch(
            () => thisProps.modelValue,
            (value) => {
                localValue.value = useParseDate(value).setLocale(locale.value);
                if (pickerMode.value !== DatePickerConst.YEAR) {
                    calendarDate.value = localValue.value.toJSDate();
                }
            }
        );
        watch(
            () => thisProps.locale,
            (value) => {
                if (value) {
                    locale.value = value;
                    localValue.value = localValue.value.setLocale(value);
                }
            }
        );

        return () =>
            useRenderDatePicker(
                props,
                emit,
                showTime,
                pickerMode,
                currentView,
                locale,
                localValue,
                calendarDate
            );
    },
});
