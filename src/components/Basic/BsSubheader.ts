import type { TBsSubheader } from '@/components/Basic/types';
import { cssPrefix, useRenderSlotDefault } from '@/mixins/CommonApi.ts';
import { booleanProp } from '@/mixins/CommonProps.ts';
import { defineComponent } from 'vue';

export default defineComponent<TBsSubheader>({
    name: 'BsSubheader',
    props: {
        dark: booleanProp,
    },
    setup(props, { slots }) {
        return () =>
            useRenderSlotDefault('div', slots, [
                `${cssPrefix}subheader`,
                props.dark ? 'subheader--dark' : 'subheader--light',
            ]);
    },
});
