import type {ComponentOptionsMixin, ComputedOptions, EmitsOptions} from "vue";
import {computed, defineComponent, h, provide} from "vue";
import {cssPrefix} from "../../mixins/CommonApi";
import {listViewProps} from "./mixins/listViewProps";
import type {TBsListView, TListViewOptionProps, TRecord} from "../../types";
import ListViewProvider from "./mixins/ListViewProvider";


export default defineComponent<TBsListView, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsListView",
    props: listViewProps,
    emits: [
        /**
         * Fired when this component's mutate its modelValue.
         */
        "change",
        /**
         * Fired when this component's modelValue is updated.
         */
        "update:modelValue",
    ],
    setup(props, {slots, emit}) {
        const cmpProps = props as Readonly<TListViewOptionProps>;
        const classNames = computed(
            () => ({
                [`${cssPrefix}list`]: true,
                [`${cssPrefix}list-${props.color}`]: props.color,
                "overflow-hidden": props.overflowHidden,
            })
        );

        const provider = new ListViewProvider(cmpProps, emit);
        provide<ListViewProvider>("ListView", provider);

        return () =>
            h("div", {
                class: classNames.value,
                onVnodeBeforeUnmount: () => provider.removeAll()
            }, slots.default && slots.default())
    }
});
