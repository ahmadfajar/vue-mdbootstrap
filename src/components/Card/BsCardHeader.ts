import { baseTagProps } from '@/components/Card/mixins/cardProps.ts';
import type { TBsCardHeader } from '@/components/Card/types';
import { useWrapSlotDefault } from '@/mixins/CommonApi.ts';
import { defineComponent } from 'vue';

export default defineComponent<TBsCardHeader>({
  name: 'BsCardHeader',
  props: baseTagProps,
  setup(props, { slots }) {
    return () => useWrapSlotDefault(props.tag as string, slots, 'card-header');
  },
});
