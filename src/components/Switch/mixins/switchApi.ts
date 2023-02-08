import type {ComputedRef, ExtractPropTypes, Prop, Ref, Slots, VNode} from "vue";
import {createCommentVNode, h} from "vue";
import type {TBsRipple, TBsSwitch, TRecord, TSwitchOptionProps} from "../../../types";
import {cssPrefix, useRenderSlotWrapperWithCondition} from "../../../mixins/CommonApi";
import {useCheckSelected, useCreateInputRadioOrCheckbox} from "../../Radio/mixins/radioApi";
import {BsRipple} from "../../Animation";
import {BsIconSvg} from "../../Icon";
import Helper from "../../../utils/Helper";

export function useSwitchClasses(
    props: Readonly<TSwitchOptionProps>,
): TRecord {
    const checked = useCheckSelected(props);

    return {
        [`${cssPrefix}switch`]: true,
        [`${cssPrefix}switch-${props.color}`]: props.color !== undefined,
        [`${cssPrefix}switch-inset`]: props.insetMode || props.insetOutlined,
        [`${cssPrefix}switch-outlined`]: props.insetOutlined === true && !checked,
        "checked": checked,
        "required": props.required,
        "readonly": props.readonly,
        "disabled": props.disabled,
    }
}

function createThumbIcon(
    props: Readonly<TSwitchOptionProps>,
): VNode {
    if ((props.insetMode || props.insetOutlined) && (props.checkedIcon || props.checkoffIcon)) {
        const checked = useCheckSelected(props);
        if (checked && props.checkedIcon) {
            return h(BsIconSvg, {
                icon: "done" as Prop<string>,
                height: 16 as Prop<number>,
                width: 16 as Prop<number>,
            });
        } else if (!checked && props.checkoffIcon && props.insetMode) {
            return h(BsIconSvg, {
                icon: "clear" as Prop<string>,
                height: 16 as Prop<number>,
                width: 16 as Prop<number>,
            });
        }
    }

    return createCommentVNode(" v-if-thumb-icon ", true);
}

function renderSwitchUI(
    props: Readonly<TSwitchOptionProps>,
    rippleActive: Ref<boolean>,
    toggleCheckHandler: VoidFunction,
): VNode {
    return h("div", {
        class: [`${cssPrefix}switch-wrapper`]
    }, [
        h("div", {
            class: [`${cssPrefix}switch-track`],
            onClick: toggleCheckHandler,
        }, [
            h("div", {
                class: [`${cssPrefix}switch-thumb`]
            }, [
                h("div", {class: `${cssPrefix}switch-overlay`}),
                // @ts-ignore
                h<TBsRipple>(BsRipple, {
                    centered: true,
                    active: rippleActive.value,
                    disabled: props.disabled || props.readonly,
                    "onUpdate:active": (value: boolean): void => {
                        rippleActive.value = value
                    }
                }, {
                    default: () => [
                        createThumbIcon(props),
                        useCreateInputRadioOrCheckbox(props, "checkbox"),
                    ]
                }),
            ])
        ]),
    ]);
}

function switchLabelClass(props: Readonly<TSwitchOptionProps>, position: string): string[] {
    let labelClass = [`${cssPrefix}switch-label`, `${cssPrefix}label-${position}`];

    if (!Helper.isEmpty(props.labelClass) && Array.isArray(props.labelClass)) {
        labelClass = labelClass.concat(props.labelClass);
    } else if (!Helper.isEmpty(props.labelClass)) {
        labelClass = labelClass.concat([<string>props.labelClass]);
    }

    return labelClass;
}

export function useRenderSwitch(
    slots: Slots,
    props: Readonly<ExtractPropTypes<TBsSwitch>>,
    classnames: ComputedRef<TRecord>,
    rippleActive: Ref<boolean>,
    toggleCheckHandler: VoidFunction,
): VNode {
    const thisProps = props as Readonly<TSwitchOptionProps>;

    return h("div", {
        class: classnames.value,
    }, [
        useRenderSlotWrapperWithCondition(
            slots, "default",
            (slots.default !== undefined && thisProps.labelPosition === "left"),
            {
                for: thisProps.id,
                class: switchLabelClass(thisProps, "left"),
                onClickPrevent: toggleCheckHandler,
            }, "label"
        ),
        renderSwitchUI(thisProps, rippleActive, toggleCheckHandler),
        useRenderSlotWrapperWithCondition(
            slots, "default",
            (slots.default !== undefined && thisProps.labelPosition === "right"),
            {
                for: thisProps.id,
                class: switchLabelClass(thisProps, "right"),
                onClickPrevent: toggleCheckHandler,
            }, "label"
        ),
    ]);
}
