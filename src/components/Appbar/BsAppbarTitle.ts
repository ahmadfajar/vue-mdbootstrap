import type { TAppbarTitleOptionProps, TBsAppbarTitle } from '@/components/Appbar/types';
import { cssPrefix, useRenderSlot } from '@/mixins/CommonApi.ts';
import { stringProp } from '@/mixins/CommonProps.ts';
import Helper from '@/utils/Helper';
import { createTextVNode, defineComponent, h, toDisplayString } from 'vue';

export default defineComponent<TBsAppbarTitle>({
    name: 'BsAppbarTitle',
    props: {
        title: stringProp,
    },
    setup(props, { slots }) {
        const thisProps = props as Readonly<TAppbarTitleOptionProps>;

        return () =>
            h(
                'div',
                {
                    class: `${cssPrefix}appbar-title`,
                },
                useRenderSlot(slots, 'default', { key: Helper.uuid() }, [
                    createTextVNode(toDisplayString(thisProps.title)),
                ])
            );
    },
});
