import type {ComponentOptionsMixin, ComputedOptions, EmitsOptions} from "vue";
import {computed, defineComponent} from "vue";
import {checkboxGroupProps} from "./mixins/checkboxProps";
import {baseInputProps} from "../Field/mixins/fieldProps";
import {validationProps} from "../Radio/mixins/validationProps";
import {useCreateCheckboxItems} from "./mixins/checkboxApi";
import {useInputGroupClasses, useRenderRadioOrCheckboxGroup} from "../Radio/mixins/radioApi";
import {
    useGetErrorItems,
    useHasValidated,
    useHasValidationError,
    useShowValidationError
} from "../Radio/mixins/validationApi";
import type {TBsCheckboxGroup, TCheckboxGroupOptionProps, TCheckboxProps, TRecord} from "../../types";
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
        "update:model-value",
    ],
    setup(props, {emit, slots}) {
        const cmpProps = props as Readonly<TCheckboxGroupOptionProps>;
        const hasError = computed<boolean>(() => useHasValidationError(cmpProps));
        const hasValidated = computed<boolean>(() => useHasValidated(cmpProps));
        const showValidationError = computed<boolean>(() => useShowValidationError(cmpProps));
        const errorItems = computed(() => useGetErrorItems(cmpProps));
        const checkboxClasses = computed(
            () => useInputGroupClasses(cmpProps, hasValidated.value, hasError.value)
        );

        const toggleCheckHandler = (
            values: string | number | unknown | Array<string | number | unknown>,
            item: TCheckboxProps,
        ): void => {
            if (!cmpProps.disabled && !cmpProps.readonly && !item.disabled && !item.readonly) {
                emit("update:model-value", Array.isArray(values) ? values : [values]);
            }
        }

        return () =>
            useRenderRadioOrCheckboxGroup(
                slots, cmpProps, checkboxClasses,
                useCreateCheckboxItems(cmpProps, toggleCheckHandler),
                showValidationError.value,
                (!Helper.isEmpty(cmpProps.helpText) && cmpProps.persistentHelpText === true),
                hasError.value, errorItems.value,
            );
    }
});
