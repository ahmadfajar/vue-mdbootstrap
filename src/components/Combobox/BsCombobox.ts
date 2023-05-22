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
        /**
         * Fired when an item is selected.
         */
        "select",
        /**
         * Fired when an item is deselected.
         */
        "deselect",
        /**
         * Fired when data has been fetched.
         */
        "data-bind",
        /**
         * Fired when error loading data items.
         */
        "data-error",
        /**
         * Fired when the Listbox data items is filtered.
         */
        "data-filtered",
    ],
    setup(props, {emit, slots}) {
        const thisProps = props as Readonly<TComboboxOptionProps>;

    }
});
