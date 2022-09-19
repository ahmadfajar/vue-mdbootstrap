import {ComponentOptionsMixin, computed, ComputedOptions, defineComponent, EmitsOptions, nextTick, ref} from "vue";
import {useCreateInputRadio, useRadioClasses, useRenderRadioOrCheckbox} from "./mixins/radioApi";
import {radioProps} from "./mixins/radioProps";
import {TBsRadio, TRadioOptionProps} from "./types";
import {TRecord} from "../../types";

export default defineComponent<TBsRadio, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsRadio",
    props: radioProps,
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
        const cmpProps = props as Readonly<TRadioOptionProps>;
        const rippleActive = ref<boolean>(false);
        const radioClasses = computed(() => useRadioClasses(cmpProps));
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
            useRenderRadioOrCheckbox(
                slots, cmpProps, radioClasses, rippleActive, "radio",
                useCreateInputRadio(cmpProps), toggleCheckHandler,
            );
    }
});
