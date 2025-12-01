import { badgeProps } from '@/components/Badge/mixins/badgeProps.ts';
import type { TBadgeOptionProps, TBsBadge } from '@/components/Badge/types';
import { cssPrefix, useWrapSlotDefault } from '@/mixins/CommonApi.ts';
import { defineComponent } from 'vue';

export default defineComponent<TBsBadge>({
  name: 'BsBadge',
  props: badgeProps,
  setup(props, { slots }) {
    const thisProps = props as Readonly<TBadgeOptionProps>;

    return () => useWrapSlotDefault(thisProps.tag || 'span', slots, makeBadgeClasses(thisProps));
  },
});

function makeBadgeClasses(props: TBadgeOptionProps): string[] {
  const config = [`${cssPrefix}badge`, props.type ? `${cssPrefix}badge-${props.type}` : ''];

  if (props.outlined) {
    config.push('border-thin');
    if (props.color && !props.variant) {
      config.push(props.color?.startsWith('text-') ? props.color : `text-${props.color}`);
    } else if (props.variant) {
      config.push(`text-${props.variant}`);
    }
  } else {
    if (props.color && !props.variant) {
      config.push(props.color?.startsWith('bg-') ? props.color : `bg-${props.color}`);
    } else if (props.variant) {
      config.push(`text-bg-${props.variant}`);
    } else {
      config.push('text-bg-default');
    }
  }

  return config;
}
