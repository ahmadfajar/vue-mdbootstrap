import {ComputedRef, createCommentVNode, h, Prop, Slots, VNode} from "vue";
import {cssPrefix, useRenderSlotWithWrapper} from "../../../mixins/CommonApi";
import {useCreateIconProps} from "../../Avatar/mixins/avatarApi";
import {useSimpleRenderWithSlots} from "../../Card/mixins/cardApi";
import {TAlertOptionProps} from "../types";
import {BsIcon} from "../../Icon";
import {BsButton} from "../../Button";
import Helper from "../../../utils/Helper";
import {TBsIcon} from "../../Icon/types";
import {TBsButton} from "../../Button/types";

export function useAlertClassNames(
    props: Readonly<TAlertOptionProps>,
    colorName: ComputedRef<string | undefined>,
): Record<string, boolean | undefined> {
    const solid = props.filled || props.solidFill;
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
}

export function useRenderAlert(
    slots: Slots,
    props: Readonly<TAlertOptionProps>,
    classNames: ComputedRef<Record<string, boolean | undefined>>,
    alertIconName: ComputedRef<string | undefined>,
    dismissHandler: VoidFunction,
): VNode {
    return h("div", {
        class: classNames.value,
        role: "alert"
    }, [
        // alertIconName.value
        //     ? h("div", {
        //         class: "alert-icon me-3"
        //     }, [
        //         h(BsIcon, {
        //             ...useCreateIconProps(props),
        //             icon: alertIconName.value,
        //             size: 32,
        //         }),
        //     ])
        //     : slots.alertIcon
        //         ? h("div",
        //             {class: "alert-icon me-3"},
        //             slots.alertIcon && slots.alertIcon()
        //         )
        //         : createCommentVNode(" v-if-alert-icon ", true),
        useRenderSlotWithWrapper(
            slots, 'alertIcon', Helper.uuid(), "div",
            {class: 'alert-icon me-3'},
            alertIconName.value
                ? h<TBsIcon>(BsIcon, {
                    ...useCreateIconProps(props),
                    icon: alertIconName.value as Prop<string>,
                    size: 32 as Prop<number>,
                })
                : undefined, // createCommentVNode(" v-if-alert-icon ", true),
        ),
        useSimpleRenderWithSlots("div", slots, "flex-fill"),
        props.dismissible
            ? h<TBsButton>(BsButton, {
                class: "ms-auto",
                // color: "secondary",
                transparent: true as Prop<boolean>,
                icon: "close" as Prop<string>,
                mode: "icon" as Prop<string>,
                // size: "sm",
                flat: true as Prop<boolean>,
                onClick: (): void => dismissHandler()
            })
            : createCommentVNode(" v-if-alert-dismissible ", true),
    ]);
}
