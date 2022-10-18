import {h, Prop, Slots, VNode, VNodeArrayChildren} from "vue";
import {cssPrefix, useGenerateId, useRenderSlot} from "../../../mixins/CommonApi";
import {useCreateIconProps} from "../../Avatar/mixins/avatarApi";
import {BsIcon} from "../../Icon";
import {
    TAvatarIconProps,
    TBsIcon,
    TButtonOptionProps,
    TInputOptionItem,
    TRecord,
    TToggleButtonOptionProps
} from "../../../types";
import Helper from "../../../utils/Helper";

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
        return sources.find((it: string | number | boolean) => it === item.value) !== undefined;
    } else {
        return props.modelValue === item.value;
    }
}

export function useMakeInputItemClasses(
    item: TInputOptionItem,
    props: Readonly<TToggleButtonOptionProps>,
): TRecord | object {
    if (!item.id) {
        item.id = useGenerateId();
    }
    const isSelected = isInputItemSelected(item, props);

    return {
        'btn': true,
        [`btn-${props.toggleColor}`]: isSelected && props.toggleColor,
        // [`btn-${props.color} active`]: isSelected && !props.toggleColor,
        // [`btn-outline-${props.color}`]: !isSelected && props.outlined,
        [`btn-outline-${props.color}`]: props.outlined && !props.toggleColor,
        // [`btn-flat-${props.color}`]: !isSelected && !props.outlined && props.flat,
        [`btn-flat-${props.color}`]: props.flat && !props.outlined && !props.toggleColor,
        // [`btn-${props.color}`]: !isSelected && !props.outlined && !props.flat,
        [`btn-${props.color}`]: !props.outlined && !props.flat && !props.toggleColor,
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
        id: item.id,
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

export function useRenderIconWithSlot(
    slot: Slots,
    name: string,
    btnMode: string,
    props: Readonly<TAvatarIconProps>,
    iconPosition: string,
    iconSize?: number,
    slotArgs?: unknown,
): VNode {
    if (slot && slot[name]) {
        return h("span", {
                class: {
                    [`${cssPrefix}icon`]: true,
                    [`${cssPrefix}icon-${iconPosition}`]: btnMode !== 'icon' && btnMode !== 'floating',
                }
            },
            // @ts-ignore
            name && slot[name] && (slotArgs ? slot[name](slotArgs) : slot[name]())
        )
    } else {
        return useRenderSlot(
            slot, name,
            {key: Helper.uuid(true)},
            !Helper.isEmpty(props.icon)
                ? h<TBsIcon>(BsIcon, {
                    class: {
                        [`${cssPrefix}icon-${iconPosition}`]: btnMode !== 'icon' && btnMode !== 'floating',
                    },
                    size: <Prop<string | number>>iconSize,
                    ...useCreateIconProps(props),
                }) : [],
            slotArgs,
        );
    }
}

export function useRenderButtonContent(
    slots: Slots,
    props: Readonly<TButtonOptionProps>,
): VNodeArrayChildren {
    return [
        (props.iconPosition === 'left')
            ? useRenderIconWithSlot(
                slots, 'icon',
                <string>props.mode,
                props,
                props.iconPosition,
                <number>props.iconSize,
            )
            : '',
        slots.default && slots.default(),
        (props.iconPosition === 'right')
            ? useRenderIconWithSlot(
                slots, 'icon',
                <string>props.mode,
                props,
                props.iconPosition,
                <number>props.iconSize,
            )
            : '',
    ]
}

export function useRenderToggleItemContent(
    slots: Slots,
    item: TInputOptionItem,
    props: Readonly<TToggleButtonOptionProps>,
    // inputField: VNode,
): VNodeArrayChildren {
    return [
        (props.iconPosition === 'left')
            ? useRenderIconWithSlot(
                slots, 'icon',
                'default',
                item,
                props.iconPosition,
                <number | undefined>item.iconSize,
                item,
            )
            : '',
        // inputField,
        useRenderSlot(
            slots, 'default',
            {key: Helper.uuid()},
            h('span', {
                class: `${cssPrefix}btn-text`,
            }, item.label),
            item,
        ),
        (props.iconPosition === 'right')
            ? useRenderIconWithSlot(
                slots, 'icon',
                'default',
                item,
                props.iconPosition,
                <number | undefined>item.iconSize,
                item,
            )
            : '',
    ]
}
