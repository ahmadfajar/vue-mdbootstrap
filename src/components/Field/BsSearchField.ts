import type {ComponentOptionsMixin, ComputedOptions, EmitsOptions} from "vue";
import {computed, defineComponent, ref, watch} from "vue";
import type {TBsSearchField, TRecord, TSearchFieldOptionProps} from "../../types";
import {searchFieldProps} from "./mixins/fieldProps";
import {useRenderSearchField, useSearchFieldClasses} from "./mixins/searchFieldApi";


export default defineComponent<TBsSearchField, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsSearchField",
    props: searchFieldProps,
    inheritAttrs: false,
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
         * Asks handler to start searching for the given keyword.
         */
        "search",
        /**
         * Fired when the Popover is show.
         */
        "open",
        /**
         * Fired when the Popover is hiding.
         */
        "close",
        /**
         * Fired when this component's value is updated.
         */
        "update:model-value",
    ],
    setup(props, {attrs, emit, slots}) {
        const thisProps = props as Readonly<TSearchFieldOptionProps>;
        const localValue = ref(thisProps.modelValue);
        const isFocused = ref<boolean>(false);
        const isPopoverOpen = ref(false);
        const activator = ref<HTMLElement | null>(null);
        const classes = computed(() => useSearchFieldClasses(thisProps, isFocused))

        watch(
            () => thisProps.modelValue,
            (value) => localValue.value = value
        );

        return () =>
            useRenderSearchField(
                props, slots, emit, attrs, classes, activator,
                localValue, isFocused, isPopoverOpen,
            )
    }
});
