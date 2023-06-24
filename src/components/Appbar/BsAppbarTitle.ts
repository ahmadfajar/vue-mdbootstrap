import type { ComponentOptionsMixin, ComputedOptions, EmitsOptions } from 'vue';
import { createTextVNode, defineComponent, h, toDisplayString } from 'vue';
import { cssPrefix, useRenderSlot } from '../../mixins/CommonApi';
import { stringProp } from '../../mixins/CommonProps';
import type { TAppbarTitleOptionProps, TBsAppbarTitle, TRecord } from '../../types';
import Helper from '../../utils/Helper';

export default defineComponent<
    TBsAppbarTitle,
    TRecord,
    TRecord,
    ComputedOptions,
    ComponentOptionsMixin,
    EmitsOptions
>({
    name: 'BsAppbarTitle',
    props: {
        title: stringProp
    },
    setup(props, { slots }) {
        const cmpProps = props as Readonly<TAppbarTitleOptionProps>;

        return () =>
            h(
                'div',
                {
                    class: `${cssPrefix}appbar-title`
                },
                useRenderSlot(slots, 'default', { key: Helper.uuid() }, [
                    createTextVNode(toDisplayString(cmpProps.title))
                ])
            );
    }
});
