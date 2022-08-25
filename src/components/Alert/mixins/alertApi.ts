import {computed, ComputedRef, createCommentVNode, h, Slots, VNode} from "vue";
import {useCreateIconProps} from "../../Avatar/mixins/avatarApi";
import {useSimpleRenderWithSlots} from "../../Card/mixins/cardApi";
import {TAlertOptionProps} from "../types";
import {BsIcon} from "../../Icon";
import {BsButton} from "../../Button";
import Helper from "../../../utils/Helper";

export function useAlertColorName(props: Readonly<TAlertOptionProps>): ComputedRef<string | undefined> {
    return computed<string | undefined>(() => {
        const variant = props.variant || props.iconType;
        if (variant) {
            if (variant === 'help') {
                return Helper.isEmpty(props.color) ? 'mdb-color' : props.color;
            } else {
                return Helper.isEmpty(props.color) ? variant : props.color;
            }
        }

        return Helper.isEmpty(props.color) ? 'primary' : props.color;
    });
}

export function useAlertIconName(props: Readonly<TAlertOptionProps>): ComputedRef<string | undefined> {
    return computed<string | undefined>(() => {
        const variant = props.variant || props.iconType;
        if (variant) {
            switch (variant) {
                case "help":
                    return props.iconVariant === 'outlined'
                        ? `help_outline_${props.iconVariant}`
                        : `help_${props.iconVariant}`;
                // return `help_center_${props.iconVariant}`;
                case "danger":
                    return `report_${props.iconVariant}`;
                case "warning":
                    return `report_problem_${props.iconVariant}`;
                case "info":
                    return `info_${props.iconVariant}`;
                default:
                    return `check_circle_${props.iconVariant}`;
            }
        } else if (props.icon && props.iconVariant) {
            return `${props.icon}_${props.iconVariant}`;
        }
        return undefined;
    });
}

export function useRenderAlert(
    slots: Slots,
    props: Readonly<TAlertOptionProps>,
    classNames: ComputedRef<Record<string, unknown>>,
    dismissHandler: VoidFunction,
): VNode {
    return h("div", {
        class: classNames.value,
        role: "alert"
    }, [
        useAlertIconName(props).value
            ? h("div", {
                class: "alert-icon me-3"
            }, [
                h(BsIcon, {
                    ...useCreateIconProps(props),
                    icon: useAlertIconName(props).value,
                    size: 32,
                }),
            ])
            : slots.alertIcon
                ? h("div",
                    {class: "alert-icon me-3"},
                    slots.alertIcon && slots.alertIcon()
                )
                : createCommentVNode(" v-if-alert-icon ", true),
        useSimpleRenderWithSlots("div", slots, "flex-fill"),
        props.dismissible
            ? h(BsButton, {
                class: "ms-auto",
                // color: "secondary",
                transparent: true,
                icon: "close",
                mode: "icon",
                // size: "sm",
                flat: true,
                onClick: (): void => dismissHandler()
            })
            : null,
    ]);
}
