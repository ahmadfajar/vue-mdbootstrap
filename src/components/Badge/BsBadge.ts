import { badgeProps } from '@/components/Badge/mixins/badgeProps.ts';
import type { TBadgeOptionProps, TBsBadge } from '@/components/Badge/types';
import { cssPrefix, useRenderSlotDefault } from '@/mixins/CommonApi.ts';
import { defineComponent } from 'vue';

export default defineComponent<TBsBadge>({
    name: 'BsBadge',
    props: badgeProps,
    setup(props, { slots }) {
        const thisProps = props as Readonly<TBadgeOptionProps>;

        return () =>
            useRenderSlotDefault(thisProps.tag || 'span', slots, {
                badge: true,
                [`badge-${thisProps.type}`]: thisProps.type,
                [`text-bg-${thisProps.variant}`]: !thisProps.outlined && thisProps.variant,
                [`bg-${thisProps.color}`]:
                    !thisProps.outlined && !thisProps.variant && thisProps.color,
                [`${cssPrefix}border text-${thisProps.variant || thisProps.color}`]:
                    thisProps.outlined,
            });
    },
});
