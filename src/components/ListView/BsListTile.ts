import {
  useListTileClassNames,
  useRenderListTile,
} from '@/components/ListView/mixins/listTileApi.ts';
import { listTileProps } from '@/components/ListView/mixins/listViewProps.ts';
import { useCurrentRoute, useHasLink, useHasRouter, useRouteMatch } from '@/mixins/CommonApi.ts';
import type {
  IListItem,
  IListViewProvider,
  TBsListTile,
  TListTileOptionProps,
  TRecord,
} from '@/types';
import {
  computed,
  defineComponent,
  getCurrentInstance,
  inject,
  nextTick,
  onBeforeUpdate,
  onMounted,
  ref,
  shallowRef,
  watch,
} from 'vue';

export default defineComponent<TBsListTile>({
  name: 'BsListTile',
  props: listTileProps,
  emits: ['click', 'update:active'],
  setup(props, { emit, expose, slots }) {
    const thisProps = props as Readonly<TListTileOptionProps>;
    const instance = shallowRef(getCurrentInstance());
    const listItem = shallowRef<IListItem>();
    const isActive = ref<boolean | undefined>(thisProps.active);
    const hasRouter = ref<boolean>(useHasRouter(thisProps));
    const hasLink = ref<boolean>(useHasLink(thisProps));

    expose({ isActive });

    const provider = inject<IListViewProvider>('ListView');
    const tagName = computed<string>(() => (hasRouter.value || hasLink.value ? 'a' : 'div'));
    const tileClasses = computed<TRecord>(() =>
      useListTileClassNames(thisProps, isActive, hasLink, tagName.value, provider)
    );

    watch(
      () => thisProps.active,
      (value) => {
        if (provider && provider.config.individualState === true) {
          isActive.value = value;
        }
      }
    );

    onBeforeUpdate(async () => {
      if (hasRouter.value) {
        const route = useCurrentRoute();

        if (route && useRouteMatch(instance, route, thisProps)) {
          isActive.value = true;
          await nextTick().then(() => {
            emit('update:active', true);
          });
        }
      }
    });

    onMounted(() => {
      instance.value = getCurrentInstance();
      hasRouter.value = useHasRouter(thisProps);
      hasLink.value = useHasLink(thisProps);
    });

    return () =>
      useRenderListTile(tagName.value, slots, emit, thisProps, tileClasses, listItem, provider);
  },
});
