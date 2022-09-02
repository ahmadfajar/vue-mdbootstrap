import {ComponentOptionsMixin, computed, ComputedOptions, defineComponent, EmitsOptions, nextTick, ref} from "vue";
import {useCheckboxClasses, useRenderCheckbox} from "./mixins/checkboxApi";
import {checkboxProps} from "./mixins/checkboxProps";
import {TBsCheckbox, TCheckboxOptionProps} from "./types";
import {TRecord} from "../../types";

export default defineComponent<TBsCheckbox, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsCheckbox",
    props: checkboxProps,
    emits: [
        /**
         * Fired when this component's state is changed.
         */
        "checked",
        /**
         * Fired when this component's checked value is updated.
         */
        "update:modelValue",
    ],
    setup(props, {emit, slots}) {
        const cmpProps = props as Readonly<TCheckboxOptionProps>;
        const rippleActive = ref<boolean>(false);
        const checkboxClasses = computed(
            () => useCheckboxClasses(cmpProps)
        )
        const toggleCheckHandler = (): void => {
            if (!cmpProps.disabled && !cmpProps.readonly) {
                const checked = cmpProps.value === cmpProps.modelValue;
                rippleActive.value = true;
                emit("update:modelValue", checked ? null : cmpProps.value)
                nextTick().then(() => {
                    emit("checked", !checked);
                });
            }
        }

        return () =>
            useRenderCheckbox(
                slots, cmpProps, checkboxClasses, rippleActive,
                toggleCheckHandler,
            )
    }
});
