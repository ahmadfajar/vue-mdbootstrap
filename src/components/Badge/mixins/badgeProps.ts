import type { TBadgeType } from '@/components/Badge/types';
import { booleanProp, defaultColorProp } from '@/mixins/CommonProps.ts';
import type { Prop } from 'vue';

export const badgeProps = {
  color: defaultColorProp,
  outlined: booleanProp,
  tag: {
    type: String,
    default: 'span',
  },
  type: {
    type: String,
    default: undefined,
    validator: (value: string): boolean => ['label', 'pill'].includes(value),
  } as Prop<TBadgeType>,
  variant: {
    type: String,
    default: undefined,
    validator: (value: string): boolean =>
      ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'default'].includes(
        value
      ),
  },
};
