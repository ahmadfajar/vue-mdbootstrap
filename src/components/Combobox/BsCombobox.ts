import {ComponentOptionsMixin, ComputedOptions, defineComponent, EmitsOptions} from "vue";
import {comboboxProps} from "./mixins/comboboxProps";
import {TBsCombobox, TComboboxOptionProps, TRecord} from "../../types";

export default defineComponent<TBsCombobox, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsCombobox",
    props: comboboxProps,
    emits: [
        /**
         * Fired when this component lost focus.
         */
        "blur",
        /**
         * Fired when this component got focused.
         */
        "focus",
        /**
         * Fired when this component's value is being cleared.
         */
        "clear",
        /**
         * Fired when this component's value is updated.
         */
        "update:model-value",
    ],
    setup(props, {emit, slots}) {
        const thisProps = props as Readonly<TComboboxOptionProps>;

    }
});
