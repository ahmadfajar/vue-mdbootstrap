import type { HtmlTagName, TExtendedContextColor, TRecord } from '@/types';
import type { VoidDefaultSlots } from '@/types/internals';
import type {
  Component,
  ComponentObjectPropsOptions,
  ComponentOptionsMixin,
  ComponentProvideOptions,
  ComputedOptions,
  DefineComponent,
  Directive,
  EmitsOptions,
  ExtractDefaultPropTypes,
  MethodOptions,
  PublicProps,
  SlotsType,
} from 'vue';

export declare type TBadgeType = 'label' | 'pill';

export declare type TBadgeVariant =
  'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'light';

export declare type TBadgeOptionProps = {
  /**
   * This badge color appearance.
   *
   * Built-in colors are: `primary`, `secondary`, `success`, `warning`, `danger`, `info`, `light`, `default`.
   */
  color?: TExtendedContextColor | string;

  /**
   * Create outlined badge style.
   */
  outlined?: boolean;

  /**
   * Html tag used to render this badge.
   */
  tag?: HtmlTagName | string;

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

export declare type BsBadgeConstructor = DefineComponent<
  TBsBadge,
  TRecord,
  TRecord,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  EmitsOptions,
  string,
  PublicProps,
  Readonly<TBadgeOptionProps>,
  ExtractDefaultPropTypes<TBsBadge>,
  SlotsType<VoidDefaultSlots>,
  Record<string, Component>,
  Record<string, Directive>,
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;

export declare const BsBadge: {
  new (): {
    $props: TBadgeOptionProps & PublicProps;
    $slots: VoidDefaultSlots;
  };
};
