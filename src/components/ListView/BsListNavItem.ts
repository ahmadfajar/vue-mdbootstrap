import ListItem from '@/components/ListView/mixins/ListItem.ts';
import {
  useAddChild,
  useListNavItemClasses,
  useListNavItemInnerClasses,
  useNavItemContentStyles,
  useRenderListNavItem,
} from '@/components/ListView/mixins/listNavApi.ts';
import { listNavItemProps } from '@/components/ListView/mixins/listViewProps.ts';
import { useCurrentRoute, useHasRouter, useRouteMatch } from '@/mixins/CommonApi.ts';
import type {
  IListItem,
  IListViewProvider,
  TBsListNavItem,
  TListNavItemOptionProps,
  TRecord,
} from '@/types';
import {
  computed,
  defineComponent,
  getCurrentInstance,
  inject,
  nextTick,
  onBeforeMount,
  onMounted,
  ref,
  shallowRef,
  watchEffect,
} from 'vue';

export default defineComponent<TBsListNavItem>({
  name: 'BsListNavItem',
  props: listNavItemProps,
  emits: ['click', 'update:active'],
  setup(props, { emit, expose, slots }) {
    const thisProps = props as Readonly<TListNavItemOptionProps>;
    const instance = shallowRef(getCurrentInstance());
    const refItem = shallowRef<IListItem>();
    const isActive = ref<boolean | undefined>(thisProps.active);
    const expanded = ref<boolean>(false);
    const hasChild = ref<boolean>(false);
    const hasRouter = ref<boolean>(false);

    expose({ isActive, expanded });

    const provider = inject<IListViewProvider>('ListView');
    const navItemClasses = computed<TRecord>(() =>
      useListNavItemClasses(thisProps, isActive, expanded, hasChild)
    );
    const navItemInnerClasses = computed<TRecord>(() =>
      useListNavItemInnerClasses(thisProps, isActive, hasRouter, provider)
    );
    const navItemInnerStyles = computed<string[]>(() => useNavItemContentStyles(thisProps));

    const parentActive = (state: boolean) => {
      let parent = refItem.value?.parent;
      while (parent) {
        parent.setActive(state);
        parent = parent.parent;
      }
    };

    if (useHasRouter(thisProps)) {
      const route = useCurrentRoute();

      watchEffect(() => {
        if (provider && route && useRouteMatch(instance, route, thisProps)) {
          provider.activeItem = refItem.value;
          parentActive(true);
        } else {
          isActive.value = false;
          refItem.value?.setActive(false);
          const parent = refItem.value?.parent;

          if (parent) {
            const children = parent.children;
            const foundActive = children.some((item) => item.component.props.active === true);
            if (!foundActive) {
              parentActive(false);
            }
          }
        }
      });
    }

    onBeforeMount(async () => {
      instance.value = getCurrentInstance();

      if (instance.value) {
        refItem.value = new ListItem(thisProps.id as string, 'BsListNavItem', instance.value, emit);

        if (provider) {
          await nextTick().then(() => useAddChild(provider, instance.value?.parent, refItem.value));
        }
      }
    });

    onMounted(async () => {
      hasRouter.value = useHasRouter(thisProps);

      if (hasRouter.value) {
        const route = useCurrentRoute();
        if (route && useRouteMatch(instance, route, thisProps)) {
          isActive.value = true;
          refItem.value?.setActive(true);
        }
      }

      await nextTick().then(() => {
        hasChild.value = refItem.value?.hasChild() ?? false;

        if (hasRouter.value && !hasChild.value && isActive.value) {
          let parent = refItem.value?.parent;
          while (parent) {
            parent.setActive(true);
            provider?.expand(parent);
            parent = parent.parent;
          }
        }
      });
    });

    return () =>
      useRenderListNavItem(
        slots,
        thisProps,
        navItemClasses,
        navItemInnerClasses,
        navItemInnerStyles,
        isActive,
        expanded,
        hasChild,
        refItem,
        provider
      );
  },
});
