import { useCreateIconProps } from '@/components/Avatar/mixins/avatarApi';
import { BsButton } from '@/components/Button';
import { BsIcon } from '@/components/Icon';
import { useNormalizeIconName } from '@/components/Icon/mixins/iconApi';
import {
    cssPrefix,
    useRenderSlotDefault,
    useRenderSlotWithWrapper,
    useRenderTransition,
} from '@/mixins/CommonApi';
import { isEndWith } from '@/mixins/StringHelper';
import type { TAlertOptionProps, TBsButton, TBsIcon, TButtonMode } from '@/types';
import Helper from '@/utils/Helper';
import type { ComputedRef, Prop, Slots, VNode } from 'vue';
import { createCommentVNode, h } from 'vue';

export function useAlertClassNames(
    props: Readonly<TAlertOptionProps>,
    color: ComputedRef<string | undefined>
): Record<string, boolean | undefined> {
    const solid = props.solidFill || props.filled;
    return {
        'alert d-flex': true,
        'align-items-center': true,
        'alert-dismissible': props.dismissible,
        [`alert-${color.value}`]: !Helper.isEmpty(color.value) && !props.outlined && !solid,
        [`${cssPrefix}alert-solid-${color.value}`]:
            !Helper.isEmpty(color.value) && solid && !props.outlined,
        [`${cssPrefix}alert-outline-${color.value}`]: props.outlined,
    };
}

export function useAlertColor(props: Readonly<TAlertOptionProps>): string | undefined {
    const variant = props.iconType || props.variant;

    if (variant) {
        if (variant === 'help') {
            return Helper.isEmpty(props.color) ? 'mdb-color' : props.color;
        } else {
            return Helper.isEmpty(props.color) ? variant : props.color;
        }
    }

    return Helper.isEmpty(props.color) ? 'primary' : props.color;
}

export function useAlertIcon(props: Readonly<TAlertOptionProps>): string | undefined {
    let iconName: string;
    const variant = props.iconType || props.variant;

    if (variant) {
        switch (variant) {
            case 'help':
                iconName = `help_${props.iconVariant}`;
                break;
            case 'danger':
                iconName = `report_${props.iconVariant}`;
                break;
            case 'warning':
                iconName = `warning_${props.iconVariant}`;
                break;
            case 'info':
                iconName = `info_${props.iconVariant}`;
                break;
            default:
                iconName = `check_circle_${props.iconVariant}`;
        }

        return iconName;
    } else if (props.icon) {
        iconName = useNormalizeIconName(props.icon);
        const hasSuffix = isEndWith(iconName, [
            '_outlined_filled',
            '_rounded_filled',
            '_sharp_filled',
            '_filled',
            '_outlined',
            '_rounded',
            '_sharp',
        ]);

        return hasSuffix ? iconName : `${iconName}_${props.iconVariant}`;
    }

    return undefined;
}

function doRenderAlert(
    slots: Slots,
    props: Readonly<TAlertOptionProps>,
    classNames: ComputedRef<Record<string, boolean | undefined>>,
    alertColor: ComputedRef<string | undefined>,
    alertIcon: ComputedRef<string | undefined>,
    dismissHandler: VoidFunction
): VNode {
    return h(
        'div',
        {
            class: classNames.value,
            role: 'alert',
        },
        [
            useRenderSlotWithWrapper(
                slots,
                'icon',
                Helper.uuid(),
                { class: 'd-flex alert-icon me-3' },
                alertIcon.value
                    ? h<TBsIcon>(BsIcon, {
                          ...useCreateIconProps(props),
                          icon: alertIcon.value as Prop<string>,
                          size: 32 as Prop<number>,
                      })
                    : undefined
            ),
            useRenderSlotDefault('div', slots, 'flex-fill'),
            props.dismissible
                ? h<TBsButton>(BsButton, {
                      class: 'ms-auto',
                      color: (!(props.solidFill || props.filled)
                          ? alertColor.value
                          : ['light', 'light-grey'].includes(props.color as string)
                            ? 'dark'
                            : 'light text-white') as Prop<string>,
                      icon: 'close' as Prop<string>,
                      mode: 'icon' as Prop<TButtonMode>,
                      // @ts-ignore
                      flat: true as Prop<boolean>,
                      onClick: dismissHandler,
                  })
                : createCommentVNode(' v-if-alert-dismissible '),
        ]
    );
}

export function useRenderAlert(
    slots: Slots,
    props: Readonly<TAlertOptionProps>,
    showAlert: ComputedRef<boolean | undefined>,
    classNames: ComputedRef<Record<string, boolean | undefined>>,
    alertColorName: ComputedRef<string | undefined>,
    alertIconName: ComputedRef<string | undefined>,
    dismissHandler: VoidFunction
): VNode {
    return useRenderTransition(
        { name: props.transition },
        showAlert.value
            ? doRenderAlert(slots, props, classNames, alertColorName, alertIconName, dismissHandler)
            : createCommentVNode(' BsAlert ')
    );
}
