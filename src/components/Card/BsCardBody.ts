import { baseTagProps } from '@/components/Card/mixins/cardProps.ts';
import type { TBsCardBody } from '@/components/Card/types';
import { useRenderSlotDefault } from '@/mixins/CommonApi.ts';
import { defineComponent } from 'vue';

export default defineComponent<TBsCardBody>({
    name: 'BsCardBody',
    props: baseTagProps,
    setup(props, { slots }) {
        return () => useRenderSlotDefault(props.tag as string, slots, 'card-body');
    },
});
