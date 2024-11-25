import ListItem from '@/components/ListView/mixins/ListItem';
import { useAddChild } from '@/components/ListView/mixins/listNavApi';
import type {
    IListItem,
    IListViewProvider,
    TBsListNav,
    TListNavOptionProps,
} from '@/components/ListView/types';
import { cssPrefix, useGenerateId } from '@/mixins/CommonApi';
import { booleanProp } from '@/mixins/CommonProps';
import {
    computed,
    defineComponent,
    getCurrentInstance,
    h,
    inject,
    nextTick,
    onBeforeMount,
    ref,
    shallowRef,
} from 'vue';

export default defineComponent<TBsListNav>({
    name: 'BsListNav',
    props: {
        id: {
            type: String,
            default: () => useGenerateId(),
        },
        child: booleanProp,
    },
    setup(props, { emit, expose, slots }) {
        const thisProps = props as Readonly<TListNavOptionProps>;
        const refItem = shallowRef<IListItem>();
        const isActive = ref<boolean>(false);
        const collapsing = ref<boolean>(false);
        const expanded = ref<boolean>(false);

        expose({ isActive, collapsing, expanded });

        const provider = inject<IListViewProvider>('ListView');
        const classNames = computed(() => ({
            [`${cssPrefix}list-nav`]: true,
            [`${cssPrefix}nav-child`]: thisProps.child === true,
            collapse: thisProps.child === true && !expanded.value,
            collapsing: thisProps.child === true && collapsing.value,
        }));

        onBeforeMount(() => {
            const vm = getCurrentInstance();
            if (vm) {
                refItem.value = new ListItem(thisProps.id as string, 'BsListNav', vm, emit);

                if (provider) {
                    if (thisProps.child === true) {
                        nextTick().then(() => useAddChild(provider, vm.parent, refItem.value));
                    } else {
                        provider.addItem(refItem.value);
                    }
                }
            }
        });

        return () =>
            h(
                'ul',
                {
                    id: props.id,
                    class: classNames.value,
                    onVnodeBeforeUnmount: () => refItem.value?.destroy(),
                },
                slots.default && slots.default()
            );
    },
});
