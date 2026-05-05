import type { TAllowedIconProps } from '@/components/Avatar/types';
import type { TButtonColor } from '@/components/Button/types';
import type { TExtendedContextColor } from '@/types';
import type { ComponentObjectPropsOptions } from 'vue';

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

// declare interface AllowedAlertProps
//   extends PublicComponentProps, ClosableVoidEventPublic, UpdateModelValueEventPublic<boolean> {}
//
// export declare const BsAlert: {
//   new (): {
//     $props: AllowedAlertProps & TAlertOptionProps;
//     $slots: {
//       default?: () => VNode[];
//       icon?: () => VNode;
//     };
//     $emits: {
//       (event: 'close'): void;
//       (event: 'update:model-value', value: boolean): void;
//     };
//   };
// };
//
// export declare const BsAlertPlugin: ObjectPlugin;
