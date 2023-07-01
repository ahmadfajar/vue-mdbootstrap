import type { ComponentOptionsMixin, ComputedOptions, EmitsOptions, MethodOptions } from 'vue';
import { defineComponent } from 'vue';
import { useRenderSlotDefault } from '../../mixins/CommonApi';
import type { TBsCardHeader, TRecord } from '../../types';
import { baseTagProps } from './mixins/cardProps';

export default defineComponent<TBsCardHeader, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>({
    name: 'BsCardHeader',
    props: baseTagProps,
    setup(props, {slots}) {
        return () => useRenderSlotDefault(<string>props.tag, slots, 'card-header');
    }
});
