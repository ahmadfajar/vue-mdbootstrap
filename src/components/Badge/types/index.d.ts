import { ComponentObjectPropsOptions, ObjectPlugin, VNode } from 'vue';
import { BaseComponentProps, HtmlTagName, TContextColor } from '../../../types';

export declare type TBadgeType = 'label' | 'pill';

export declare type TBadgeVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'light';

export declare type TBadgeOptionProps = {
  /**
   * This badge color appearance.
   */
  color?: TContextColor | string;

  /**
   * Create outlined badge style.
   */
  outlined?: boolean;

  /**
   * Html tag used to render this badge.
   */
  tag?: HtmlTagName;

  /**
   * Create badge with `pill` or `label` style.
   */
  type?: TBadgeType;

  /**
   * Create contextual badge with
   * [Bootstrap badge color](https://getbootstrap.com/docs/5.3/components/badge/#background-colors).
   */
  variant?: TBadgeVariant;
};

export declare type TBsBadge = ComponentObjectPropsOptions<TBadgeOptionProps>;

export declare const BsBadge: {
  new (): {
    $props: BaseComponentProps & TBadgeOptionProps;
    $slots: {
      default?: () => VNode[];
    };
  };
};

export declare const BsBadgePlugin: ObjectPlugin;
