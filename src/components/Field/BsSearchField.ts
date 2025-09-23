import { searchFieldProps } from '@/components/Field/mixins/fieldProps.ts';
import {
  useRenderSearchField,
  useSearchFieldClasses,
} from '@/components/Field/mixins/searchFieldApi.ts';
import type { TBsSearchField, TSearchFieldOptionProps } from '@/components/Field/types';
import { computed, defineComponent, ref, watch } from 'vue';

export default defineComponent<TBsSearchField>({
  name: 'BsSearchField',
  props: searchFieldProps,
  inheritAttrs: false,
  emits: ['blur', 'focus', 'clear', 'search', 'open', 'close', 'update:model-value'],
  setup(props, { attrs, emit, slots }) {
    const thisProps = props as Readonly<TSearchFieldOptionProps>;
    const localValue = ref(thisProps.modelValue);
    const isFocused = ref<boolean>(false);
    const isPopoverOpen = ref(false);
    const activator = ref<HTMLElement | null>(null);
    const classes = computed(() => useSearchFieldClasses(thisProps, isFocused));

    watch(
      () => thisProps.modelValue,
      (value) => (localValue.value = value)
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
});
