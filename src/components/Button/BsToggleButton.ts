import {
    ComponentOptionsMixin,
    ComputedOptions,
    defineComponent,
    EmitsOptions,
    h,
    ref,
    vModelCheckbox,
    vModelRadio,
    withDirectives
} from "vue";
import {useMakeInputItemAttrs, useMakeInputItemClasses, useRenderToggleItemContent} from "./mixins/buttonApi";
import {TBsToggleButton, TInputOptionItem, TToggleButtonOptionProps} from "./types";
import {toggleButtonProps} from "./mixins/buttonProps";
import {cssPrefix} from "../../mixins/CommonApi";
import BsButtonInner from "./BsButtonInner";

export default defineComponent<TBsToggleButton, unknown, unknown, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsToggleButton",
    props: toggleButtonProps,
    emits: [
        /**
         * Callback fired when this component's value is updated.
         */
        'update:modelValue'
    ],
    setup(props, {emit, slots}) {
        const localValue = ref<string | number | boolean | Array<unknown> | undefined>(props.modelValue);
        const makeInputEl = (item: TInputOptionItem, props: Readonly<TToggleButtonOptionProps>) => {
            return withDirectives(
                h("input", {
                    class: "d-none",
                    value: item.value,
                    ...useMakeInputItemAttrs(item, props),
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
                        props.pill ? "rounded-pill" : (!props.pill && !props.rounded ? "rounded-1" : ""),
                        props.disabled ? `${cssPrefix}disabled` : "",
                        props.readonly ? `${cssPrefix}readonly` : "",
                        props.required ? `${cssPrefix}required` : "",
                    ],
                    id: props.id,
                    role: "group",
                },
                (props.items as Array<TInputOptionItem>)?.map((item: TInputOptionItem, idx: number) => {
                    return h("label", {
                        key: `btn-${idx}`,
                        class: useMakeInputItemClasses(item, props),
                    }, [
                        makeInputEl(item, props),
                        h(BsButtonInner, {
                            rippleOff: rippleOff(item),
                            // tagName: "div",
                        }, {
                            default: () => useRenderToggleItemContent(slots, item, props)
                        }),
                    ]);
                })
            );
        };
    }
});
