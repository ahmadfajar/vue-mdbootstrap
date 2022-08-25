import {defineComponent, h, ref, vModelCheckbox, vModelRadio, withDirectives} from "vue";
import {booleanProp, booleanTrueProp, defaultColorProp, inputProps, stringProp} from "../../mixins/CommonProps";
import {useMakeInputItemAttrs, useMakeInputItemClasses, useRenderToggleItemContent} from "./mixins/buttonApi";
import {buttonSize, iconPosition} from "./mixins/buttonProps";
import {cssPrefix} from "../../mixins/CommonApi";
import {TInputOptionItem, TToggleButtonOptionProps} from "./types";
import BsButtonInner from "./BsButtonInner";

export default defineComponent({
    name: "BsToggleButton",
    props: {
        ...inputProps,
        /**
         * The number of items stored in the collection.
         * @type {Array}
         */
        items: {
            type: Array,
            default: undefined
        },
        /**
         * Allow multiple choice or not.
         * @type {boolean}
         */
        multiple: booleanProp,
        /**
         * The input value to be monitored by `v-model`.
         * @type {string|boolean|Number|Array}
         */
        modelValue: {
            type: [String, Number, Boolean, Array],
            default: undefined
        },
        /**
         * Render this button with flat style (Google Material Text Button) or not.
         * @type {boolean}
         */
        flat: booleanProp,
        /**
         * Render this button with outlined style (Google Material Outlined Button) or not, see
         * {@link [Bootstrap](https://getbootstrap.com/docs/5.2/components/buttons/#outline-buttons)}
         * for details.
         * @type {boolean}
         */
        outlined: booleanProp,
        /**
         * Render this button with raised style (Google Material Elevated Button) or not.
         * @type {boolean}
         */
        raised: booleanProp,
        /**
         * Render this button with rounded style or not, see
         * {@link [Bootstrap](https://getbootstrap.com/docs/5.2/components/buttons/)}
         * for details.
         * @type {boolean}
         */
        rounded: booleanProp,
        /**
         * Render button with rounded-pill style (Google Material Button) or not.
         * @type {boolean}
         */
        pill: booleanTrueProp,
        /**
         * This button size, see
         * {@link [Bootstrap](https://getbootstrap.com/docs/5.2/components/buttons/#sizes)}
         * for details.
         * @type {string}
         */
        size: buttonSize,
        /**
         * Sets this button color.
         * @type {string}
         */
        color: defaultColorProp,
        /**
         * Color to apply when Button is active or selected.
         * @type {string}
         */
        toggleColor: stringProp,
        /**
         * Place icon at `left` (before text) or at `right` (after text).
         * @type {string}
         */
        iconPosition: iconPosition,
    },
    emits: ['update:modelValue'],
    setup(props, {emit, slots}) {
        const localValue = ref<string | number | boolean | Array<unknown> | undefined>(props.modelValue);
        const cmpProps = props as Readonly<TToggleButtonOptionProps>;
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
                        class: useMakeInputItemClasses(item, cmpProps),
                    }, [
                        makeInputEl(item, cmpProps),
                        h(BsButtonInner, {
                            rippleOff: rippleOff(item),
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
