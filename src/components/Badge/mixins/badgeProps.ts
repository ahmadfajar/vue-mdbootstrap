import type { TBadgeType } from '@/components/Badge/types';
import { booleanProp, defaultColorProp } from '@/mixins/CommonProps.ts';
import type { Prop } from 'vue';

export const badgeProps = {
    /**
     * The badge color appearance.
     */
    color: defaultColorProp,
    outlined: booleanProp,
    /**
     * Html tag used to render the badge.
     */
    tag: {
        type: String,
        default: 'span',
    },
    /**
     * Create badge with `pill` or `label` style.
     */
    type: {
        type: String,
        default: undefined,
        validator: (value: string): boolean => ['label', 'pill'].includes(value),
    } as Prop<TBadgeType>,
    /**
     * Create contextual badge with
     * [Bootstrap theme color](https://getbootstrap.com/docs/5.2/components/badge/#background-colors).
     */
    variant: {
        type: String,
        default: undefined,
        validator: (value: string): boolean =>
            [
                'primary',
                'secondary',
                'success',
                'warning',
                'danger',
                'info',
                'light',
                'dark',
            ].includes(value),
    },
};
