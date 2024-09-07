import { defineComponent } from 'vue';
import { useRenderSlotDefault } from '../../mixins/CommonApi';
import { baseTagProps } from './mixins/cardProps';
import type { TBsCardHeader } from './types';

export default defineComponent<TBsCardHeader>({
    name: 'BsCardHeader',
    props: baseTagProps,
    setup(props, { slots }) {
        return () => useRenderSlotDefault(props.tag as string, slots, 'card-header');
    },
});
