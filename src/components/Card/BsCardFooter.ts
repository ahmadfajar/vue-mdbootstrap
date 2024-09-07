import { defineComponent } from 'vue';
import { useRenderSlotDefault } from '../../mixins/CommonApi';
import { baseTagProps } from './mixins/cardProps';
import type { TBsCardFooter } from './types';

export default defineComponent<TBsCardFooter>({
    name: 'BsCardFooter',
    props: baseTagProps,
    setup(props, { slots }) {
        return () => useRenderSlotDefault(props.tag as string, slots, 'card-footer');
    },
});
