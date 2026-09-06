import type { TAllowedIconProps } from '@/components/Avatar/types';
import type { TButtonColor } from '@/components/Button/types';
import type { TExtendedContextColor, TRecord } from '@/types';
import type {
  ClosableVoidEventProps,
  ClosableVoidEventPublic,
  UpdateModelValueEventProps,
  UpdateModelValueEventPublic,
  VoidDefaultSlots,
} from '@/types/internals';
import type {
  Component,
  ComponentObjectPropsOptions,
  ComponentOptionsMixin,
  ComponentProvideOptions,
  ComputedOptions,
  DefineComponent,
  Directive,
  ExtractDefaultPropTypes,
  MethodOptions,
  PublicProps,
  SlotsType,
  VNode,
} from 'vue';

export declare type TAlertVariant = 'success' | 'info' | 'warning' | 'danger' | 'help';

export declare type TAlertOptionProps = TAllowedIconProps & {
  /**
   * Alert color.
   *
   * Built-in colors are: `primary`, `secondary`, `success`, `warning`, `danger`, `info`, `light`, `default`.
   */
  color?: TExtendedContextColor | string;

  /**
   * Define close button color explicitly.
   *
   * Built-in colors are: `primary`, `secondary`, `success`, `warning`, `danger`, `info`, `light`,
   * `dark`, `default`.
   */
  closeButtonColor?: TButtonColor | string;

  /**
   * When sets, display the close button to dismiss/hide the component.
   */
  dismissible?: boolean;

  /**
   * Create alert with solid fill style.
   */
  filled?: boolean;

  /**
   * The value monitored by `v-model` to display or hide the alert component.
   */
  modelValue?: boolean;

  /**
   * Create outlined alert style.
   */
  outlined?: boolean;

  /**
   * The component animation transition to display/hide.
   */
  transition?: string;

  /**
   * Use predefined icon to create contextual alert.
   */
  variant?: TAlertVariant;
};

export declare type TBsAlert = ComponentObjectPropsOptions<TAlertOptionProps>;

export declare type AlertEventProps = ClosableVoidEventProps & UpdateModelValueEventProps<boolean>;

export declare interface AlertEventPublic
  extends ClosableVoidEventPublic, UpdateModelValueEventPublic<boolean> {}

export declare interface AlertSlots extends VoidDefaultSlots {
  /**
   * Additional slot used to place the custom icon.
   */
  icon?: () => VNode[] | VNode;
}

export declare type BsAlertConstructor = DefineComponent<
  TBsAlert,
  TRecord,
  TRecord,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  AlertEventProps,
  string,
  PublicProps,
  Readonly<TAlertOptionProps> & Readonly<AlertEventPublic>,
  ExtractDefaultPropTypes<TBsAlert>,
  SlotsType<AlertSlots>,
  Record<string, Component>,
  Record<string, Directive>,
  string,
  ComponentProvideOptions,
  true,
  TRecord,
  never
>;

export declare const BsAlert: {
  new (): {
    $props: TAlertOptionProps & AlertEventPublic & PublicProps;
    $slots: AlertSlots;
    $emit: AlertEventProps;
  };
};
