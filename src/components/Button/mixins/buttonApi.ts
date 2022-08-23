import {h, Slots, VNode, VNodeArrayChildren} from "vue";
import {TButtonOptionProps, TInputOptionItem, TToggleButtonOptionProps} from "../types";
import {cssPrefix, useGenerateId, useRenderSlot} from "../../../mixins/CommonApi";
import {TAvatarIconProps} from "../../Avatar/types";
import {useCreateIconProps} from "../../Avatar/mixins/avatarApi";
import {BsIcon} from "../../Icon";
import Helper from "../../../utils/Helper";

export function useMakeButtonProps(
    props: Readonly<TButtonOptionProps>,
    disabled: boolean,
    buttonType?: string | null,
) {
    return {
        class: [
            props.mode === 'icon'
                ? `${cssPrefix}btn-icon`
                : (props.mode === 'floating' ? `${cssPrefix}btn-floating` : 'btn'),
            props.outlined
                ? 'btn-outline-' + props.color
                : (props.flat
                        ? 'btn-flat-' + props.color
                        : (props.transparent ? `${cssPrefix}btn-transparent` : 'btn-' + props.color)
                ),
            props.raised ? `${cssPrefix}btn-raised` : '',
            props.mode !== 'icon' && !props.pill && !props.rounded
                ? 'rounded-1' :
                (props.mode !== 'icon' && props.pill ? 'rounded-pill' : ''),
            props.size ? 'btn-' + props.size : '',
            disabled ? 'disabled' : '',
            props.active ? 'active' : '',
        ],
        clazz: {
            'btn': ['icon', 'floating'].includes(props.mode) === false,
            [`${cssPrefix}btn-${props.mode}`]: ['icon', 'floating'].includes(props.mode),
        },
        role: !Helper.isEmpty(props.href) ? 'button' : null,
        type: buttonType,
        disabled: disabled,
        'aria-disabled': disabled,
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
): Record<string, unknown> | object {
    return {
        'btn': true,
        [`btn-${props.toggleColor}`]: isInputItemSelected(item, props) && props.toggleColor,
        [`btn-${props.color} active`]: isInputItemSelected(item, props) && !props.toggleColor,
        [`btn-outline-${props.color}`]: !isInputItemSelected(item, props) && props.outlined,
        [`btn-flat-${props.color}`]: !isInputItemSelected(item, props) && !props.outlined && props.flat,
        [`btn-${props.color}`]: !isInputItemSelected(item, props) && !props.outlined && !props.flat,
        [`btn-${props.size}`]: props.size,
        [`${cssPrefix}btn-raised`]: props.raised,
        'rounded-1': !props.pill && !props.rounded,
        'disabled': props.disabled || item.disabled,
        'readonly': props.readonly || item.readonly,
    }
}

export function useMakeInputItemAttrs(
    item: TInputOptionItem,
    props: Readonly<TToggleButtonOptionProps>,
): Record<string, unknown> | object {
    if (!item.id) {
        item.id = useGenerateId();
    }

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
                ? h(BsIcon, {
                    class: {
                        [`${cssPrefix}icon-${iconPosition}`]: btnMode !== 'icon' && btnMode !== 'floating',
                    },
                    size: iconSize,
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
                props.mode,
                props,
                props.iconPosition,
                props.iconSize as number,
            )
            : '',
        slots.default && slots.default(),
        (props.iconPosition === 'right')
            ? useRenderIconWithSlot(
                slots, 'icon',
                props.mode,
                props,
                props.iconPosition,
                props.iconSize as number,
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
            ? useRenderIconWithSlot(
                slots, 'icon',
                'default',
                item,
                props.iconPosition,
                item.iconSize as number,
                item,
            )
            : '',
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
                item.iconSize as number,
                item,
            )
            : '',
    ]
}
