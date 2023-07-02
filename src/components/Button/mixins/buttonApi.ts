import { kebabCase } from 'lodash';
import type { ComputedRef, ExtractPropTypes, Prop, Ref, Slots, VNode, VNodeArrayChildren } from 'vue';
import { h, toDisplayString } from 'vue';
import { cssPrefix, useGenerateId, useRenderSlot, useRenderSlotWithWrapper } from '../../../mixins/CommonApi';
import type {
    TIconProps,
    TBsIcon,
    TBsToggleField,
    TButtonMode,
    TButtonOptionProps,
    TEmitFn,
    TInputOptionItem,
    TRecord,
    TToggleButtonOptionProps,
    TToggleFieldOptionProps
} from '../../../types';
import Helper from '../../../utils/Helper';
import { useCreateIconProps } from '../../Avatar/mixins/avatarApi';
import { useRenderFieldFeedback } from '../../Field/mixins/validationApi';
import { BsIcon } from '../../Icon';
import BsToggleButton from '../BsToggleButton';

export function useMakeButtonProps(
    props: Readonly<TButtonOptionProps>,
    disabled: boolean,
    buttonType?: string | undefined,
) {
    return {
        class: {
            'btn': !['icon', 'floating'].includes(<string>props.mode),
            [`${cssPrefix}btn-${props.mode}`]: ['icon', 'floating'].includes(<string>props.mode),
            [`btn-outline-${props.color}`]: props.outlined && props.color && !props.transparent,
            [`btn-flat-${props.color}`]: !props.outlined && props.flat && props.color && !props.transparent,
            [`${cssPrefix}btn-transparent`]: !props.outlined && !props.flat && props.transparent,
            [`btn-${props.color}`]: !props.outlined && !props.flat && !props.transparent && props.color,
            [`${cssPrefix}btn-raised`]: props.raised,
            [`btn-${props.size}`]: !Helper.isEmpty(props.size),
            'rounded-pill': props.mode !== 'icon' && props.pill,
            'rounded-1': props.mode !== 'icon' && !props.pill && !props.rounded,
            'disabled': disabled,
            'readonly': props.readonly,
            'active': props.active,
        },
        role: 'button',
        type: buttonType === 'div' ? undefined : buttonType,
        disabled: buttonType === 'div' ? undefined : disabled,
        'aria-disabled': buttonType === 'div' ? undefined : disabled,
    }
}

function isInputItemSelected(
    item: TInputOptionItem,
    props: Readonly<TToggleButtonOptionProps>,
): boolean {
    if (props.multiple && Array.isArray(props.modelValue) && !Array.isArray(item.value)) {
        const sources = props.modelValue as Array<string | number | boolean>;
        return sources.find((it: string | number | boolean) => it === item.value) != undefined;
    } else {
        return props.modelValue === item.value;
    }
}

export function useMakeInputItemClasses(
    item: TInputOptionItem,
    props: Readonly<TToggleButtonOptionProps>,
): TRecord | object {
    const isSelected = isInputItemSelected(item, props);

    return {
        'btn': true,
        [`btn-${props.toggleColor}`]: isSelected && props.toggleColor && !props.disabled && !item.disabled,
        [`btn-outline-${props.color}`]: props.outlined && (!isSelected || !props.toggleColor),
        [`btn-flat-${props.color}`]: props.flat && !props.outlined && (!isSelected || !props.toggleColor),
        [`btn-${props.color}`]: !props.outlined && !props.flat && (!isSelected || !props.toggleColor),
        [`btn-${props.size}`]: props.size,
        [`${cssPrefix}btn-raised`]: props.raised,
        'active': isSelected && !props.toggleColor && !props.disabled && !item.disabled,
        'disabled': props.disabled || item.disabled,
        'readonly': props.readonly || item.readonly,
    }
}

export function useMakeInputItemAttrs(
    item: TInputOptionItem,
    props: Readonly<TToggleButtonOptionProps>,
): TRecord | object {
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
            'false-value': false
        }
    }

    return attr;
}

function renderIconOrSlot(
    slots: Slots,
    name: string,
    btnMode: TButtonMode | undefined,
    props: Readonly<TIconProps>,
    iconId: string,
    iconPosition: string,
    iconSize?: number | string,
    slotArgs?: TRecord,
): VNode {
    if (slots && slots[name]) {
        return useRenderSlotWithWrapper(
            slots, name, iconId, {
                class: {
                    [`${cssPrefix}icon`]: true,
                    [`${cssPrefix}icon-${iconPosition}`]: btnMode !== 'icon' && btnMode !== 'floating',
                }
            },
            undefined, 'span', slotArgs
        );
    } else {
        return useRenderSlot(
            slots, name,
            {key: iconId},
            !Helper.isEmpty(props.icon)
                ? h<TBsIcon>(BsIcon, {
                    id: iconId,
                    class: {
                        [`${cssPrefix}icon-${iconPosition}`]: btnMode !== 'icon' && btnMode !== 'floating',
                    },
                    size: <Prop<string | number | undefined>>iconSize,
                    ...useCreateIconProps(props),
                }) : [],
            slotArgs,
        );
    }
}

export function useRenderButtonContent(
    slots: Slots,
    props: Readonly<TButtonOptionProps>,
    iconId: string,
): VNodeArrayChildren {
    return [
        (props.iconPosition === 'left')
            ? renderIconOrSlot(
                slots, 'icon',
                props.mode,
                props,
                iconId,
                props.iconPosition,
                props.iconSize,
            )
            : '',
        slots.default && slots.default(),
        (props.iconPosition === 'right')
            ? renderIconOrSlot(
                slots, 'icon',
                props.mode,
                props,
                iconId,
                props.iconPosition,
                props.iconSize,
            )
            : '',
    ]
}

export function useRenderToggleItemContent(
    slots: Slots,
    item: TInputOptionItem,
    props: Readonly<TToggleButtonOptionProps>,
): VNodeArrayChildren {
    return [
        (props.iconPosition === 'left')
            ? renderIconOrSlot(
                slots, 'icon',
                'default',
                item,
                (item.id ? `bs-icon-${item.id}` : ''),
                props.iconPosition,
                item.iconSize,
                item,
            )
            : '',
        useRenderSlot(
            slots, 'label',
            {key: kebabCase(item.label)},
            [
                h('span', {
                    class: `${cssPrefix}btn-text`,
                }, toDisplayString(item.label))
            ],
            item,
        ),
        (props.iconPosition === 'right')
            ? renderIconOrSlot(
                slots, 'icon',
                'default',
                item,
                (item.id ? `bs-icon-${item.id}` : ''),
                props.iconPosition,
                item.iconSize,
                item,
            )
            : '',
    ]
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
    errorItems: ComputedRef<string[]>,
): VNode {
    const thisProps = props as Readonly<TToggleFieldOptionProps>;

    return h('div', {
        class: wrapperCss.value
    }, [
        slots.default && slots.default(),
        h('div', {
            class: 'col-md',
        }, [
            h('div', {
                class: [`${cssPrefix}field-inner`],
            }, [
                h(BsToggleButton, {
                    id: props.id,
                    name: props.name,
                    disabled: props.disabled,
                    readonly: props.readonly,
                    required: props.required,
                    items: props.items,
                    multiple: props.multiple,
                    modelValue: props.modelValue,
                    flat: props.flat,
                    outlined: props.outlined,
                    raised: props.raised,
                    rounded: props.rounded,
                    pill: props.pill,
                    size: props.size,
                    color: props.color,
                    toggleColor: props.toggleColor,
                    iconPosition: props.iconPosition,
                    onMouseenter: () => !Helper.isEmpty(thisProps.helpText) &&
                        !thisProps.persistentHelpText && (hasFocused.value = true),
                    onMouseleave: () => !Helper.isEmpty(thisProps.helpText) &&
                        !thisProps.persistentHelpText && (hasFocused.value = false),
                    'onUpdate:model-value': (value: string | number | boolean) => {
                        emit('update:model-value', value);
                    }
                }, {
                    label: (item: TInputOptionItem) =>
                        useRenderSlot(
                            slots, 'label',
                            {key: kebabCase(item.label)},
                            [
                                h('span', {
                                    class: `${cssPrefix}btn-text`,
                                }, toDisplayString(item.label))
                            ],
                            item,
                        ),
                    icon: (item: TInputOptionItem) =>
                        renderIconOrSlot(
                            slots, 'icon',
                            'default',
                            item,
                            `bs-icon-${item.id || item.label}`,
                            <string>thisProps.iconPosition,
                            item.iconSize,
                            item,
                        ),
                }),
            ]),
            useRenderFieldFeedback(
                slots, thisProps,
                showHelpText.value,
                showValidationError.value,
                hasError.value,
                errorItems.value,
            ),
        ]),
    ]);
}
