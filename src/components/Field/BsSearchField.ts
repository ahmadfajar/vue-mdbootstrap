import { searchFieldProps } from '@/components/Field/mixins/fieldProps';
import {
  useRenderSearchField,
  useSearchFieldClasses,
} from '@/components/Field/mixins/searchFieldApi';
import type { TBsSearchField, TSearchFieldOptionProps } from '@/components/Field/types';
import { computed, defineComponent, ref, watch } from 'vue';

export default defineComponent<TBsSearchField>({
  name: 'BsSearchField',
  props: searchFieldProps,
  inheritAttrs: false,
  emits: [
    /**
     * Fired when this component lost focus.
     */
    'blur',
    /**
     * Fired when this component got focused.
     */
    'focus',
    /**
     * Fired when this component's value is being cleared.
     */
    'clear',
    /**
     * Asks handler to start searching for the given keyword.
     */
    'search',
    /**
     * Fired when the Popover is show.
     */
    'open',
    /**
     * Fired when the Popover is hiding.
     */
    'close',
    /**
     * Fired when this component's value is updated.
     */
    'update:model-value',
  ],
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
        props,
        attrs,
        classes,
        activator,
        localValue,
        isFocused,
        isPopoverOpen
      );
  },
});
