import type { ComponentOptionsMixin, ComputedOptions, EmitsOptions, MethodOptions } from 'vue';
import { defineComponent } from 'vue';
import { useSimpleRenderWithSlots } from '../../mixins/CommonApi';
import type { TBsCardFooter, TRecord } from '../../types';
import { baseTagProps } from './mixins/cardProps';

export default defineComponent<TBsCardFooter, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>({
    name: 'BsCardFooter',
    props: baseTagProps,
    setup(props, {slots}) {
        return () => useSimpleRenderWithSlots(<string>props.tag, slots, 'card-footer');
    }
});
