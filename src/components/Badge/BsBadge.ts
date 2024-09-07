import { defineComponent } from 'vue';
import { cssPrefix, useRenderSlotDefault } from '../../mixins/CommonApi';
import { badgeProps } from './mixins/badgeProps';
import type { TBadgeOptionProps, TBsBadge } from './types';

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
