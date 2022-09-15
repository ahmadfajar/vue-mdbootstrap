import {ComponentOptionsMixin, computed, ComputedOptions, defineComponent, EmitsOptions} from "vue";
import {useGetErrorItems, useHasValidated, useHasValidationError, useShowValidationError} from "./mixins/validationApi";
import {useCreateRadioItems, useInputGroupClasses, useRenderRadioCheckboxGroup} from "./mixins/radioApi";
import {baseInputProps} from "../../mixins/CommonProps";
import {radioGroupProps} from "./mixins/radioProps";
import {validationProps} from "./mixins/validationProps";
import {TBsRadioGroup, TRadioGroupOptionProps, TRadioProps} from "./types";
import {TRecord} from "../../types";
import Helper from "../../utils/Helper";

export default defineComponent<TBsRadioGroup, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsRadioGroup",
    props: {
        ...baseInputProps,
        ...radioGroupProps,
        ...validationProps,
    },
    emits: [
        /**
         * Fired when this component's checked value is updated.
         */
        "update:modelValue",
    ],
    setup(props, {emit, slots}) {
        const cmpProps = props as Readonly<TRadioGroupOptionProps>;
        const hasError = computed<boolean>(() => useHasValidationError(cmpProps));
        const hasValidated = computed<boolean>(() => useHasValidated(cmpProps));
        const showValidationError = computed<boolean>(() => useShowValidationError(cmpProps));
        const errorItems = computed(() => useGetErrorItems(cmpProps));
        const checkboxClasses = computed(
            () => useInputGroupClasses(cmpProps, hasValidated.value, hasError.value)
        );

        const toggleCheckHandler = (item: TRadioProps): void => {
            if (!cmpProps.disabled && !cmpProps.readonly && !item.disabled && !item.readonly) {
                emit("update:modelValue", item.value)
            }
        };

        return () =>
            useRenderRadioCheckboxGroup(
                slots, cmpProps, checkboxClasses,
                useCreateRadioItems(cmpProps, toggleCheckHandler),
                showValidationError.value,
                (!Helper.isEmpty(cmpProps.helpText) && cmpProps.persistentHelpText === true),
                hasError.value, errorItems.value,
            );
    }
});
