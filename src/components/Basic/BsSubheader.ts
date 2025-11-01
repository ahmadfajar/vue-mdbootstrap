import type { TBsSubheader } from '@/components/Basic/types';
import { cssPrefix, useWrapSlotDefault } from '@/mixins/CommonApi.ts';
import { booleanProp } from '@/mixins/CommonProps.ts';
import { defineComponent } from 'vue';

export default defineComponent<TBsSubheader>({
  name: 'BsSubheader',
  props: {
    dark: booleanProp,
  },
  setup(props, { slots }) {
    return () =>
      useWrapSlotDefault('div', slots, [
        `${cssPrefix}subheader`,
        'flex',
        'items-center',
        props.dark ? 'subheader--dark' : 'subheader--light',
      ]);
  },
});
