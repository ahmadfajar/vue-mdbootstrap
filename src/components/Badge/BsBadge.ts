import type { ComponentOptionsMixin, ComputedOptions, EmitsOptions, MethodOptions } from 'vue';
import { defineComponent } from 'vue';
import { cssPrefix, useRenderSlotDefault } from '../../mixins/CommonApi';
import type { TBadgeOptionProps, TBsBadge, TRecord } from '../../types';
import { badgeProps } from './mixins/badgeProps';

export default defineComponent<TBsBadge, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>({
    name: 'BsBadge',
    props: badgeProps,
    setup(props, {slots}) {
        const thisProps = props as Readonly<TBadgeOptionProps>;

        return () => useRenderSlotDefault(
            thisProps.tag || 'span',
            slots,
            {
              'badge': true,
                [`badge-${thisProps.type}`]: thisProps.type,
                [`text-bg-${thisProps.variant}`]: !thisProps.outlined && thisProps.variant,
                [`bg-${thisProps.color}`]: !thisProps.outlined && !thisProps.variant && thisProps.color,
                [`${cssPrefix}border text-${thisProps.variant || thisProps.color}`]: thisProps.outlined,
            }
        )
    }
});
