import {ComponentOptionsMixin, computed, ComputedOptions, defineComponent, EmitsOptions} from "vue";
import {baseInputProps} from "../../mixins/CommonProps";
import {checkboxGroupProps, validationProps} from "./mixins/checkboxProps";
import {useCheckboxGroupClasses, useRenderCheckboxGroup} from "./mixins/checkboxApi";
import {useGetErrorItems, useHasValidated, useHasValidationError, useShowValidationError} from "./mixins/validationApi";
import {TBsCheckboxGroup, TCheckboxGroupOptionProps, TCheckboxProps} from "./types";
import {TRecord} from "../../types";
import Helper from "../../utils/Helper";

export default defineComponent<TBsCheckboxGroup, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsCheckboxGroup",
    props: {
        ...baseInputProps,
        ...checkboxGroupProps,
        ...validationProps,
    },
    emits: [
        /**
         * Fired when this component's checked value is updated.
         */
        "update:modelValue",
    ],
    setup(props, {emit, slots}) {
        const cmpProps = props as Readonly<TCheckboxGroupOptionProps>;
        const hasError = computed<boolean>(() => useHasValidationError(cmpProps));
        const hasValidated = computed<boolean>(() => useHasValidated(cmpProps));
        const errorItems = computed(() => useGetErrorItems(cmpProps))
        const checkboxClasses = computed(
            () => useCheckboxGroupClasses(cmpProps, hasValidated.value, hasError.value)
        );
        const showValidationError = computed<boolean>(() => useShowValidationError(cmpProps));

        const toggleCheckHandler = (item: TCheckboxProps): void => {
            if (!cmpProps.disabled && !cmpProps.readonly && !item.disabled && !item.readonly) {
                const selected = cmpProps.modelValue
                    ? (Array.isArray(cmpProps.modelValue) ? cmpProps.modelValue : [cmpProps.modelValue])
                    : [];

                const idx = selected.indexOf(item.value);
                if (idx > -1) {
                    selected.splice(idx, 1);
                } else {
                    selected.push(item.value);
                }
                emit("update:modelValue", selected)
            }
        }

        return () =>
            useRenderCheckboxGroup(
                slots, cmpProps, checkboxClasses,
                showValidationError.value,
                (!Helper.isEmpty(cmpProps.helpText) && cmpProps.persistentHelpText === true),
                hasError.value, errorItems.value,
                toggleCheckHandler,
            );
    }
});
