import { defineComponent } from 'vue';
import { useRenderSlotDefault } from '../../mixins/CommonApi';
import { baseTagProps } from './mixins/cardProps';
import type { TBsCardBody } from './types';

export default defineComponent<TBsCardBody>({
    name: 'BsCardBody',
    props: baseTagProps,
    setup(props, { slots }) {
        return () => useRenderSlotDefault(props.tag as string, slots, 'card-body');
    },
});
