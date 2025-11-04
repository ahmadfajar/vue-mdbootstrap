import { badgeProps } from '@/components/Badge/mixins/badgeProps.ts';
import type { TBadgeOptionProps, TBsBadge } from '@/components/Badge/types';
import { cssPrefix, useWrapSlotDefault } from '@/mixins/CommonApi.ts';
import { defineComponent } from 'vue';

export default defineComponent<TBsBadge>({
  name: 'BsBadge',
  props: badgeProps,
  setup(props, { slots }) {
    const thisProps = props as Readonly<TBadgeOptionProps>;
    const hasColor = () => {
      return !!thisProps.color && !thisProps.variant && !thisProps.outlined;
    };
    const hasOutlined = () => {
      return thisProps.outlined && !!(thisProps.color || thisProps.variant);
    };

    return () =>
      useWrapSlotDefault(thisProps.tag || 'span', slots, {
        [`${cssPrefix}badge`]: true,
        [`${cssPrefix}badge-${thisProps.type}`]: thisProps.type,
        [thisProps.color?.startsWith('bg-') ? thisProps.color : `bg-${thisProps.color}`]:
          hasColor(),
        [`text-bg-${thisProps.variant}`]: thisProps.variant && !thisProps.outlined,
        [`badge-outline-${thisProps.variant || thisProps.color}`]: hasOutlined(),
        'border-thin': thisProps.outlined,
      });
  },
});
