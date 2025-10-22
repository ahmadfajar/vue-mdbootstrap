import { badgeProps } from '@/components/Badge/mixins/badgeProps.ts';
import type { TBadgeOptionProps, TBsBadge } from '@/components/Badge/types';
import { cssPrefix, useWrapSlotDefault } from '@/mixins/CommonApi.ts';
import { defineComponent } from 'vue';

export default defineComponent<TBsBadge>({
  name: 'BsBadge',
  props: badgeProps,
  setup(props, { slots }) {
    const thisProps = props as Readonly<TBadgeOptionProps>;

    return () =>
      useWrapSlotDefault(thisProps.tag || 'span', slots, {
        [`${cssPrefix}badge`]: true,
        [`${cssPrefix}badge-${thisProps.type}`]: thisProps.type,
        [`bg-${thisProps.color}`]: thisProps.color && !thisProps.outlined,
        [`text-bg-${thisProps.variant}`]: thisProps.variant && !thisProps.outlined,
        [`${cssPrefix}badge-outline-${thisProps.variant || thisProps.color}`]: thisProps.outlined,
        'border-thin': thisProps.outlined,
      });
  },
});
