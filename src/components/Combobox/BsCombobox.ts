import { useFetchData, useRenderCombobox } from '@/components/Combobox/mixins/comboboxApi.ts';
import { comboboxProps } from '@/components/Combobox/mixins/comboboxProps.ts';
import {
  useFieldControlClasses,
  useFieldWrapperClasses,
  useShowClearButton,
} from '@/components/Field/mixins/textFieldApi.ts';
import { useGetValidationResult } from '@/components/Field/mixins/validationApi.ts';
import { cssPrefix } from '@/mixins/CommonApi.ts';
import type {
  IBsModel,
  Numberish,
  TBsCombobox,
  TComboboxOptionProps,
  TDataListSchema,
  TRecord,
} from '@/types';
import Helper from '@/utils/Helper.ts';
import { computed, defineComponent, ref, shallowRef, watch } from 'vue';

export default defineComponent<TBsCombobox>({
  name: 'BsCombobox',
  props: comboboxProps,
  emits: [
    'clear',
    'close',
    'open',
    'select',
    'deselect',
    'data-bind',
    'data-error',
    'data-filter',
    'update:model-value',
    'update:selected-value',
  ],
  setup(props, { emit, slots }) {
    const thisProps = props as Readonly<TComboboxOptionProps>;
    const dataSchema = {
      displayField: 'text',
      valueField: 'value',
      imageField: 'image',
      cascadeField: 'parent',
      disableField: 'disabled',
      ...thisProps.dataSource?.schema,
    } as TDataListSchema;
    const dataSource = thisProps.dataSource?.proxy;
    const fieldValues = ref<Numberish[]>(
      Array.isArray(thisProps.modelValue)
        ? thisProps.modelValue
        : !Helper.isEmpty(thisProps.modelValue)
          ? [thisProps.modelValue]
          : []
    );
    const selectedItems = shallowRef<IBsModel[]>([]);
    const isFocused = ref(false);
    const isPopoverOpen = ref(false);
    const activator = ref<HTMLElement | null>(null);
    const validator = useGetValidationResult(thisProps, isFocused);
    const showClearButton = computed<boolean>(() => useShowClearButton(thisProps, fieldValues));
    const showAppendIcon = computed(
      () =>
        slots['append-inner'] != null ||
        !Helper.isEmpty(thisProps.appendIcon) ||
        showClearButton.value
    );
    const wrapperClasses = computed<TRecord>(() =>
      useFieldWrapperClasses(thisProps, validator.hasValidated.value, validator.hasError.value)
    );
    const controlClasses = computed<TRecord>(() => ({
      ...useFieldControlClasses(slots, thisProps, fieldValues, isFocused, showAppendIcon.value),
      [`${cssPrefix}combobox-field`]: true,
      [`${cssPrefix}open`]: isPopoverOpen.value,
      [`${cssPrefix}chip-enabled`]: thisProps.multiple && thisProps.chipEnabled,
    }));
    const uid = ref<number>();

    watch(
      () => thisProps.parentValue,
      (value) => {
        uid.value = window.setInterval(() => {
          if (dataSource?.storeState.loading === false) {
            useFetchData(dataSchema, value, dataSource).catch((error) => {
              emit('data-error', error);
              console.warn(error);
            });
            window.clearInterval(uid.value);
          }
        }, 100);
      }
    );

    watch(
      () => thisProps.modelValue,
      (value) => {
        if (Helper.isEmpty(value)) {
          fieldValues.value = [];
          selectedItems.value = [];
        } else {
          fieldValues.value =
            thisProps.multiple && Array.isArray(value) ? value : [value as string];

          if (
            !thisProps.multiple &&
            (dataSource?.filters.length === 0 ||
              dataSource?.defaultFilters.length === dataSource?.filters.length)
          ) {
            selectedItems.value =
              dataSource?.dataItems.filter((it) =>
                fieldValues.value.some((v) => v === it.get(dataSchema.valueField))
              ) || [];
          }
        }
      }
    );

    return () =>
      useRenderCombobox(
        slots,
        emit,
        thisProps,
        wrapperClasses,
        controlClasses,
        dataSchema,
        activator,
        fieldValues,
        selectedItems,
        isPopoverOpen,
        isFocused,
        showClearButton,
        validator.showHelpText,
        validator.showValidationError,
        validator.hasValidated,
        validator.hasError,
        validator.errorItems
      );
  },
});
