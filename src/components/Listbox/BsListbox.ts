import {
    useRegisterListboxWatchers,
    useRenderListbox,
} from '@/components/Listbox/mixins/listboxApi';
import { listboxProps } from '@/components/Listbox/mixins/listboxProps';
import type {
    IBsModel,
    TBsListbox,
    TDataListSchemaProps,
    TListboxOptionProps,
    TRecord,
} from '@/types';
import { defineComponent, reactive, ref, shallowRef } from 'vue';

export default defineComponent<TBsListbox>({
    name: 'BsListbox',
    props: listboxProps,
    emits: [
        /**
         * Fired when an item is selected.
         */
        'select',
        /**
         * Fired when an item is deselected.
         */
        'deselect',
        /**
         * Fired when the data has been fetched.
         */
        'data-bind',
        /**
         * Fired when error loading data items.
         */
        'data-error',
        /**
         * Fired when the Listbox data items is filtered.
         */
        'data-filter',
        /**
         * Fired when the Listbox value is updated.
         */
        'update:model-value',
        /**
         * Fired when the Listbox search value is updated.
         */
        'update:search-text',
        /**
         * Fired when the Listbox selected value is updated.
         */
        'update:selected-value',
    ],
    setup(props, { emit, slots }) {
        const thisProps = props as Readonly<TListboxOptionProps>;
        const dataSchema: TDataListSchemaProps = {
            displayField: 'text',
            valueField: 'value',
            imageField: 'image',
            cascadeField: 'parent',
            disableField: 'disabled',
            ...thisProps.dataSource?.schema,
        };
        const maxHeight = parseInt(<string>thisProps.maxHeight);
        const dataSource = thisProps.dataSource?.proxy;
        const cacheItems = shallowRef<IBsModel[]>([]);
        const showSearchbox = ref<boolean>(false);
        const searchboxRef = ref<HTMLElement | null>(null);
        const searchText = ref(thisProps.searchText);
        const fieldValues = ref(thisProps.modelValue);
        const selectedItems = shallowRef<IBsModel[]>([]);
        const listviewStyles = reactive<TRecord>({ maxHeight: maxHeight + 'px' });

        useRegisterListboxWatchers(
            emit,
            thisProps,
            dataSource,
            dataSchema,
            cacheItems,
            selectedItems,
            fieldValues,
            listviewStyles,
            showSearchbox,
            searchboxRef,
            searchText
        );

        return () =>
            useRenderListbox(
                slots,
                emit,
                thisProps,
                dataSchema,
                cacheItems,
                selectedItems,
                listviewStyles,
                showSearchbox,
                searchboxRef,
                fieldValues,
                searchText
            );
    },
});
