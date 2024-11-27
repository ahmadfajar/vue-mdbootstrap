import { cssPrefix, useRenderSlotDefault } from '@/mixins/CommonApi.ts';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'BsAppbarItems',
    setup(_, { slots }) {
        return () => useRenderSlotDefault('div', slots, `${cssPrefix}appbar-items`);
    },
});
