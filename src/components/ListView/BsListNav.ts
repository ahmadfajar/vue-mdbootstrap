/* eslint-disable @typescript-eslint/no-empty-object-type */
import { type IListItem, ListItem } from '@/components/ListView/mixins/ListItem.ts';
import { useAddChild } from '@/components/ListView/mixins/listNavApi.ts';
import type { IListViewProvider } from '@/components/ListView/mixins/ListViewProvider.ts';
import type { TBsListNav, TListNavOptionProps } from '@/components/ListView/types';
import { cssPrefix, useGenerateId } from '@/mixins/CommonApi.ts';
import { booleanProp } from '@/mixins/CommonProps.ts';
import type { TRecord } from '@/types';
import type { VoidDefaultSlots } from '@/types/internals.ts';
import type {
  ComponentOptionsMixin,
  ComponentProvideOptions,
  ComputedOptions,
  DefineComponent,
  ExtractDefaultPropTypes,
  MethodOptions,
  PublicProps,
  SlotsType,
} from 'vue';
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
      'collapse hidden': thisProps.child === true && !expanded.value,
      collapsing: thisProps.child === true && collapsing.value,
    }));

    onBeforeMount(async () => {
      const vm = getCurrentInstance();

      if (vm) {
        refItem.value = new ListItem(thisProps.id as string, 'BsListNav', vm, emit);

        if (provider) {
          if (thisProps.child === true) {
            await nextTick().then(() => useAddChild(provider, vm.parent, refItem.value));
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
          id: thisProps.id,
          class: classNames.value,
          onVnodeBeforeUnmount: () => refItem.value?.destroy(),
        },
        slots.default && slots.default()
      );
  },
}) as DefineComponent<
  TBsListNav,
  {},
  {},
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  {},
  string,
  PublicProps,
  Readonly<TListNavOptionProps> & Readonly<{}>,
  ExtractDefaultPropTypes<TBsListNav>,
  SlotsType<VoidDefaultSlots>,
  {},
  {},
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;
