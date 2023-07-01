import type { ComponentOptionsMixin, ComputedOptions, EmitsOptions, MethodOptions } from 'vue';
import { defineComponent } from 'vue';
import { useRenderSlotDefault } from '../../mixins/CommonApi';
import type { TBsCardBody, TRecord } from '../../types';
import { baseTagProps } from './mixins/cardProps';

export default defineComponent<TBsCardBody, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>({
    name: 'BsCardBody',
    props: baseTagProps,
    setup(props, {slots}) {
        return () => useRenderSlotDefault(<string>props.tag, slots, 'card-body');
    }
});
