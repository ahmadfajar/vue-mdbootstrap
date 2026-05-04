/* eslint-disable @typescript-eslint/no-empty-object-type */
import { searchFieldProps } from '@/components/Field/mixins/fieldProps.ts';
import {
  useRenderSearchField,
  useSearchFieldClasses,
} from '@/components/Field/mixins/searchFieldApi.ts';
import type { TBsSearchField, TSearchFieldOptionProps } from '@/components/Field/types';
import type {
  SearchFieldEventProps,
  SearchFieldEventPublic,
} from '@/components/Field/types/internals.ts';
import type { MaybeString, TRecord } from '@/types';
import type {
  ComponentOptionsMixin,
  ComponentProvideOptions,
  ComputedOptions,
  DefineComponent,
  ExtractDefaultPropTypes,
  MethodOptions,
  PublicProps,
  SlotsType,
  VNode,
} from 'vue';
import { computed, defineComponent, ref, watch } from 'vue';

export default defineComponent<TBsSearchField>({
  name: 'BsSearchField',
  props: searchFieldProps,
  inheritAttrs: false,
  emits: ['blur', 'focus', 'clear', 'search', 'open', 'close', 'update:model-value'],
  setup(props, { attrs, emit, slots }) {
    const thisProps = props as Readonly<TSearchFieldOptionProps>;
    const localValue = ref<MaybeString>(thisProps.modelValue);
    const isFocused = ref<boolean>(false);
    const isPopoverOpen = ref(false);
    const activator = ref<HTMLElement | null>(null);
    const classes = computed(() => useSearchFieldClasses(thisProps, isFocused));

    watch(
      () => thisProps.modelValue,
      (value) => (localValue.value = value)
    );
    watch(
      () => thisProps.popoverOpen as boolean,
      (value) => {
        thisProps.advanceSearch && (isPopoverOpen.value = value);
      }
    );

    return () =>
      useRenderSearchField(
        slots,
        emit,
        thisProps,
        attrs,
        classes,
        activator,
        localValue,
        isFocused,
        isPopoverOpen
      );
  },
}) as DefineComponent<
  TBsSearchField,
  {},
  {},
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  SearchFieldEventProps,
  string,
  PublicProps,
  Readonly<TSearchFieldOptionProps> & Readonly<SearchFieldEventPublic>,
  ExtractDefaultPropTypes<TBsSearchField>,
  SlotsType<SearchFieldSlots>,
  {},
  {},
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;

declare interface SearchFieldSlots {
  /**
   * The default slot used to place one or more components inside the popover.
   */
  popover?: () => VNode[];
}
