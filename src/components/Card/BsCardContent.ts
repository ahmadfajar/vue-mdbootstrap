import { computed, defineComponent } from 'vue';
import { useRenderSlotDefault } from '../../mixins/CommonApi';
import { useContentTag } from './mixins/cardApi';
import { cardContentProps } from './mixins/cardProps';
import type { TBsCardContent } from './types';

export default defineComponent<TBsCardContent>({
    name: 'BsCardContent',
    props: cardContentProps,
    setup(props, { slots }) {
        const tagName = computed((): string =>
            useContentTag(props.type as string | undefined, props.tag as string | undefined)
        );

        return () =>
            useRenderSlotDefault(tagName.value, slots, { [`card-${props.type}`]: tagName.value });
    },
});
