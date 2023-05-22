import type {ComputedRef, Prop, Slots, VNode} from "vue";
import {createCommentVNode, h} from "vue";
import {cssPrefix, useRenderSlotWithWrapper, useSimpleRenderWithSlots} from "../../../mixins/CommonApi";
import {useCreateIconProps} from "../../Avatar/mixins/avatarApi";
import {BsIcon} from "../../Icon";
import {BsButton} from "../../Button";
import type {TAlertOptionProps, TBsButton, TBsIcon} from "../../../types";
import Helper from "../../../utils/Helper";

export function useAlertClassNames(
    props: Readonly<TAlertOptionProps>,
    colorName: ComputedRef<string | undefined>,
): Record<string, boolean | undefined> {
    const solid = props.solidFill || props.filled;
    return {
        "alert d-flex": true,
        "align-items-center": true,
        "alert-dismissible": props.dismissible,
        [`alert-${colorName.value}`]: !Helper.isEmpty(colorName.value) && !props.outlined && !solid,
        [`${cssPrefix}alert-solid-${colorName.value}`]: !Helper.isEmpty(colorName.value) && solid && !props.outlined,
        [`${cssPrefix}alert-outline-${colorName.value}`]: props.outlined,
    }
}

export function useAlertColorName(props: Readonly<TAlertOptionProps>): string | undefined {
    const variant = props.variant || props.iconType;
    if (variant) {
        if (variant === "help") {
            return Helper.isEmpty(props.color) ? "mdb-color" : props.color;
        } else {
            return Helper.isEmpty(props.color) ? variant : props.color;
        }
    }

    return Helper.isEmpty(props.color) ? "primary" : props.color;
}

export function useAlertIconName(props: Readonly<TAlertOptionProps>): string | undefined {
    const variant = props.iconType || props.variant;
    if (variant) {
        switch (variant) {
            case "help":
                return props.iconVariant === "outlined"
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
}

export function useRenderAlert(
    slots: Slots,
    props: Readonly<TAlertOptionProps>,
    classNames: ComputedRef<Record<string, boolean | undefined>>,
    alertColorName: ComputedRef<string | undefined>,
    alertIconName: ComputedRef<string | undefined>,
    dismissHandler: VoidFunction,
): VNode {
    return h("div", {
        class: classNames.value,
        role: "alert"
    }, [
        useRenderSlotWithWrapper(
            slots, "alertIcon", Helper.uuid(), "div",
            {class: "alert-icon me-3"},
            alertIconName.value
                ? h<TBsIcon>(BsIcon, {
                    ...useCreateIconProps(props),
                    icon: <Prop<string | undefined>>alertIconName.value,
                    size: 32 as Prop<number>,
                })
                : createCommentVNode(" v-if-alert-icon "),
        ),
        useSimpleRenderWithSlots("div", slots, "flex-fill"),
        props.dismissible
            ? h<TBsButton>(BsButton, {
                class: "ms-auto",
                color: <Prop<string>>(
                    !(props.filled || props.solidFill)
                        ? alertColorName.value
                        : ["light", "light-grey"].includes(<string>props.color)
                            ? "dark" : "light text-white"
                ),
                icon: "close" as Prop<string>,
                mode: "icon" as Prop<string>,
                // @ts-ignore
                flat: true as Prop<boolean>,
                onClick: dismissHandler
            })
            : createCommentVNode(" v-if-alert-dismissible ", true),
    ]);
}
