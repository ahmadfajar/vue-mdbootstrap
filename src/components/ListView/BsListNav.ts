import type { ComponentOptionsMixin, ComputedOptions, EmitsOptions, MethodOptions } from 'vue';
import {
    computed,
    defineComponent,
    getCurrentInstance,
    h,
    inject,
    nextTick,
    onBeforeMount,
    ref,
    shallowRef
} from 'vue';
import { cssPrefix, useGenerateId } from '../../mixins/CommonApi';
import { booleanProp } from '../../mixins/CommonProps';
import type { IListItem, IListViewProvider, TBsListNav, TListNavOptionProps, TRecord } from '../../types';
import ListItem from './mixins/ListItem';
import { useAddChild } from './mixins/listNavApi';

export default defineComponent<TBsListNav, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>({
    name: 'BsListNav',
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

        const provider = inject<IListViewProvider>('ListView');
        const classNames = computed(
            () => ({
                [`${cssPrefix}list-nav`]: true,
                [`${cssPrefix}nav-child`]: cmpProps.child === true,
                'collapse': cmpProps.child === true && !expanded.value,
                'collapsing': cmpProps.child === true && collapsing.value,
            })
        );
        onBeforeMount(
            () => {
                const vm = getCurrentInstance();
                if (vm) {
                    refItem.value = new ListItem(<string>cmpProps.id, 'BsListNav', vm, emit);

                    if (provider) {
                        if (cmpProps.child === true) {
                            nextTick().then(() => useAddChild(provider, vm.parent, refItem.value));
                        } else {
                            provider.addItem(refItem.value);
                        }
                    }
                }
            }
        );

        return () =>
            h('ul', {
                id: props.id,
                class: classNames.value,
                onVnodeBeforeUnmount: () => refItem.value?.destroy(),
            }, slots.default && slots.default())
    }
});
