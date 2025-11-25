import { ComponentObjectPropsOptions, ObjectPlugin, VNode } from 'vue';
import {
  BaseComponentProps,
  EventUpdateModelValueProps,
  EventVoidClosableProps,
  TAllowedIconProps,
  TContextColor,
} from '../../../types';

export declare type TAlertVariant = 'success' | 'info' | 'warning' | 'danger' | 'help';

export declare type TAlertOptionProps = TAllowedIconProps & {
  /**
   * Alert color
   */
  color?: TContextColor | string;

  /**
   * Define close button color explicitly.
   */
  closeButtonColor?: TContextColor | string;

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

declare interface AllowedAlertProps
  extends BaseComponentProps,
    EventVoidClosableProps,
    EventUpdateModelValueProps<boolean> {}

export declare const BsAlert: {
  new (): {
    $props: AllowedAlertProps & TAlertOptionProps;
    $slots: {
      default?: () => VNode[];
      icon?: () => VNode;
    };
    $emits: {
      (event: 'close'): void;
      (event: 'update:model-value', value: boolean): void;
    };
  };
};

export declare const BsAlertPlugin: ObjectPlugin;
