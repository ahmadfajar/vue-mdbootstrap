import type {ComponentOptionsMixin, ComputedOptions, EmitsOptions, Prop} from "vue";
import {defineComponent, h, ref, vModelCheckbox, vModelRadio, withDirectives} from "vue";
import {useMakeInputItemAttrs, useMakeInputItemClasses, useRenderToggleItemContent} from "./mixins/buttonApi";
import {toggleButtonProps} from "./mixins/buttonProps";
import {cssPrefix} from "../../mixins/CommonApi";
import BsButtonInner from "./BsButtonInner";
import type {TBsButtonInner, TBsToggleButton, TInputOptionItem, TRecord, TToggleButtonOptionProps} from "../../types";

export default defineComponent<TBsToggleButton, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsToggleButton",
    props: toggleButtonProps,
    emits: [
        /**
         * Callback fired when this component's value is updated.
         */
        'update:modelValue'
    ],
    setup(props, {emit, slots}) {
        const cmpProps = props as Readonly<TToggleButtonOptionProps>;
        const localValue = ref<string | number | boolean | Array<unknown> | undefined>(<string | number | boolean | Array<unknown> | undefined>props.modelValue);
        const makeInputEl = (item: TInputOptionItem, props: Readonly<TToggleButtonOptionProps>) => {
            return withDirectives(
                h("input", {
                    class: "d-none",
                    value: item.value,
                    ...useMakeInputItemAttrs(item, cmpProps),
                    "onUpdate:modelValue": (event: string | number | boolean) => {
                        // console.log('input:value =', event);
                        if (!props.disabled && !props.readonly && !item.disabled && !item.readonly) {
                            localValue.value = event;
                            emit("update:modelValue", localValue.value)
                        }
                    }
                }),
                [
                    props.multiple
                        ? [vModelCheckbox, localValue.value]
                        : [vModelRadio, localValue.value],
                ]
            );
        }
        const rippleOff = (item: TInputOptionItem) => {
            return props.disabled || props.readonly || item.disabled || item.readonly;
        }

        return () => {
            return h("div", {
                    class: [
                        "btn-group",
                        cmpProps.pill ? "rounded-pill" : (!cmpProps.pill && !cmpProps.rounded ? "rounded-1" : ""),
                        cmpProps.disabled ? `${cssPrefix}disabled` : "",
                        cmpProps.readonly ? `${cssPrefix}readonly` : "",
                        cmpProps.required ? `${cssPrefix}required` : "",
                    ],
                    id: props.id,
                    role: "group",
                },
                cmpProps.items?.map((item: TInputOptionItem, idx: number) => {
                    return h("label", {
                        key: `btn-${idx}`,
                        class: useMakeInputItemClasses(item, cmpProps),
                    }, [
                        makeInputEl(item, cmpProps),
                        h<TBsButtonInner>(BsButtonInner, {
                            rippleOff: <Prop<boolean>>rippleOff(item),
                            // tagName: "div",
                        }, {
                            default: () => useRenderToggleItemContent(slots, item, cmpProps)
                        }),
                    ]);
                })
            );
        };
    }
});
