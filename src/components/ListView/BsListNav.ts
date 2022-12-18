import type {ComponentOptionsMixin, ComputedOptions, EmitsOptions, VNode} from "vue";
import {computed, defineComponent, h, inject, ref, shallowRef} from "vue";
import {cssPrefix, useGenerateId} from "../../mixins/CommonApi";
import {booleanProp} from "../../mixins/CommonProps";
import type {IListItem, IListViewProvider, IVNode, TBsListNav, TListNavOptionProps, TRecord} from "../../types";
import ListItem from "./mixins/ListItem";


export default defineComponent<TBsListNav, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsListNav",
    props: {
        id: {
            type: String,
            default: () => useGenerateId()
        },
        child: booleanProp,
    },
    setup(props, {emit, expose, slots}) {
        const cmpProps = props as Readonly<TListNavOptionProps>;
        const refItem = shallowRef<IListItem>();
        const isActive = ref<boolean>(false);
        const collapsing = ref<boolean>(false);
        const expanded = ref<boolean>(false);

        expose({isActive, collapsing, expanded});

        const provider = inject<IListViewProvider>("ListView");
        const classNames = computed(
            () => ({
                [`${cssPrefix}list-nav`]: true,
                [`${cssPrefix}nav-child`]: cmpProps.child === true,
                "collapse": cmpProps.child === true && !expanded.value,
                "collapsing": cmpProps.child === true && collapsing.value,
            })
        );

        return () =>
            h("ul", {
                id: props.id,
                class: classNames.value,
                onVnodeMounted: (vnode: VNode) => {
                    const context = (<IVNode>vnode).ctx;
                    refItem.value = new ListItem(<string>cmpProps.id, "BsListNav", context, emit, context.parent);

                    if (provider) {
                        if (cmpProps.child === true) {
                            const item = provider.findItem(it => it.uid === context.parent?.props.id, true);
                            item?.addChild(refItem.value);
                        } else {
                            provider.addItem(refItem.value);
                        }
                    }
                },
                onVnodeBeforeUnmount: () => refItem.value?.destroy(),
            }, slots.default && slots.default())
    }
});
