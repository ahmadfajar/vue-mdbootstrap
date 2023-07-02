import type { ComponentOptionsMixin, ComputedOptions, EmitsOptions, MethodOptions } from 'vue';
import { defineComponent } from 'vue';
import { useRenderSlotDefault } from '../../mixins/CommonApi';
import type { TBadgeOptionProps, TBsBadge, TRecord } from '../../types';
import { badgeProps } from './mixins/badgeProps';

export default defineComponent<TBsBadge, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>({
    name: 'BsBadge',
    props: badgeProps,
    setup(props, {slots}) {
        const cmpProps = props as Readonly<TBadgeOptionProps>;

        return () => useRenderSlotDefault(
            cmpProps.tag || 'span',
            slots,
            [
                'badge',
                cmpProps.type ? `badge-${cmpProps.type}` : '',
                cmpProps.variant ? `text-bg-${cmpProps.variant}` : `bg-${cmpProps.color}`,
            ]
        )
    }
});
