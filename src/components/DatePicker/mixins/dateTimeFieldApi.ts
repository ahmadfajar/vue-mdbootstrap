import { DateTime } from 'luxon';
import type { ComputedRef, ExtractPropTypes, Prop, Ref, Slots, VNode } from 'vue';
import { Fragment, h } from 'vue';
import type {
    TBsDateTimeField,
    TDateTimeFieldOptionProps,
    TDateTimePickerMode,
    TEmitFn,
    TIconVariant,
    TRecord,
} from '../../../types';
import Helper from '../../../utils/Helper';
import { useTogglePopoverState } from '../../Combobox/mixins/comboboxApi';
import {
    useCreateFieldActionIcon,
    useCreateFieldInnerWrapper,
    useCreateFieldWrapper,
    useCreateValidationIcon,
    useInputTextFieldAttrs,
    useMakeInputBaseAttrs,
} from '../../Field/mixins/textFieldApi';
import {
    useOnFieldBlurred,
    useOnFieldFocused,
    useOnFieldValueCleared,
    useOnTextFieldNodeMounted,
} from '../../Field/mixins/textFieldEventApi';
import { useRenderFieldFeedback } from '../../Field/mixins/validationApi';
import { BsPopover } from '../../Popover';
import BsDatePicker from '../BsDatePicker';
import { useParseDate } from './datePickerApi';

export function useParseDateTimeFromFormat(
    value?: string | number | Date,
    format?: string,
    locale?: string
): DateTime | undefined {
    if (value) {
        if (Helper.isString(value)) {
            try {
                return !Helper.isEmpty(format)
                    ? DateTime.fromFormat(value, format, { locale: locale })
                    : DateTime.fromISO(value, { locale: locale });
            } catch (e) {
                try {
                    return DateTime.fromSQL(value, { locale: locale });
                } catch (e) {
                    return undefined;
                }
            }
        } else if (Helper.isNumber(value)) {
            return DateTime.fromSeconds(value, { locale: locale });
        } else if (value instanceof Date) {
            const result = DateTime.fromJSDate(value);
            if (!Helper.isEmpty(locale)) {
                return result.setLocale(locale);
            }
            return result;
        }
    }

    return undefined;
}

function createDateTimeInputField(
    emit: TEmitFn,
    props: Readonly<TDateTimeFieldOptionProps>,
    displayValue: Ref<string | undefined>,
    isFocused: Ref<boolean>,
    isPopoverOpen: Ref<boolean>
): VNode {
    return h('input', {
        ...useMakeInputBaseAttrs(props),
        ...useInputTextFieldAttrs(props, false),
        readonly: true,
        role: 'textbox',
        type: 'text',
        value: displayValue.value,
        style: {
            cursor: 'default',
        },
        onBlur: (e: Event) => useOnFieldBlurred(emit, e, isFocused, props.disabled as boolean),
        onFocus: (e: Event) => useOnFieldFocused(emit, e, isFocused, props.disabled as boolean),
        onClick: () =>
            useTogglePopoverState(
                emit,
                isPopoverOpen,
                (props.disabled || props.readonly) as boolean,
                isPopoverOpen.value
            ),
    });
}

export function useRenderDateTimeField(
    slots: Slots,
    emit: TEmitFn,
    props: Readonly<ExtractPropTypes<TBsDateTimeField>>,
    wrapperCss: ComputedRef<TRecord>,
    controlCss: ComputedRef<TRecord>,
    activator: Ref<HTMLElement | null>,
    pickerMode: Ref<TDateTimePickerMode>,
    localFieldValue: Ref<DateTime | undefined>,
    displayValue: Ref<string | undefined>,
    locale: Ref<string>,
    calendarIcon: Ref<string>,
    isPopoverOpen: Ref<boolean>,
    isFocused: Ref<boolean>,
    showClearButton: ComputedRef<boolean>,
    showHelpText: ComputedRef<boolean>,
    showValidationError: ComputedRef<boolean>,
    hasValidated: ComputedRef<boolean>,
    hasError: ComputedRef<boolean>,
    errorItems: ComputedRef<string[]>
): VNode {
    const thisProps = props as Readonly<TDateTimeFieldOptionProps>;
    const iconSize = 24;

    return useCreateFieldWrapper(
        slots,
        iconSize,
        wrapperCss,
        thisProps,
        h(Fragment, [
            h(
                'div',
                {
                    class: controlCss.value,
                },
                [
                    useCreateFieldInnerWrapper(
                        slots,
                        thisProps,
                        createDateTimeInputField(
                            emit,
                            thisProps,
                            displayValue,
                            isFocused,
                            isPopoverOpen
                        ),
                        iconSize,
                        calendarIcon.value,
                        thisProps.prependIcon,
                        useCreateValidationIcon(
                            thisProps.actionIconVariant as TIconVariant,
                            hasValidated.value,
                            hasError.value,
                            thisProps.validationIcon as boolean,
                            iconSize
                        ),
                        useCreateFieldActionIcon(
                            showClearButton.value,
                            <TIconVariant>thisProps.actionIconVariant,
                            iconSize,
                            () => useOnFieldValueCleared(emit, localFieldValue)
                        ),
                        undefined,
                        {
                            ref: activator,
                            onMouseenter: () => {
                                if (thisProps.openOnHover && !isPopoverOpen.value) {
                                    useTogglePopoverState(
                                        emit,
                                        isPopoverOpen,
                                        (thisProps.disabled || thisProps.readonly) as boolean,
                                        false
                                    );
                                }
                            },
                        },
                        undefined,
                        () =>
                            useTogglePopoverState(
                                emit,
                                isPopoverOpen,
                                (thisProps.disabled || thisProps.readonly) as boolean,
                                isPopoverOpen.value
                            ),
                        () =>
                            useTogglePopoverState(
                                emit,
                                isPopoverOpen,
                                (thisProps.disabled || thisProps.readonly) as boolean,
                                isPopoverOpen.value
                            )
                    ),
                    useRenderFieldFeedback(
                        slots,
                        thisProps,
                        showHelpText.value,
                        showValidationError.value,
                        hasError.value,
                        errorItems.value
                    ),
                ]
            ),
            h(
                BsPopover,
                {
                    color: null,
                    space: (thisProps.outlined ? 2 : 1) as Prop<number>,
                    class: props.pickerCls,
                    placement: props.pickerPlacement,
                    transition: props.transition || props.pickerTransition,
                    // @ts-ignore
                    open: isPopoverOpen.value as Prop<boolean>,
                    trigger: activator.value as Prop<HTMLElement>,
                    onClose: () => useTogglePopoverState(emit, isPopoverOpen, false, true),
                },
                {
                    default: () =>
                        h(BsDatePicker, {
                            surfaceColor: props.pickerColor,
                            headerColor: props.headerColor,
                            headerPanel: props.headerPanel,
                            landscape: props.landscapeMode,
                            locale: locale.value as Prop<string>,
                            readonly: props.readonly || props.disabled,
                            mode: pickerMode.value as Prop<TDateTimePickerMode>,
                            modelValue: localFieldValue.value?.toJSDate() as Prop<Date | undefined>,
                            width: props.pickerWidth,
                            'onUpdate:model-value': (value: string) => {
                                localFieldValue.value = useParseDate(value).setLocale(locale.value);
                                emit(
                                    'update:model-value',
                                    localFieldValue.value?.toFormat(thisProps.valueFormat as string)
                                );
                            },
                        }),
                }
            ),
        ]),
        (node: VNode) => useOnTextFieldNodeMounted(thisProps, node)
    );
}
