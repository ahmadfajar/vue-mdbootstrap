import {createCommentVNode, h, Slots, VNode, VNodeArrayChildren} from "vue";
import {TButtonOptionProps, TInputOptionItem, TToggleButtonOptionProps} from "../types";
import {cssPrefix, useGenerateId, useRenderSlot} from "../../../mixins/CommonApi";
import {TAvatarIconProps} from "../../Avatar/types";
import {useCreateIconProps} from "../../Avatar/mixins/avatarApi";
import {BsIcon} from "../../Icon";
import Helper from "../../../utils/Helper";

export function useButtonProps(
    props: Readonly<TButtonOptionProps>,
    disabled: boolean,
    buttonType?: string | null,
) {
    return {
        class: [
            props.mode === 'icon'
                ? `${cssPrefix}-btn-icon`
                : (props.mode === 'floating' ? `${cssPrefix}-btn-floating` : 'btn'),
            props.outlined
                ? 'btn-outline-' + props.color
                : (props.flat
                        ? 'btn-flat-' + props.color
                        : (props.transparent ? `${cssPrefix}-btn-transparent` : 'btn-' + props.color)
                ),
            props.raised ? `${cssPrefix}-btn-raised` : '',
            !props.pill && !props.rounded ? 'rounded-0' : (props.pill ? 'rounded-pill' : ''),
            props.size ? 'btn-' + props.size : '',
            disabled ? 'disabled' : '',
            props.active ? 'active' : '',
        ],
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

export function useInputItemClasses(
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
        [`${cssPrefix}-btn-raised`]: props.raised,
        'rounded-0': !props.pill && !props.rounded,
        'disabled': props.disabled || item.disabled,
        'readonly': props.readonly || item.readonly,
    }
}

export function useInputItemAttrs(
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

    if (this.multiple) {
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
    iconPosition: string,
    props: Readonly<TAvatarIconProps>,
    iconSize?: number,
): VNode {
    return useRenderSlot(
        slot, name,
        {key: Helper.uuid(true)},
        h(BsIcon, {
            class: {
                [`${cssPrefix}-icon-${iconPosition}`]:
                btnMode !== 'icon' && btnMode !== 'floating',
            },
            size: iconSize,
            ...useCreateIconProps(props),
        }),
    );
}

export function useRenderButtonContent(
    slots: Slots,
    hasIcon: boolean,
    props: Readonly<TButtonOptionProps>,
): VNodeArrayChildren {
    return [
        (hasIcon && props.iconPosition === 'left')
            ? useRenderIconWithSlot(
                slots, 'icon',
                props.mode, props.iconPosition,
                props, props.iconSize as number,
            )
            : createCommentVNode(" v-if-iconLeft ", true),
        slots.default && slots.default(),
        (hasIcon && props.iconPosition === 'right')
            ? useRenderIconWithSlot(
                slots, 'icon',
                props.mode, props.iconPosition,
                props, props.iconSize as number,
            )
            : createCommentVNode(" v-if-iconRight ", true),
    ]
}

export function useRenderToggleItemContent(
    slots: Slots,
    item: TInputOptionItem,
    props: Readonly<TToggleButtonOptionProps>,
): VNodeArrayChildren {
    return [
        (!Helper.isEmpty(item.icon) && props.iconPosition === 'left')
            ? useRenderIconWithSlot(
                slots, 'icon',
                'default', props.iconPosition,
                item, item.iconSize as number,
            )
            : createCommentVNode(" v-if-iconLeft ", true),
        useRenderSlot(
            slots, 'default',
            {key: Helper.uuid()},
            h('span', {
                class: 'btn-text',
            }, item.label)
        ),
        (!Helper.isEmpty(item.icon) && props.iconPosition === 'right')
            ? useRenderIconWithSlot(
                slots, 'icon',
                'default', props.iconPosition,
                item, item.iconSize as number,
            )
            : createCommentVNode(" v-if-iconRight ", true),
    ]
}
