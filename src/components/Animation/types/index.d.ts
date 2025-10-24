import { ComponentObjectPropsOptions, ObjectPlugin, TransitionProps, VNode } from 'vue';
import { BaseComponentProps, type HtmlTagName, Numberish } from '../../../types';

export declare type TRippleOptionProps = {
  /**
   * Ripple animation state.
   */
  active?: boolean | Event;

  /**
   * Start animation from center or from mouse click position.
   * If true then animation always start from center, otherwise animation
   * will start from mouse click position.
   */
  centered?: boolean;

  /**
   * Enable or disable ripple animation.
   */
  disabled?: boolean;

  /**
   * Html tag used to render this component, default is `div`.
   */
  tag?: HtmlTagName;
};

export declare type TOverlayOptionProps = {
  /**
   * Overlay base color. Must be a valid css color formatted string.
   */
  color?: string;

  /**
   * Sets the css-style `position` value. If `true` then css-style `position` is set to `fixed`.
   */
  fixed?: boolean;

  /**
   * Overlay state, show or hide.
   */
  show?: boolean;

  /**
   * Overlay opacity.
   */
  opacity?: Numberish;

  /**
   * Overlay inline-css `z-index`.
   */
  zIndex?: Numberish;
};

export declare type TBsOverlay = ComponentObjectPropsOptions<TOverlayOptionProps>;

export declare type TBsRipple = ComponentObjectPropsOptions<TRippleOptionProps>;

export declare const BsExpandTransition: {
  new (): {
    $props: BaseComponentProps & TransitionProps;
    $slots: {
      default?: () => VNode[];
    };
  };
};

declare interface AllowedOverlayProps extends BaseComponentProps {
  onClick?: (e: Event) => void;
  '@click'?: (e: Event) => void;
}

export declare const BsOverlay: {
  new (): {
    $props: AllowedOverlayProps & TOverlayOptionProps;
    $slots: {
      default?: () => VNode[];
    };
    $emits: {
      (event: 'click', value: Event): void;
    };
  };
};

declare interface AllowedRippleProps extends BaseComponentProps {
  'onUpdate:active'?: (value: boolean) => void;
  '@update:active'?: (value: boolean) => void;
}

export declare const BsRipple: {
  new (): {
    $props: AllowedRippleProps & TRippleOptionProps;
    $slots: {
      default?: () => VNode[];
    };
    $emits: {
      (event: 'update:active', value: boolean): void;
    };
  };
};

export declare const BsAnimationPlugin: ObjectPlugin;
