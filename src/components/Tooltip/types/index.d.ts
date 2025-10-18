import { ComponentObjectPropsOptions, ComponentPublicInstance, ObjectPlugin, VNode } from 'vue';
import { BaseComponentProps, Numberish } from '../../../types';
import { TPlacementPosition } from '../../Tabs/types';

export declare type TTooltipOptionProps = {
  /**
   * Html element ID, {@link Element} instance or component instance that can trigger
   * the appearance of this tooltip.
   */
  activator?: string | Element | ComponentPublicInstance;

  /**
   * Hide tooltip arrow or not.
   */
  arrowOff?: boolean;

  /**
   * This tooltip content.
   */
  content?: string;

  /**
   * Disable this tooltip and prevent it from appearing.
   */
  disabled?: boolean;

  /**
   * Value monitored by `v-model` to show or hide this tooltip programmatically.
   */
  show?: boolean;

  /**
   * This tooltip display placement.
   */
  placement?: TPlacementPosition;

  /**
   * This tooltip display width.
   */
  width?: Numberish;

  /**
   * This tooltip maximum display width.
   */
  maxWidth?: Numberish;

  /**
   * This tooltip inline-css 'z-index'.
   */
  zIndex?: Numberish;
};

export declare type TBsTooltip = ComponentObjectPropsOptions<TTooltipOptionProps>;

declare interface AllowedTooltipProps extends BaseComponentProps {
  /**
   * Fired when this Tooltip state is updated.
   */
  'onUpdate:show'?: (value: boolean) => void;

  /**
   * Fired when this Tooltip state is updated.
   */
  '@update:show'?: (value: boolean) => void;
}

export declare const BsTooltip: {
  new (): {
    $props: AllowedTooltipProps & TTooltipOptionProps;
    $slots: {
      default?: () => VNode[];
      content?: () => VNode[];
    };
    $emits: {
      (event: 'update:show', value: boolean): boolean;
    };
  };
};

export declare const BsTooltipPlugin: ObjectPlugin;
