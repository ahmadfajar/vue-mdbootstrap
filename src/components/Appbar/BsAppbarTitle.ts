import { createTextVNode, defineComponent, h, toDisplayString } from 'vue';
import { cssPrefix, useRenderSlot } from '../../mixins/CommonApi';
import { stringProp } from '../../mixins/CommonProps';
import Helper from '../../utils/Helper';
import type { TAppbarTitleOptionProps, TBsAppbarTitle } from './types';

export default defineComponent<TBsAppbarTitle>({
    name: 'BsAppbarTitle',
    props: {
        title: stringProp,
    },
    setup(props, { slots }) {
        const cmpProps = props as Readonly<TAppbarTitleOptionProps>;

        return () =>
            h(
                'div',
                {
                    class: `${cssPrefix}appbar-title`,
                },
                useRenderSlot(slots, 'default', { key: Helper.uuid() }, [
                    createTextVNode(toDisplayString(cmpProps.title)),
                ])
            );
    },
});
