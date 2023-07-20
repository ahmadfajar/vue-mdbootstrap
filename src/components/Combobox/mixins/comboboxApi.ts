import type { ComputedRef, ExtractPropTypes, Prop, Ref, ShallowRef, Slots, VNode } from 'vue';
import { createCommentVNode, Fragment, h, nextTick, toDisplayString, withDirectives } from 'vue';
import { ClickOutside } from '../../../directives';
import { cssPrefix, useRenderSlot } from '../../../mixins/CommonApi';
import { kebabCase } from '../../../mixins/StringHelper';
import type {
    IBsModel,
    TBsCombobox,
    TComboboxOptionProps,
    TDataListSchemaProps,
    TEmitFn,
    TIconVariant,
    TPopoverPosition,
    TRecord
} from '../../../types';
import Helper from '../../../utils/Helper';
import { BsChip } from '../../Chip';
import {
    useCreateFieldInnerWrapper,
    useCreateFieldWrapper,
    useMakeInputBaseAttrs
} from '../../Field/mixins/textFieldApi';
import { useOnTextFieldNodeMounted } from '../../Field/mixins/textFieldEventApi';
import { useRenderFieldFeedback } from '../../Field/mixins/validationApi';
import { BsIcon } from '../../Icon';
import { BsListbox } from '../../Listbox';
import { BsListTileTitle } from '../../ListView';
import { BsPopover } from '../../Popover';

function createActionAppendIcons(
    showClearButton: boolean,
    hasValidated: boolean,
    hasError: boolean,
    iconVariant: TIconVariant,
    iconSize: number,
    clearHandler: EventListener,
    popoverHandler: EventListener,
): VNode {
    return h('div', {
        class: `${cssPrefix}action-icon`
    }, [
        (
            showClearButton
                ? h(BsIcon, {
                    class: 'icon-clear',
                    icon: `cancel_${iconVariant}` as Prop<string>,
                    size: iconSize as Prop<number | undefined>,
                    onClick: clearHandler
                })
                : ''
        ),
        (
            (hasValidated && hasError)
                ? h(BsIcon, {
                    class: 'icon-error text-danger',
                    icon: (iconVariant === 'outlined'
                        ? `error_outline_${iconVariant}`
                        : `error_${iconVariant}`) as Prop<string>,
                    size: iconSize as Prop<number | undefined>,
                })
                : (
                    (hasValidated && !hasError)
                        ? h(BsIcon, {
                            class: 'icon-success text-success',
                            icon: `check_${iconVariant}` as Prop<string>,
                            size: iconSize as Prop<number | undefined>,
                        })
                        : ''
                )
        ),
        h(BsIcon, {
            class: 'icon-expand',
            icon: `expand_more_${iconVariant}` as Prop<string>,
            size: iconSize as Prop<number | undefined>,
            onClick: popoverHandler
        })
    ])
}

function createChipsOrCsv(
    props: Readonly<ExtractPropTypes<TBsCombobox>>,
    schema: TDataListSchemaProps,
    selectedItems: ShallowRef<IBsModel[]>,
): VNode {
    const thisProps = props as Readonly<TComboboxOptionProps>;

    if (thisProps.chipEnabled && thisProps.multiple && selectedItems.value.length > 0) {
        return h(Fragment, null, selectedItems.value.map(
            (it) =>
                h(BsChip, {
                    key: kebabCase(it.get(schema.displayField)),
                    color: props.chipColor,
                    disabled: props.disabled,
                    pill: props.chipPill,
                    outlined: props.chipOutlined,
                }, {
                    default: () => toDisplayString(it.get(schema.displayField))
                })
        ));
    } else {
        const text = selectedItems.value.map(it => it.get(schema.displayField));
        return h('span', {class: `${cssPrefix}field-value`}, toDisplayString(text.join(', ')));
    }
}

function renderComboboxFieldInput(
    props: Readonly<ExtractPropTypes<TBsCombobox>>,
    dataSchema: TDataListSchemaProps,
    selectedItems: ShallowRef<IBsModel[]>,
    fieldValues: Ref<string[] | number[]>,
): VNode[] {
    const thisProps = props as Readonly<TComboboxOptionProps>;
    const showPlaceholder = Helper.isEmpty(fieldValues.value)
        && !Helper.isEmpty(thisProps.placeholder);

    return [
        (showPlaceholder
                ? h('span', {
                    class: `${cssPrefix}field-placeholder`
                }, toDisplayString(thisProps.placeholder))
                : createCommentVNode(' v-if-placeholder ')
        ),
        createChipsOrCsv(props, dataSchema, selectedItems),
        h('select', {
            ...useMakeInputBaseAttrs(thisProps),
            class: 'd-none',
            'tabindex': -1,
            'aria-hidden': true,
            'multiple': thisProps.multiple,
            'aria-required': thisProps.required,
            'aria-disabled': thisProps.disabled
        }, selectedItems.value.map(
            it =>
                h('option', {
                    key: `item-${it.get(dataSchema.valueField)}`,
                    value: it.get(dataSchema.valueField),
                    selected: 'selected',
                }, toDisplayString(it.get(dataSchema.displayField)))
        ))
    ]
}

/**
 * Toggle Popover state: show or hide.
 *
 * @param emit           Emitter function
 * @param isPopoverOpen  The Popover state reference
 * @param isDisabled     Is the component in disable state or not
 * @param state          Current Popover state. Toggle will inverse this state.
 */
export function useTogglePopoverState(
    emit: TEmitFn,
    isPopoverOpen: Ref<boolean>,
    isDisabled: boolean,
    state: boolean,
) {
    if (!isDisabled) {
        isPopoverOpen.value = !state;
        emit(isPopoverOpen.value ? 'open' : 'close');
    }
}

export function useRenderCombobox(
    slots: Slots,
    emit: TEmitFn,
    props: Readonly<ExtractPropTypes<TBsCombobox>>,
    wrapperCss: ComputedRef<TRecord>,
    controlCss: ComputedRef<TRecord>,
    schema: TDataListSchemaProps,
    activator: Ref<HTMLElement | null>,
    fieldValues: Ref<string[] | number[]>,
    selectedItems: ShallowRef<IBsModel[]>,
    isPopoverOpen: Ref<boolean>,
    isFocused: Ref<boolean>,
    showClearButton: ComputedRef<boolean>,
    showHelpText: ComputedRef<boolean>,
    showValidationError: ComputedRef<boolean>,
    hasValidated: ComputedRef<boolean>,
    hasError: ComputedRef<boolean>,
    errorItems: ComputedRef<string[]>,
): VNode {
    const thisProps = props as Readonly<TComboboxOptionProps>;
    const listboxWidth = () => {
        const minWidth = thisProps.popoverMinWidth || thisProps.listboxMinWidth;
        return minWidth ? parseInt(<string>minWidth, 10) : 0;
    };
    const iconSize = 24;

    return withDirectives(
        useCreateFieldWrapper(
            slots, iconSize, wrapperCss, thisProps,
            h(Fragment, [
                h('div', {
                    class: controlCss.value,
                }, [
                    useCreateFieldInnerWrapper(
                        slots,
                        thisProps,
                        renderComboboxFieldInput(props, schema, selectedItems, fieldValues),
                        iconSize,
                        thisProps.appendIcon,
                        thisProps.prependIcon,
                        createActionAppendIcons(
                            showClearButton.value,
                            hasValidated.value,
                            hasError.value,
                            (<TIconVariant>thisProps.actionIconVariant),
                            iconSize,
                            () => {
                                fieldValues.value = [];
                                selectedItems.value = [];
                                emit('update:model-value', thisProps.multiple ? [] : undefined);
                                nextTick().then(() => emit('clear'));
                            },
                            () => {
                                isFocused.value = !thisProps.disabled;
                                useTogglePopoverState(
                                    emit, isPopoverOpen,
                                    <boolean>(thisProps.readonly || thisProps.disabled),
                                    isPopoverOpen.value,
                                );
                            }
                        ),
                        undefined,
                        {
                            ref: activator,
                            onMouseenter: () => {
                                if (thisProps.openOnHover && !isPopoverOpen.value) {
                                    useTogglePopoverState(emit, isPopoverOpen, <boolean>thisProps.disabled, false);
                                }
                            },
                        },
                        {
                            tabIndex: -1,
                            onFocus: () => {
                                isFocused.value = !thisProps.disabled;
                            },
                            onClick: () => {
                                isFocused.value = !thisProps.disabled;
                                useTogglePopoverState(
                                    emit, isPopoverOpen,
                                    <boolean>(thisProps.readonly || thisProps.disabled),
                                    isPopoverOpen.value,
                                );
                            },
                        },
                        () => useTogglePopoverState(
                            emit, isPopoverOpen, <boolean>thisProps.disabled, true,
                        ),
                        () => useTogglePopoverState(
                            emit, isPopoverOpen, <boolean>thisProps.disabled, true,
                        ),
                    ),
                    useRenderFieldFeedback(
                        slots,
                        thisProps,
                        showHelpText.value,
                        showValidationError.value,
                        hasError.value,
                        errorItems.value,
                    ),
                ]),
                h(BsPopover, {
                    color: null,
                    space: (thisProps.outlined ? 2 : 1) as Prop<number>,
                    class: ['y-overflow-hidden', `${cssPrefix}shadow-1`],
                    placement: 'bottom' as Prop<TPopoverPosition>,
                    transition: props.transition,
                    // @ts-ignore
                    open: isPopoverOpen.value as Prop<boolean>,
                    trigger: activator.value as Prop<HTMLElement>,
                    style: {
                        minWidth: Helper.cssUnit(Math.max(listboxWidth(), (activator.value ? activator.value.offsetWidth : 0))),
                        // maxHeight: Helper.cssUnit(thisProps.popoverMaxHeight || thisProps.listboxMaxHeight),
                    },
                    onClose: () => useTogglePopoverState(emit, isPopoverOpen, false, true),
                }, {
                    default: () => h(BsListbox, {
                        // @ts-ignore
                        borderless: true as Prop<boolean>,
                        // @ts-ignore
                        useCheckbox: true as Prop<boolean>,
                        color: props.listboxColor,
                        dataSource: props.dataSource,
                        readonly: props.readonly,
                        multiple: props.multiple,
                        emptyDataMessage: props.emptyDataMessage,
                        notFoundMessage: props.notFoundMessage,
                        searchLabel: props.listboxSearchLabel,
                        // searchText: (!isPopoverOpen.value ? "" : undefined),
                        itemSeparator: props.itemSeparator,
                        minSearchChars: props.minSearchChars,
                        minSearchLength: (props.minimumItemsForSearch || props.minSearchLength),
                        maxHeight: (props.popoverMaxHeight || props.listboxMaxHeight),
                        checkboxColor: (props.checkOptionColor || props.checkboxColor),
                        checkboxPosition: (props.checkOptionPosition || props.checkboxPosition),
                        showImage: props.showImage,
                        imageSize: props.imageSize,
                        circleImage: props.circleImage,
                        roundedImage: props.roundedImage,
                        modelValue: <Prop<string | number | string[] | number[]>>(thisProps.multiple
                            ? fieldValues.value
                            : (fieldValues.value.length > 0 ? fieldValues.value[0] : undefined)),
                        'onData-bind': (items: IBsModel[]) => {
                            selectedItems.value = items.filter(
                                it => fieldValues.value.some(v => v === it.get(schema.valueField))
                            );
                            emit('data-bind', items);
                        },
                        'onData-error': (error: unknown) => emit('data-error', error),
                        'onData-filter': (items: IBsModel[]) => emit('data-filter', items),
                        'onSelect': (item: IBsModel) => emit('select', item),
                        'onDeselect': (item: IBsModel) => emit('deselect', item),
                        'onUpdate:model-value': (values: string | number | string[] | number[] | undefined) => {
                            fieldValues.value = values === undefined ? [] : (Array.isArray(values) ? values : [<string>values]);
                            emit('update:model-value', values);
                        },
                        'onUpdate:selected-value': (values: IBsModel[]) => {
                            selectedItems.value = values;
                            emit('update:selected-value', values);
                            if (!thisProps.multiple) {
                                useTogglePopoverState(emit, isPopoverOpen, false, true);
                            }
                        }
                    }, {
                        'option-item': (args: TDataItem) => useRenderSlot(
                            slots, 'option-item', {key: 'list-tile-content'},
                            [
                                h(BsListTileTitle, null, {
                                    default: () => toDisplayString(args.item.get(schema.displayField))
                                })
                            ],
                            {item: args.item, index: args.index},
                        ),
                        'empty-data-msg': () => useRenderSlot(
                            slots, 'empty-data-msg',
                            {key: 'emptyDataMessage'},
                            [
                                h(BsListTileTitle, null, {
                                    default: () => toDisplayString(thisProps.emptyDataMessage)
                                })
                            ]
                        ),
                        'not-found-msg': () => useRenderSlot(
                            slots, 'not-found-msg',
                            {key: 'notFoundMessage'},
                            [
                                h(BsListTileTitle, null, {
                                    default: () => toDisplayString(thisProps.notFoundMessage)
                                })
                            ]
                        ),
                    })
                }),
            ]),
            (node: VNode) => useOnTextFieldNodeMounted(thisProps, node),
        ), [
            [ClickOutside, () => {
                if (!thisProps.disabled) {
                    isFocused.value = false;
                }
            }]
        ]
    );
}

declare type TDataItem = {
    item: IBsModel,
    index: number,
}
