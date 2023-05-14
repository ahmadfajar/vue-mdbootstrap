import type {ComponentOptionsMixin, ComputedOptions, EmitsOptions} from "vue";
import {computed, defineComponent, onMounted, reactive, ref, shallowRef, watch} from "vue";
import {listboxProps} from "./mixins/listboxProps";
import {useFilterListboxItems, useRenderListbox} from "./mixins/listboxApi";
import type {
    IArrayStore,
    IBsModel,
    IBsStore,
    TBsListbox,
    TDataListSchemaProps,
    TListboxOptionProps,
    TRecord
} from "../../types";
import Helper from "../../utils/Helper";

export default defineComponent<TBsListbox, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsListbox",
    props: listboxProps,
    emits: [
        /**
         * Fired when an item is selected.
         */
        "select",
        /**
         * Fired when an item is deselected.
         */
        "deselect",
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
        const dataSource = thisProps.dataSource?.proxy;
        const dataItems = computed(() => {
            if (dataSource && dataSource.storeState.length !== dataSource.totalCount) {
                return dataSource.dataItems;
            }

            return dataSource?.dataItems;
        });
        const showSearchbox = computed<boolean | undefined>(
            () => dataSource && (dataSource.storeState.totalCount >= minItems)
        );
        const searchboxRef = ref<HTMLElement | null>(null);
        const searchText = ref(thisProps.searchText);
        const selectedValues = ref(thisProps.modelValue);
        const selectedItems = shallowRef<IBsModel[]>([]);

        const listviewStyles = computed<TRecord>(
            () => ({
                maxHeight: (
                    showSearchbox.value
                        ? (maxHeight - (searchboxRef.value?.offsetHeight || 0))
                        : maxHeight
                ) + "px"
            })
        );

        watch(
            () => thisProps.searchText,
            (value) => {
                if (
                    (value && value.length >= parseInt(<string>thisProps.minSearchChars))
                    || Helper.isEmpty(value)
                ) {
                    useFilterListboxItems(
                        emit, dataSchema,
                        <IBsStore | IArrayStore>dataSource,
                        searchText, value || ""
                    );
                }
            }
        );
        onMounted(
            () => {
                dataSource?.load()
                    .then(() => {
                        if (dataItems.value) {
                            selectedItems.value = dataItems.value.filter(it => {
                                if (Array.isArray(selectedValues.value)) {
                                    return selectedValues.value.some(v => v === it.get(dataSchema.valueField));
                                } else {
                                    return selectedValues.value === it.get(dataSchema.valueField);
                                }
                            });
                        }
                    })
                    .catch(error => {
                        emit("data-error", error);
                        console.warn(error);
                    });
            }
        );

        return () =>
            useRenderListbox(
                slots, emit, thisProps, dataSchema, dataItems,
                listviewStyles, showSearchbox, searchboxRef,
                selectedItems, selectedValues, searchText,
            );
    }
});
