import { ComponentObjectPropsOptions, ObjectPlugin, VNode } from 'vue';
import {
  BaseComponentProps,
  EventUpdateModelValueProps,
  Numberish,
  TRadioOptionProps,
} from '../../../types';

export declare type TLabelPosition = 'left' | 'right';

export declare type TSwitchOptionProps = TRadioOptionProps & {
  /**
   * Additional css class for the text label.
   */
  labelClass?: string | string[];

  /**
   * The switch text label position, valid values are: `left`, `right`.
   */
  labelPosition?: TLabelPosition;

  /**
   * Sets the switch style appearance to **Inset style**.
   */
  insetMode?: boolean;

  /**
   * Sets the switch style appearance to **Inset Outlined style**.
   */
  insetOutlined?: boolean;

  /**
   * Enable the component's thumb icon when the component is on _**unchecked**_ state.
   */
  checkoffIcon?: boolean;

  /**
   * Enable the component's thumb icon when the component is on _**checked**_ state.
   */
  checkedIcon?: boolean;
};

export declare type TBsSwitch = ComponentObjectPropsOptions<TSwitchOptionProps>;

declare interface AllowedSwitchProps
  extends BaseComponentProps,
    EventUpdateModelValueProps<Numberish | boolean> {
  /**
   * Fired when this component's state is changed.
   */
  onChecked?: (checked: boolean) => void;

  /**
   * Fired when this component's state is changed.
   */
  '@checked'?: (checked: boolean) => void;
}

export declare const BsSwitch: {
  new (): {
    $props: AllowedSwitchProps & TSwitchOptionProps;
    $slots: {
      default?: () => VNode[];
    };
    $emits: {
      (event: 'checked', checked: boolean): void;
      (event: 'update:model-value', value: Numberish | boolean): void;
    };
  };
};

export declare const BsSwitchPlugin: ObjectPlugin;
