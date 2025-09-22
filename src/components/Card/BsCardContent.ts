import { useContentTag } from '@/components/Card/mixins/cardApi.ts';
import { cardContentProps } from '@/components/Card/mixins/cardProps.ts';
import type { TBsCardContent, TCardContentOptionProps } from '@/components/Card/types';
import { cssPrefix, useWrapSlotDefault } from '@/mixins/CommonApi.ts';
import { computed, defineComponent } from 'vue';

export default defineComponent<TBsCardContent>({
  name: 'BsCardContent',
  props: cardContentProps,
  setup(props, { slots }) {
    const thisProps = props as Readonly<TCardContentOptionProps>;
    const tagName = computed(() => useContentTag(thisProps.type, thisProps.tag));

    return () =>
      useWrapSlotDefault(tagName.value, slots, {
        [`${cssPrefix}card-${props.type as string}`]: tagName.value,
      });
  },
});
