import type { TBsCardHeader } from '@/components/Card/types';
import { cssPrefix, useWrapSlotDefault } from '@/mixins/CommonApi.ts';
import { tagProp } from '@/mixins/CommonProps.ts';
import { defineComponent } from 'vue';

export default defineComponent<TBsCardHeader>({
  name: 'BsCardHeader',
  props: {
    tag: tagProp,
  },
  setup(props, { slots }) {
    return () => useWrapSlotDefault(props.tag as string, slots, `${cssPrefix}card-header`);
  },
});
