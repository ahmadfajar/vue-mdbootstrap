import type {ComponentInternalInstance, ComponentOptionsMixin, ComputedOptions, EmitsOptions} from "vue";
import {computed, defineComponent, inject, nextTick, onBeforeUpdate, ref, shallowRef} from "vue";
import {useRoute} from "vue-router";
import {listTileProps} from "./mixins/listViewProps";
import {useHasLink, useHasRouter} from "../../mixins/CommonApi";
import {useListTileClassNames, useRenderListTile} from "./mixins/listViewApi";
import ListViewProvider from "./mixins/ListViewProvider";
import type {TBsListTile, TListTileOptionProps, TRecord} from "../../types";


export default defineComponent<TBsListTile, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsListTile",
    props: listTileProps,
    emits: [
        "click",
        /**
         * Fired when this component's state is updated.
         */
        "update:active"
    ],
    setup(props, {emit, expose, slots}) {
        const cmpProps = props as Readonly<TListTileOptionProps>;
        const vm = shallowRef<ComponentInternalInstance | undefined | null>();
        const isActive = ref<boolean | undefined>(cmpProps.active);

        expose({isActive});

        const provider = inject<ListViewProvider>("ListView");
        const tagName = computed<string>(
            () => useHasRouter(cmpProps) || useHasLink(cmpProps) || cmpProps.navigable ? "a" : "div"
        );
        const tileClasses = computed<TRecord>(
            () => useListTileClassNames(cmpProps, isActive, tagName.value, provider)
        );

        onBeforeUpdate(
            () => {
                if (useHasRouter(cmpProps) && useRoute().path === cmpProps.path) {
                    isActive.value = true;
                    nextTick().then(() => {
                        emit("update:active", true);
                    });
                }
            }
        );

        return () =>
            useRenderListTile(tagName.value, slots, cmpProps, tileClasses, emit, vm, provider)
    }
});
