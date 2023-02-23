import type {ComponentOptionsMixin, ComputedOptions, EmitsOptions} from "vue";
import {computed, defineComponent, h, ref} from "vue";
import type {TBsToggleField, TRecord, TToggleFieldOptionProps} from "../../types";
import {cssPrefix} from "../../mixins/CommonApi";
import {validationProps} from "../Radio/mixins/validationProps";
import {
    useGetErrorItems,
    useHasValidated,
    useHasValidationError,
    useRenderFieldFeedback,
    useShowHelpText,
    useShowValidationError
} from "../Radio/mixins/validationApi";
import {toggleButtonProps} from "./mixins/buttonProps";
import BsToggleButton from "./BsToggleButton";


export default defineComponent<TBsToggleField, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsToggleField",
    props: {
        ...toggleButtonProps,
        ...validationProps,
    },
    emits: [
        /**
         * Callback fired when this component's value is updated.
         */
        "update:model-value"
    ],
    setup(props, {emit, slots}) {
        const thisProps = props as Readonly<TToggleFieldOptionProps>;
        const hasFocused = ref(false);
        const hasError = computed<boolean>(() => useHasValidationError(thisProps));
        const hasValidated = computed<boolean>(() => useHasValidated(thisProps));
        const showValidationError = computed<boolean>(() => useShowValidationError(thisProps));
        const showHelpText = computed<boolean>(() => useShowHelpText(thisProps, hasFocused.value));
        const errorItems = computed(() => useGetErrorItems(thisProps));
        const wrapperClasses = computed<TRecord>(
            () => ({
                [`${cssPrefix}field`]: true,
                [`${cssPrefix}toggle-field row`]: true,
                "required": thisProps.required,
                "readonly": thisProps.readonly,
                "disabled": thisProps.disabled,
                "has-error": hasError,
                "has-success": hasValidated.value && !hasError.value

            })
        );

        return () =>
            h("div", {
                class: wrapperClasses.value
            }, [
                slots.default && slots.default(),
                h("div", {
                    class: "col-md",
                }, [
                    h("div", {
                        class: [`${cssPrefix}field-inner`],
                    }, [
                        h(BsToggleButton, {
                            id: props.id,
                            name: props.name,
                            disabled: props.disabled,
                            readonly: props.readonly,
                            required: props.required,
                            items: props.items,
                            multiple: props.multiple,
                            modelValue: props.modelValue,
                            flat: props.flat,
                            outlined: props.outlined,
                            raised: props.raised,
                            rounded: props.rounded,
                            pill: props.pill,
                            size: props.size,
                            color: props.color,
                            toggleColor: props.toggleColor,
                            iconPosition: props.iconPosition,
                            onMouseenter: () => hasFocused.value = true,
                            onMouseleave: () => hasFocused.value = false,
                            "onUpdate:model-value": (value: string | number | boolean) => {
                                emit("update:model-value", value);
                            }
                        }),
                    ]),
                    useRenderFieldFeedback(
                        slots, thisProps,
                        showHelpText.value,
                        showValidationError.value,
                        hasError.value,
                        errorItems.value,
                    ),
                ]),
            ])
    }
});
