import {ComponentOptionsMixin, computed, ComputedOptions, defineComponent, EmitsOptions, reactive, ref} from "vue";
import {listboxProps} from "./mixins/listboxProps";
import {IBsModel, TBsListbox, TDataListSchemaProps, TListboxOptionProps, TRecord} from "../../types";
import {useRenderListbox} from "./mixins/listboxApi";

export default defineComponent<TBsListbox, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsListbox",
    props: listboxProps,
    emits: [
        /**
         * Fired when error loading data items.
         */
        "data-error",
        /**
         * Fired when the Listbox data items is filtered.
         */
        "data-filtered",
        /**
         * Fired when the Listbox value is updated.
         */
        "update:model-value",
        /**
         * Fired when the Listbox search value is updated.
         */
        "update:search-text",
    ],
    setup(props, {emit, slots}) {
        const thisProps = props as Readonly<TListboxOptionProps>;
        const dataSchema = reactive<TDataListSchemaProps>({
            displayField: 'text',
            valueField: 'value',
            imageField: 'image',
            cascadeField: 'parent',
            disableField: 'disabled',
            ...thisProps.dataSource?.schema,
        });
        const maxHeight = parseInt(<string>thisProps.maxHeight);
        const minItems = parseInt(<string>thisProps.minSearchLength);
        const dataItems = computed(() => thisProps.dataSource?.proxy.dataItems);
        const showSearchbox = computed<boolean | undefined>(
            () => {
                const dataSource = thisProps.dataSource?.proxy;
                return dataSource && (dataSource.totalCount >= minItems);
            }
        );
        const searchboxRef = ref<HTMLElement | null>(null);
        const searchText = ref(thisProps.searchText);
        const selectedValues = ref(thisProps.modelValue);
        const selectedItems: IBsModel[] = [];
        const listviewStyles = computed<TRecord>(
            () => ({
                maxHeight: (
                    showSearchbox.value
                        ? (maxHeight - (searchboxRef.value?.offsetHeight || 0))
                        : maxHeight
                ) + "px"
            })
        );

        return () =>
            useRenderListbox(
                slots, emit, thisProps, dataSchema, dataItems,
                listviewStyles, showSearchbox, searchboxRef,
                selectedItems, selectedValues, searchText,
            );
    }
});
