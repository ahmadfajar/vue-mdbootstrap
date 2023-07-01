import type { ComponentOptionsMixin, ComputedOptions, EmitsOptions, MethodOptions } from 'vue';
import { defineComponent } from 'vue';
import { useRenderSlotDefault } from '../../mixins/CommonApi';
import type { TBsCardFooter, TRecord } from '../../types';
import { baseTagProps } from './mixins/cardProps';

export default defineComponent<TBsCardFooter, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>({
    name: 'BsCardFooter',
    props: baseTagProps,
    setup(props, {slots}) {
        return () => useRenderSlotDefault(<string>props.tag, slots, 'card-footer');
    }
});
