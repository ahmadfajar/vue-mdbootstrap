import type { ComponentOptionsMixin, ComputedOptions, EmitsOptions, MethodOptions } from 'vue';
import { computed, defineComponent } from 'vue';
import { useSimpleRenderWithSlots } from '../../mixins/CommonApi';
import type { TBsCardContent, TRecord } from '../../types';
import { useContentTag } from './mixins/cardApi';
import { cardContentProps } from './mixins/cardProps';

export default defineComponent<TBsCardContent, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>({
    name: 'BsCardContent',
    props: cardContentProps,
    setup(props, {slots}) {
        const tagName = computed((): string => useContentTag(<string>props.type, <string>props.tag));

        return () => useSimpleRenderWithSlots(
            tagName.value, slots,
            {[`card-${props.type}`]: tagName.value},
        );
    }
});
