import { useCreateIconProps } from '@/components/Avatar/mixins/avatarApi';
import { BsToggleButton } from '@/components/Button';
import { useRenderFieldFeedback } from '@/components/Field/mixins/validationApi';
import { BsIcon } from '@/components/Icon';
import {
    cssPrefix,
    useGenerateId,
    useRenderSlot,
    useRenderSlotWithWrapper,
} from '@/mixins/CommonApi';
import { kebabCase } from '@/utils/StringHelper.ts';
import type {
    TBsIcon,
    TBsToggleField,
    TButtonMode,
    TButtonOptionProps,
    TEmitFn,
    TIconProps,
    TInputOptionItem,
    TRecord,
    TToggleButtonOptionProps,
    TToggleFieldOptionProps,
} from '@/types';
import Helper from '@/utils/Helper';
import type {
    ComputedRef,
    EmitFn,
    ExtractPropTypes,
    Prop,
    Ref,
    Slots,
    VNode,
    VNodeArrayChildren,
} from 'vue';
import { h, toDisplayString, vModelCheckbox, vModelRadio, withDirectives } from 'vue';

export function useMakeButtonProps(
    props: Readonly<TButtonOptionProps>,
    disabled: boolean,
    buttonType?: string | undefined
) {
    return {
        class: {
            btn: props.mode !== 'icon',
            [`${cssPrefix}btn-${props.mode}`]: props.mode === 'icon',
            [`btn-outline-${props.color}`]: props.outlined && props.color && !props.tonal,
            [`btn-flat-${props.color}`]:
                props.flat && props.color && !props.outlined && !props.tonal,
            [`btn-${props.color}`]: !props.outlined && !props.flat && props.color,
            [`btn-${props.size}`]: !Helper.isEmpty(props.size),
            [`${cssPrefix}btn-raised`]: props.raised,
            [`${cssPrefix}btn-tonal`]: props.tonal,
            [`${cssPrefix}btn-fab`]: ['fab', 'floating'].includes(props.mode as string),
            [`${cssPrefix}rounded-pill`]:
                props.pill && !['icon', 'fab', 'floating'].includes(props.mode as string),
            [`${cssPrefix}rounded-sm`]:
                !props.pill &&
                !props.rounded &&
                !['icon', 'fab', 'floating'].includes(props.mode as string),
            disabled: disabled,
            readonly: props.readonly,
            active: props.active,
        },
        role: 'button',
        href:
            !Helper.isEmpty(props.href) && !props.disabled && !props.readonly
                ? props.href
                : undefined,
        type: buttonType === 'div' ? undefined : buttonType,
        disabled: buttonType === 'div' ? undefined : disabled,
        'aria-disabled': buttonType === 'div' ? undefined : disabled,
    };
}

function isInputItemSelected(
    item: TInputOptionItem,
    props: Readonly<TToggleButtonOptionProps>
): boolean {
    if (props.multiple && Array.isArray(props.modelValue) && !Array.isArray(item.value)) {
        const sources = props.modelValue as Array<string | number | boolean>;
        return sources.find((it: string | number | boolean) => it === item.value) != null;
    } else {
        return props.modelValue === item.value;
    }
}

export function useCreateInputItemClasses(
    item: TInputOptionItem,
    props: Readonly<TToggleButtonOptionProps>
): TRecord {
    const isSelected = isInputItemSelected(item, props);

    return {
        btn: true,
        [`btn-${props.toggleColor}`]:
            isSelected && props.toggleColor && !props.disabled && !item.disabled,
        [`btn-outline-${props.color}`]:
            props.outlined && !props.tonal && (!isSelected || !props.toggleColor),
        [`btn-flat-${props.color}`]:
            props.flat && !props.outlined && !props.tonal && (!isSelected || !props.toggleColor),
        [`btn-${props.color}`]:
            !props.outlined && !props.flat && (!isSelected || !props.toggleColor),
        [`btn-${props.size}`]: !Helper.isEmpty(props.size),
        [`${cssPrefix}btn-raised`]: props.raised,
        [`${cssPrefix}btn-tonal`]: props.tonal,
        [`${cssPrefix}rounded-pill`]: props.pill,
        [`${cssPrefix}rounded-sm`]: !props.pill && !props.rounded,
        active: isSelected && !props.toggleColor && !props.disabled && !item.disabled,
        disabled: props.disabled || item.disabled,
        readonly: props.readonly || item.readonly,
    };
}

function createInputItemAttrs(
    item: TInputOptionItem,
    props: Readonly<TToggleButtonOptionProps>
): TRecord {
    const attr = {
        id: item.id || useGenerateId(),
        role: props.multiple ? 'checkbox' : 'radio',
        type: props.multiple ? 'checkbox' : 'radio',
        name: props.multiple ? item.name : props.name,
        required: props.required,
        disabled: props.disabled || item.disabled,
        readonly: props.readonly || item.readonly,
        'aria-disabled': props.disabled || item.disabled,
        'aria-checked': isInputItemSelected(item, props),
    };

    if (props.multiple) {
        return {
            ...attr,
            'true-value': true,
            'false-value': false,
        };
    }

    return attr;
}

export function useCreateInputElement(
    localValue: Ref<string | number | boolean | unknown[] | undefined>,
    item: TInputOptionItem,
    props: Readonly<TToggleButtonOptionProps>,
    emit: EmitFn
): VNode {
    return withDirectives(
        h('input', {
            class: 'd-none',
            value: item.value,
            ...createInputItemAttrs(item, props),
            'onUpdate:modelValue': (value: string | number | boolean) => {
                if (!props.disabled && !props.readonly && !item.disabled && !item.readonly) {
                    localValue.value = value;
                    emit('update:model-value', localValue.value);
                }
            },
        }),
        [props.multiple ? [vModelCheckbox, localValue.value] : [vModelRadio, localValue.value]]
    );
}

function renderSlotIcon(
    slots: Slots,
    name: string,
    btnMode: TButtonMode | undefined,
    props: Readonly<TIconProps>,
    iconId: string,
    iconPosition: string,
    iconSize?: number | string,
    slotArgs?: TRecord
): VNode {
    if (slots && slots[name]) {
        return useRenderSlotWithWrapper(
            slots,
            name,
            iconId,
            {
                class: {
                    'd-inline-flex': true,
                    [`${cssPrefix}icon-${iconPosition}`]:
                        btnMode === 'default' ||
                        (['fab', 'floating'].includes(btnMode as string) && slots.default),
                    [`${cssPrefix}empty-icon`]:
                        Helper.isEmpty(slots[name]) || !Helper.isFunction(slots[name]),
                },
                style:
                    iconSize && slots[name]?.call(undefined) != null
                        ? {
                              height: Helper.cssUnit(iconSize),
                              width: Helper.cssUnit(iconSize),
                          }
                        : undefined,
            },
            undefined,
            'span',
            slotArgs
        );
    } else {
        return useRenderSlot(
            slots,
            name,
            { key: iconId },
            !Helper.isEmpty(props.icon)
                ? //@ts-ignore
                  h<TBsIcon>(BsIcon, {
                      // id: iconId,
                      class: {
                          [`${cssPrefix}icon-${iconPosition}`]:
                              btnMode === 'default' ||
                              (['fab', 'floating'].includes(btnMode as string) && slots.default),
                      },
                      size: iconSize as Prop<string | number | undefined>,
                      ...useCreateIconProps(props),
                  })
                : [],
            slotArgs
        );
    }
}

export function useRenderButtonContent(
    slots: Slots,
    props: Readonly<TButtonOptionProps>,
    iconId: string
): VNodeArrayChildren {
    return [
        props.iconPosition === 'left'
            ? renderSlotIcon(
                  slots,
                  'icon',
                  props.mode,
                  props,
                  iconId,
                  props.iconPosition,
                  props.iconSize
              )
            : '',
        slots.default && slots.default(),
        props.iconPosition === 'right'
            ? renderSlotIcon(
                  slots,
                  'icon',
                  props.mode,
                  props,
                  iconId,
                  props.iconPosition,
                  props.iconSize
              )
            : '',
    ];
}

export function useRenderToggleItemContent(
    slots: Slots,
    item: TInputOptionItem,
    props: Readonly<TToggleButtonOptionProps>
): VNodeArrayChildren {
    return [
        props.iconPosition === 'left'
            ? renderSlotIcon(
                  slots,
                  'icon',
                  'default',
                  item,
                  `icon-${item.id || kebabCase(item.label) || useGenerateId()}`,
                  props.iconPosition,
                  item.iconSize,
                  item
              )
            : '',
        useRenderSlot(
            slots,
            'label',
            { key: kebabCase(item.label) },
            [
                h(
                    'span',
                    {
                        class: `${cssPrefix}btn-text`,
                    },
                    toDisplayString(item.label)
                ),
            ],
            item
        ),
        props.iconPosition === 'right'
            ? renderSlotIcon(
                  slots,
                  'icon',
                  'default',
                  item,
                  `icon-${item.id || kebabCase(item.label) || useGenerateId()}`,
                  props.iconPosition,
                  item.iconSize,
                  item
              )
            : '',
    ];
}

export function useRenderToggleFieldButton(
    slots: Slots,
    emit: TEmitFn,
    props: Readonly<ExtractPropTypes<TBsToggleField>>,
    wrapperCss: ComputedRef<TRecord>,
    hasFocused: Ref<boolean>,
    showHelpText: ComputedRef<boolean>,
    showValidationError: ComputedRef<boolean>,
    hasError: ComputedRef<boolean>,
    errorItems: ComputedRef<string[]>
): VNode {
    const thisProps = props as Readonly<TToggleFieldOptionProps>;

    return h(
        'div',
        {
            class: wrapperCss.value,
        },
        [
            slots.default && slots.default(),
            h(
                'div',
                {
                    class: 'col-md',
                },
                [
                    h(
                        'div',
                        {
                            class: [`${cssPrefix}field-inner`],
                        },
                        [
                            h(
                                BsToggleButton,
                                {
                                    id: props.id,
                                    name: props.name,
                                    disabled: props.disabled,
                                    readonly: props.readonly,
                                    required: props.required,
                                    items: thisProps.items as Prop<TInputOptionItem[]>,
                                    multiple: props.multiple,
                                    modelValue: props.modelValue,
                                    flat: props.flat,
                                    outlined: props.outlined,
                                    tonal: props.tonal,
                                    raised: props.raised,
                                    rounded: props.rounded,
                                    pill: props.pill,
                                    size: props.size,
                                    color: props.color,
                                    toggleColor: props.toggleColor,
                                    iconPosition: props.iconPosition,
                                    onMouseenter: () =>
                                        !Helper.isEmpty(thisProps.helpText) &&
                                        !thisProps.persistentHelpText &&
                                        (hasFocused.value = true),
                                    onMouseleave: () =>
                                        !Helper.isEmpty(thisProps.helpText) &&
                                        !thisProps.persistentHelpText &&
                                        (hasFocused.value = false),
                                    'onUpdate:model-value': (value: string | number | boolean) => {
                                        emit('update:model-value', value);
                                    },
                                },
                                {
                                    label: slots.label
                                        ? (item: TInputOptionItem) =>
                                              useRenderSlot(slots, 'label', item)
                                        : undefined,
                                    icon: slots.icon
                                        ? (item: TInputOptionItem) =>
                                              useRenderSlot(slots, 'icon', item)
                                        : undefined,
                                }
                            ),
                        ]
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
        ]
    );
}
