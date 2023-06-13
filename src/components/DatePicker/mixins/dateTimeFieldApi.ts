import {DateTime} from "luxon";
import type {ComputedRef, ExtractPropTypes, Prop, Ref, Slots, VNode} from "vue";
import {Fragment, h} from "vue";
import {
    useOnFieldBlurred,
    useOnFieldFocused,
    useOnFieldValueCleared,
    useOnTextFieldNodeMounted
} from "../../Field/mixins/textFieldEventApi";
import {
    useCreateFieldActionIcon,
    useCreateFieldInnerWrapper,
    useCreateFieldWrapper,
    useInputTextFieldAttrs,
    useMakeInputBaseAttrs
} from "../../Field/mixins/textFieldApi";
import {useRenderFieldFeedback} from "../../Field/mixins/validationApi";
import {useTogglePopoverState} from "../../Combobox/mixins/comboboxApi";
import type {
    TBsDateTimeField,
    TDateTimeFieldOptionProps,
    TDateTimePickerMode,
    TEmitFn,
    TIconVariant,
    TRecord
} from "../../../types";
import {useParseDate} from "./datePickerApi";
import {BsPopover} from "../../Popover";
import BsDatePicker from "../BsDatePicker";
import Helper from "../../../utils/Helper";

export function useParseDateTimeFromFormat(
    value?: string | number | Date,
    format?: string,
    locale?: string,
): DateTime | undefined {
    if (value) {
        if (Helper.isString(value)) {
            try {
                return !Helper.isEmpty(format)
                    ? DateTime.fromFormat(<string>value, <string>format, {locale: locale})
                    : DateTime.fromISO(<string>value, {locale: locale});
            } catch (e) {
                try {
                    return DateTime.fromSQL(<string>value, {locale: locale});
                } catch (e) {
                    return undefined;
                }
            }
        } else if (Helper.isNumber(value)) {
            return DateTime.fromSeconds(<number>value, {locale: locale});
        } else if (value instanceof Date) {
            const result = DateTime.fromJSDate(value);
            if (!Helper.isEmpty(locale)) {
                return result.setLocale(<string>locale);
            }
            return result;
        }
    }

    return undefined;
}

function createInputTextField(
    emit: TEmitFn,
    props: Readonly<TDateTimeFieldOptionProps>,
    displayValue: Ref<string | undefined>,
    isFocused: Ref<boolean>,
    isPopoverOpen: Ref<boolean>,
): VNode {
    return h("input", {
        ...useMakeInputBaseAttrs(props),
        ...useInputTextFieldAttrs(props, false),
        readonly: true,
        role: "textbox",
        type: "text",
        value: displayValue.value,
        style: {
            cursor: "default"
        },
        onBlur: (e: Event) =>
            useOnFieldBlurred(emit, e, isFocused, (<boolean>props.disabled)),
        onFocus: (e: Event) =>
            useOnFieldFocused(emit, e, isFocused, (<boolean>props.disabled)),
        onClick: () =>
            useTogglePopoverState(emit, isPopoverOpen, <boolean>props.disabled, isPopoverOpen.value)
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
    errorItems: ComputedRef<string[]>,
): VNode {
    const thisProps = props as Readonly<TDateTimeFieldOptionProps>;
    const iconSize = 24;

    return useCreateFieldWrapper(
        slots, iconSize, wrapperCss, thisProps,
        h(Fragment, [
            h("div", {
                class: controlCss.value,
            }, [
                useCreateFieldInnerWrapper(
                    slots,
                    thisProps,
                    createInputTextField(emit, thisProps, displayValue, isFocused, isPopoverOpen),
                    iconSize,
                    calendarIcon.value,
                    thisProps.prependIcon,
                    useCreateFieldActionIcon(
                        showClearButton.value,
                        hasValidated.value,
                        hasError.value,
                        (<TIconVariant>thisProps.actionIconVariant),
                        iconSize,
                        () => useOnFieldValueCleared(emit, localFieldValue),
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
                    undefined,
                    () => useTogglePopoverState(
                        emit, isPopoverOpen, <boolean>thisProps.disabled, isPopoverOpen.value,
                    ),
                    () => useTogglePopoverState(
                        emit, isPopoverOpen, <boolean>thisProps.disabled, isPopoverOpen.value,
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
            // @ts-ignore
            h(BsPopover, {
                color: null,
                space: (thisProps.outlined ? 2 : 1),
                class: props.pickerCls,
                placement: props.pickerPlacement,
                transition: (props.transition || props.pickerTransition),
                open: isPopoverOpen.value,
                trigger: activator.value,
                onClose: () => useTogglePopoverState(emit, isPopoverOpen, false, true),
            }, {
                default: () => h(BsDatePicker, {
                    surfaceColor: props.pickerColor,
                    headerColor: props.headerColor,
                    headerPanel: props.headerPanel,
                    landscape: props.landscapeMode,
                    locale: <Prop<string>>locale.value,
                    readonly: (props.readonly || props.disabled),
                    mode: (props.viewMode || props.pickerMode),
                    modelValue: <Prop<Date | undefined>>localFieldValue.value?.toJSDate(),
                    width: props.pickerWidth,
                    "onUpdate:model-value": (value: string) => {
                        localFieldValue.value = useParseDate(value).setLocale(locale.value);
                        emit(
                            "update:model-value",
                            localFieldValue.value?.toFormat(<string>thisProps.valueFormat),
                        );
                    },
                })
            })
        ]),
        (node: VNode) => useOnTextFieldNodeMounted(thisProps, node),
    );
}
