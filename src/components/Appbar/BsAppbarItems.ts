import { cssPrefix, useWrapSlotDefault } from '@/mixins/CommonApi.ts';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BsAppbarItems',
  setup(_, { slots }) {
    return () =>
      useWrapSlotDefault('div', slots, [`${cssPrefix}appbar-items`, 'flex', 'max-w-full']);
  },
});
