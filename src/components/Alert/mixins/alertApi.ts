import type { ComputedRef, Prop, Slots, VNode } from 'vue';
import { createCommentVNode, h } from 'vue';
import {
    cssPrefix,
    useRenderSlotDefault,
    useRenderSlotWithWrapper,
    useRenderTransition
} from '../../../mixins/CommonApi';
import type { TAlertOptionProps, TBsButton, TBsIcon, TButtonMode } from '../../../types';
import Helper from '../../../utils/Helper';
import { useCreateIconProps } from '../../Avatar/mixins/avatarApi';
import { BsButton } from '../../Button';
import { BsIcon } from '../../Icon';

export function useAlertClassNames(
    props: Readonly<TAlertOptionProps>,
    colorName: ComputedRef<string | undefined>,
): Record<string, boolean | undefined> {
    const solid = props.solidFill || props.filled;
    return {
        'alert d-flex': true,
        'align-items-center': true,
        'alert-dismissible': props.dismissible,
        [`alert-${colorName.value}`]: !Helper.isEmpty(colorName.value) && !props.outlined && !solid,
        [`${cssPrefix}alert-solid-${colorName.value}`]: !Helper.isEmpty(colorName.value) && solid && !props.outlined,
        [`${cssPrefix}alert-outline-${colorName.value}`]: props.outlined,
    }
}

export function useAlertColorName(props: Readonly<TAlertOptionProps>): string | undefined {
    const variant = props.variant || props.iconType;
    if (variant) {
        if (variant === 'help') {
            return Helper.isEmpty(props.color) ? 'mdb-color' : props.color;
        } else {
            return Helper.isEmpty(props.color) ? variant : props.color;
        }
    }

    return Helper.isEmpty(props.color) ? 'primary' : props.color;
}

export function useAlertIconName(props: Readonly<TAlertOptionProps>): string | undefined {
    const variant = props.iconType || props.variant;
    if (variant) {
        switch (variant) {
            case 'help':
                return props.iconVariant === 'outlined'
                    ? `help_outline_${props.iconVariant}`
                    : `help_${props.iconVariant}`;
            // return `help_center_${props.iconVariant}`;
            case 'danger':
                return `report_${props.iconVariant}`;
            case 'warning':
                return `report_problem_${props.iconVariant}`;
            case 'info':
                return `info_${props.iconVariant}`;
            default:
                return `check_circle_${props.iconVariant}`;
        }
    } else if (props.icon && props.iconVariant) {
        return `${props.icon}_${props.iconVariant}`;
    }
    return undefined;
}

function doRenderAlert(
    slots: Slots,
    props: Readonly<TAlertOptionProps>,
    classNames: ComputedRef<Record<string, boolean | undefined>>,
    alertColorName: ComputedRef<string | undefined>,
    alertIconName: ComputedRef<string | undefined>,
    dismissHandler: VoidFunction,
): VNode {
    // openBlock();
    // return createElementBlock('div', {
    return h('div', {
        // class: normalizeClass(classNames.value),
        class: classNames.value,
        role: 'alert'
    }, [
        useRenderSlotWithWrapper(
            slots, 'icon', Helper.uuid(),
            {class: 'd-flex alert-icon me-3'},
            (
                alertIconName.value
                    ? h<TBsIcon>(BsIcon, {
                        ...useCreateIconProps(props),
                        icon: alertIconName.value as Prop<string | undefined>,
                        size: 32 as Prop<number>,
                    })
                    : undefined
            )
        ),
        useRenderSlotDefault('div', slots, 'flex-fill'),
        props.dismissible
            ? h<TBsButton>(BsButton, {
                class: 'ms-auto',
                color: (
                    !(props.filled || props.solidFill)
                        ? alertColorName.value
                        : ['light', 'light-grey'].includes(props.color as string)
                            ? 'dark' : 'light text-white'
                ) as Prop<string>,
                icon: 'close' as Prop<string>,
                mode: 'icon' as Prop<TButtonMode>,
                // @ts-ignore
                flat: true as Prop<boolean>,
                onClick: dismissHandler
            })
            : createCommentVNode(' v-if-alert-dismissible '),
    ]);
}

export function useRenderAlert(
    slots: Slots,
    props: Readonly<TAlertOptionProps>,
    showAlert: ComputedRef<boolean | undefined>,
    classNames: ComputedRef<Record<string, boolean | undefined>>,
    alertColorName: ComputedRef<string | undefined>,
    alertIconName: ComputedRef<string | undefined>,
    dismissHandler: VoidFunction,
): VNode {
    return useRenderTransition(
        {name: props.transition},
        (
            showAlert.value
                ? doRenderAlert(slots, props, classNames, alertColorName, alertIconName, dismissHandler)
                : createCommentVNode(' BsAlert ')
        ),
    );
}
