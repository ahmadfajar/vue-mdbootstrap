/* eslint-disable @typescript-eslint/no-empty-object-type */
import { useFetchData, useRenderCombobox } from '@/components/Combobox/mixins/comboboxApi.ts';
import { comboboxProps } from '@/components/Combobox/mixins/comboboxProps.ts';
import type {
  TBsCombobox,
  TComboboxOptionProps,
  TDataListSchema,
} from '@/components/Combobox/types';
import {
  useFieldControlClasses,
  useFieldWrapperClasses,
  useShowClearButton,
} from '@/components/Field/mixins/textFieldApi.ts';
import { useGetValidationResult } from '@/components/Field/mixins/validationApi.ts';
import type { FieldSlots } from '@/components/Field/types/internals.ts';
import { cssPrefix } from '@/mixins/CommonApi.ts';
import type { TBsModel } from '@/model';
import type { Numberish, TRecord } from '@/types';
import type { UpdateModelValueEventProps, UpdateModelValueEventPublic } from '@/types/internals.ts';
import Helper from '@/utils/Helper.ts';
import type {
  ComponentOptionsMixin,
  ComponentProvideOptions,
  ComputedOptions,
  DefineComponent,
  ExtractDefaultPropTypes,
  MethodOptions,
  PublicProps,
  SlotsType,
  VNode,
} from 'vue';
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
    const selectedItems = shallowRef<TBsModel[]>([]);
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
                fieldValues.value.some((v) => v === it[dataSchema.valueField])
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
}) as DefineComponent<
  TBsCombobox,
  {},
  {},
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  ComboboxEventProps,
  string,
  PublicProps,
  Readonly<TComboboxOptionProps> & Readonly<ComboboxEventPublic>,
  ExtractDefaultPropTypes<TBsCombobox>,
  SlotsType<ComboboxSlots>,
  {},
  {},
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;

declare interface ComboboxSlots extends FieldSlots {
  /**
   * Additional slot used to customize the listbox items appearance.
   */
  'option-item'?: (arg: { item: TBsModel; index: number }) => VNode[] | VNode;

  /**
   * Additional slot used to place custom message when listbox is empty.
   */
  'empty-data-msg'?: () => VNode[] | VNode;

  /**
   * Additional slot used to place custom message when filtering listbox items returns no result.
   */
  'not-found-msg'?: () => VNode[] | VNode;
}

declare type ComboboxEventProps = UpdateModelValueEventProps<
  Numberish | Numberish[] | undefined
> & {
  /**
   * Fired when this component's value is being cleared.
   */
  clear?: VoidFunction;

  /**
   * Fired when the Popover is show.
   */
  open?: VoidFunction;

  /**
   * Fired when an item is selected.
   */
  select?: (item: TBsModel) => void;

  /**
   * Fired when an item is deselected.
   */
  deselect?: (item: TBsModel) => void;

  /**
   * Fired when the data has been fetched.
   */
  'data-bind'?: (data: TBsModel[]) => void;

  /**
   * Fired when error loading data items.
   */
  'data-error'?: (error: unknown) => void;

  /**
   * Fired when this component's data items is filtered.
   */
  'data-filter'?: (data: TBsModel[]) => void;

  /**
   * Fired when this component's selected value is updated.
   */
  'update:selected-value'?: (selected: TBsModel[]) => void;
};

declare interface ComboboxEventPublic extends UpdateModelValueEventPublic<
  Numberish | Numberish[] | undefined
> {
  /**
   * Fired when this component's value is being cleared.
   */
  onClear?: VoidFunction;

  /**
   * Fired when the Popover is show.
   */
  onOpen?: VoidFunction;

  /**
   * Fired when an item is selected.
   */
  onSelect?: (item: TBsModel) => void;

  /**
   * Fired when an item is deselected.
   */
  onDeselect?: (item: TBsModel) => void;

  /**
   * Fired when the data has been fetched.
   */
  onDataBind?: (data: TBsModel[]) => void;

  /**
   * Fired when error loading data items.
   */
  onDataError?: (error: unknown) => void;

  /**
   * Fired when this component's data items is filtered.
   */
  onDataFilter?: (data: TBsModel[]) => void;

  /**
   * Fired when this component's selected value is updated.
   */
  'onUpdate:selectedValue'?: (selected: TBsModel[]) => void;

  /**
   * Fired when this component's value is being cleared.
   */
  '@clear'?: VoidFunction;

  /**
   * Fired when the Popover is show.
   */
  '@open'?: VoidFunction;

  /**
   * Fired when an item is selected.
   */
  '@select'?: (item: TBsModel) => void;

  /**
   * Fired when an item is deselected.
   */
  '@deselect'?: (item: TBsModel) => void;

  /**
   * Fired when the data has been fetched.
   */
  '@data-bind'?: (data: TBsModel[]) => void;

  /**
   * Fired when error loading data items.
   */
  '@data-error'?: (error: unknown) => void;

  /**
   * Fired when this component's data items is filtered.
   */
  '@data-filter'?: (data: TBsModel[]) => void;

  /**
   * Fired when this component's selected value is updated.
   */
  '@update:selected-value'?: (selected: TBsModel[]) => void;
}
