import { BsChip } from '@/components/Chip';
import { BsListbox } from '@/components/Combobox';
import {
  useCreateFieldInnerWrapper,
  useCreateFieldWrapper,
  useCreateValidationIcon,
  useInputFieldBaseAttrs,
} from '@/components/Field/mixins/textFieldApi.ts';
import { useOnTextFieldNodeMounted } from '@/components/Field/mixins/textFieldEventApi.ts';
import { useRenderFieldFeedback } from '@/components/Field/mixins/validationApi.ts';
import { BsIcon } from '@/components/Icon';
import { BsListTileTitle } from '@/components/ListView';
import { BsPopover } from '@/components/Popover';
import { useTogglePopoverState } from '@/components/Popover/mixins/popoverApi.ts';
import { cssPrefix, useRenderSlot } from '@/mixins/CommonApi.ts';
import type {
  IArrayStore,
  IBsModel,
  IBsStore,
  Numberish,
  PromiseVoidFunction,
  TBsListbox,
  TBsPopover,
  TCheckboxPosition,
  TComboboxOptionProps,
  TDataListSchema,
  TDataSource,
  TEmitFn,
  TIconVariant,
  TPopoverPosition,
  TRecord,
} from '@/types';
import Helper from '@/utils/Helper.ts';
import { kebabCase } from '@/utils/StringHelper.ts';
import type { ComputedRef, Prop, Ref, ShallowRef, Slots, VNode } from 'vue';
import { createCommentVNode, Fragment, h, nextTick, toDisplayString } from 'vue';

function createActionAppendIcon(
  showClearButton: boolean,
  iconVariant: TIconVariant,
  iconSize: number,
  clearHandler: PromiseVoidFunction,
  popoverHandler: VoidFunction
): VNode {
  return h(
    'div',
    {
      class: `${cssPrefix}action-icon`,
    },
    [
      showClearButton
        ? h(BsIcon, {
            class: 'icon-clear',
            icon: `cancel_${iconVariant}` as Prop<string>,
            size: iconSize as Prop<number | undefined>,
            onClick: clearHandler,
          })
        : '',
      h(BsIcon, {
        class: 'icon-expand',
        icon: `keyboard_arrow_down_${iconVariant}` as Prop<string>,
        size: iconSize as Prop<number | undefined>,
        onClick: popoverHandler,
      }),
    ]
  );
}

function renderChipOrCsvItems(
  props: Readonly<TComboboxOptionProps>,
  schema: TDataListSchema,
  selectedItems: ShallowRef<IBsModel[]>
): VNode {
  if (props.multiple && props.chipEnabled && selectedItems.value.length > 0) {
    return h(
      Fragment,
      null,
      selectedItems.value.map((it) =>
        h(
          BsChip,
          {
            key: kebabCase(it.get(schema.displayField) as string),
            color: props.chipColor as Prop<string>,
            disabled: props.disabled as unknown as Prop<boolean>,
            pill: props.chipPill as unknown as Prop<boolean>,
            outlined: props.chipOutlined as unknown as Prop<boolean>,
          },
          {
            default: () => toDisplayString(it.get(schema.displayField)),
          }
        )
      )
    );
  } else {
    const text = selectedItems.value.map((it) => it.get(schema.displayField));
    return h('span', { class: `${cssPrefix}field-value` }, toDisplayString(text.join(', ')));
  }
}

function renderComboboxInputField(
  props: Readonly<TComboboxOptionProps>,
  dataSchema: TDataListSchema,
  selectedItems: ShallowRef<IBsModel[]>,
  localValue: Ref<Numberish[]>
): VNode[] {
  const showPlaceholder = Helper.isEmpty(localValue.value) && !Helper.isEmpty(props.placeholder);

  return [
    showPlaceholder
      ? h(
          'span',
          {
            class: `${cssPrefix}field-placeholder`,
          },
          toDisplayString(props.placeholder)
        )
      : createCommentVNode(' v-if-placeholder '),
    renderChipOrCsvItems(props, dataSchema, selectedItems),
    h(
      'select',
      {
        ...useInputFieldBaseAttrs(props),
        class: 'hidden',
        tabindex: -1,
        'aria-hidden': true,
        multiple: props.multiple,
        'aria-required': props.required && !props.disabled,
        'aria-disabled': props.disabled,
      },
      selectedItems.value.map((it) =>
        h(
          'option',
          {
            key: `item-${it.get(dataSchema.valueField) as string}`,
            value: it.get(dataSchema.valueField),
            selected: 'selected',
          },
          toDisplayString(it.get(dataSchema.displayField))
        )
      )
    ),
  ];
}

function createFieldInnerProps(
  emit: TEmitFn,
  props: Readonly<TComboboxOptionProps>,
  activator: Ref<HTMLElement | null>,
  isPopoverOpen: Ref<boolean>,
  isFocused: Ref<boolean>
): TRecord {
  return {
    ref: activator,
    tabIndex: 0,
    onMouseenter: () => {
      if (props.openOnHover && !isPopoverOpen.value) {
        useTogglePopoverState(
          emit,
          isPopoverOpen,
          (props.readonly || props.disabled) as boolean,
          false
        );
      }
    },
    onFocus: () => {
      isFocused.value = !props.disabled;
    },
    onBlur: () => {
      if (!props.disabled && !isPopoverOpen.value && !props.openOnHover) {
        isFocused.value = false;
      }
    },
    onClick: () => {
      isFocused.value = !props.disabled;
      useTogglePopoverState(
        emit,
        isPopoverOpen,
        (props.readonly || props.disabled) as boolean,
        isPopoverOpen.value
      );
    },
  };
}

export function useRenderCombobox(
  slots: Slots,
  emit: TEmitFn,
  props: Readonly<TComboboxOptionProps>,
  wrapperCss: ComputedRef<TRecord>,
  controlCss: ComputedRef<TRecord>,
  schema: TDataListSchema,
  activator: Ref<HTMLElement | null>,
  localValue: Ref<Numberish[]>,
  selectedItems: ShallowRef<IBsModel[]>,
  isPopoverOpen: Ref<boolean>,
  isFocused: Ref<boolean>,
  showClearButton: ComputedRef<boolean>,
  showHelpText: ComputedRef<boolean>,
  showValidationError: ComputedRef<boolean>,
  hasValidated: ComputedRef<boolean>,
  hasError: ComputedRef<boolean>,
  errorItems: ComputedRef<string[]>
): VNode {
  const listboxWidth = () => {
    const minWidth = props.listboxMinWidth;
    return minWidth ? parseInt(minWidth as string, 10) : 0;
  };

  const iconSize = 24;

  return useCreateFieldWrapper(
    slots,
    iconSize,
    wrapperCss,
    props,
    h(Fragment, [
      h(
        'div',
        {
          class: controlCss.value,
        },
        [
          useCreateFieldInnerWrapper(
            slots,
            props,
            renderComboboxInputField(props, schema, selectedItems, localValue),
            iconSize,
            props.appendIcon,
            props.prependIcon,
            useCreateValidationIcon(
              props.actionIconVariant as TIconVariant,
              hasValidated.value,
              hasError.value,
              props.validationIcon as boolean,
              iconSize
            ),
            createActionAppendIcon(
              showClearButton.value,
              props.actionIconVariant as TIconVariant,
              iconSize,
              async () => {
                localValue.value = [];
                selectedItems.value = [];
                emit('update:model-value', props.multiple ? [] : undefined);
                await nextTick().then(() => emit('clear'));
              },
              () => {
                isFocused.value = !props.disabled;
                useTogglePopoverState(
                  emit,
                  isPopoverOpen,
                  (props.readonly || props.disabled) as boolean,
                  isPopoverOpen.value
                );
              }
            ),
            undefined,
            createFieldInnerProps(emit, props, activator, isPopoverOpen, isFocused),
            undefined,
            () => useTogglePopoverState(emit, isPopoverOpen, props.disabled as boolean, true),
            () => useTogglePopoverState(emit, isPopoverOpen, props.disabled as boolean, true)
          ),
          useRenderFieldFeedback(
            slots,
            props,
            showHelpText.value,
            showValidationError.value,
            hasError.value,
            errorItems.value
          ),
        ]
      ),
      h<TBsPopover>(
        BsPopover,
        {
          color: null,
          space: (props.outlined ? 2 : 1) as Prop<number>,
          class: ['overflow-y-hidden', `${cssPrefix}shadow-1`],
          placement: 'bottom' as Prop<TPopoverPosition>,
          transition: props.transition as Prop<string>,
          open: isPopoverOpen.value as unknown as Prop<boolean>,
          trigger: activator.value as Prop<HTMLElement>,
          style: {
            minWidth: Helper.cssUnit(
              Math.max(listboxWidth(), activator.value ? activator.value.offsetWidth : 0)
            ),
          },
          onClose: () => {
            isFocused.value = false;
            useTogglePopoverState(emit, isPopoverOpen, false, true);
          },
        },
        {
          default: () =>
            h<TBsListbox>(
              BsListbox,
              {
                autoload: Helper.isEmpty(props.parentValue) as unknown as Prop<boolean>,
                borderless: true as unknown as Prop<boolean>,
                useCheckbox: true as unknown as Prop<boolean>,
                color: props.listboxColor as Prop<string>,
                dataSource: props.dataSource as Prop<TDataSource>,
                readonly: props.readonly as unknown as Prop<boolean>,
                multiple: props.multiple as unknown as Prop<boolean>,
                emptyDataMessage: props.emptyDataMessage as Prop<string>,
                notFoundMessage: props.notFoundMessage as Prop<string>,
                searchLabel: props.listboxSearchLabel as Prop<string>,
                // searchText: (!isPopoverOpen.value ? "" : undefined),
                itemSeparator: props.itemSeparator as unknown as Prop<boolean>,
                itemSeparatorDark: props.itemSeparatorDark as unknown as Prop<boolean>,
                minSearchChars: props.minSearchChars as Prop<Numberish>,
                minSearchLength: props.minSearchLength as Prop<Numberish>,
                maxHeight: props.listboxMaxHeight as Prop<Numberish>,
                checkboxColor: props.checkboxColor as Prop<string>,
                checkboxPosition: props.checkboxPosition as Prop<TCheckboxPosition>,
                showImage: props.showImage as unknown as Prop<boolean>,
                imageSize: props.imageSize as Prop<Numberish>,
                circleImage: props.circleImage as unknown as Prop<boolean>,
                roundedImage: props.roundedImage as unknown as Prop<boolean>,
                modelValue: <Prop<string | number | string[] | number[]>>(
                  (props.multiple
                    ? localValue.value
                    : localValue.value.length > 0
                      ? localValue.value[0]
                      : undefined)
                ),
                onDataBind: (items: IBsModel[]) => {
                  selectedItems.value = items.filter((it) =>
                    localValue.value.some((v) => v === it.get(schema.valueField))
                  );
                  emit('data-bind', items);
                },
                onDataError: (error: unknown) => emit('data-error', error),
                onDataFilter: (items: IBsModel[]) => emit('data-filter', items),
                onSelect: (item: IBsModel) => emit('select', item),
                onDeselect: (item: IBsModel) => emit('deselect', item),
                'onUpdate:model-value': (
                  values: string | number | string[] | number[] | undefined
                ) => {
                  localValue.value =
                    values == null ? [] : Array.isArray(values) ? values : [values];
                  emit('update:model-value', values);
                },
                'onUpdate:selected-value': (values: IBsModel[]) => {
                  selectedItems.value = values;
                  emit('update:selected-value', values);
                  if (!props.multiple) {
                    isFocused.value = false;
                    useTogglePopoverState(emit, isPopoverOpen, false, true);
                  }
                },
              },
              {
                'option-item': (args: TDataItem) =>
                  useRenderSlot(
                    slots,
                    'option-item',
                    { key: 'list-tile-content' },
                    [
                      h(BsListTileTitle, null, {
                        default: () => toDisplayString(args.item.get(schema.displayField)),
                      }),
                    ],
                    { item: args.item, index: args.index }
                  ),
                'empty-data-msg': () =>
                  useRenderSlot(slots, 'empty-data-msg', { key: 'emptyDataMessage' }, [
                    h(BsListTileTitle, null, {
                      default: () => toDisplayString(props.emptyDataMessage),
                    }),
                  ]),
                'not-found-msg': () =>
                  useRenderSlot(slots, 'not-found-msg', { key: 'notFoundMessage' }, [
                    h(BsListTileTitle, null, {
                      default: () => toDisplayString(props.notFoundMessage),
                    }),
                  ]),
              }
            ),
        }
      ),
    ]),
    (node: VNode) => useOnTextFieldNodeMounted(props, node)
  );
}

/**
 * Fetch data from remote service and additionally create filters based on parentValue.
 */
export async function useFetchData(
  dataSchema: TDataListSchema,
  parentValue: string | number | undefined,
  dataSource?: IBsStore | IArrayStore
): Promise<void> {
  if (dataSource) {
    let oldFilters = dataSource.defaultFilters;
    oldFilters = oldFilters.filter((it) => it.property !== dataSchema.cascadeField);

    if (Helper.isEmpty(parentValue)) {
      dataSource.defaultFilters = oldFilters;
    } else {
      const newFilters = dataSource.createFilters({
        property: <string>dataSchema.cascadeField,
        value: parentValue,
        operator: 'eq',
      });

      if (oldFilters.length === 0) {
        dataSource.defaultFilters = newFilters;
      } else {
        dataSource.defaultFilters = newFilters.concat(oldFilters);
      }
    }

    dataSource.setFilters([], true);
    await dataSource.load();
  }
}

declare type TDataItem = {
  item: IBsModel;
  index: number;
};
