import type { PromiseVoidFunction, TRecord } from '@/types/index.ts';
import type { ComponentInternalInstance, ComponentPublicInstance, VNode, VNodeProps } from 'vue';

export declare type RawProps = VNodeProps & TRecord;

export declare type TValueText<T> = {
  value: T;
  text: string;
};

export declare type TDebounce = {
  timerId?: number;
  lastExec?: number;
};

export declare type ClosableEventProps = {
  /**
   * Fired when the criteria below is matched:
   * - If the component has popover, then this event is triggered when the popover is closed,
   * - If the component can be dismissed, then this event is triggered when the component is dismissed (hide)
   */
  close?: (msg: string) => void;
};

export declare interface ClosableEventPublic {
  /**
   * Fired when the criteria below is matched:
   * - If the component has popover, then this event is triggered when the popover is closed,
   * - If the component can be dismissed, then this event is triggered when the component is dismissed (hide)
   */
  onClose?: (msg: string) => void;

  /**
   * Fired when the criteria below is matched:
   * - If the component has popover, then this event is triggered when the popover is closed,
   * - If the component can be dismissed, then this event is triggered when the component is dismissed (hide)
   */
  '@close'?: (msg: string) => void;
}

export declare type ClosableVoidEventProps = {
  /**
   * Fired when the criteria below is matched:
   * - If the component has popover, then this event is triggered when the popover is closed,
   * - If the component can be dismissed, then this event is triggered when the component is dismissed (hide)
   */
  close?: VoidFunction | PromiseVoidFunction;
};

export declare interface ClosableVoidEventPublic {
  /**
   * Fired when the criteria below is matched:
   * - If the component has popover, then this event is triggered when the popover is closed,
   * - If the component can be dismissed, then this event is triggered when the component is dismissed (hide)
   */
  onClose?: VoidFunction | PromiseVoidFunction;

  /**
   * Fired when the criteria below is matched:
   * - If the component has popover, then this event is triggered when the popover is closed,
   * - If the component can be dismissed, then this event is triggered when the component is dismissed (hide)
   */
  '@close'?: VoidFunction | PromiseVoidFunction;
}

export declare type UpdateActiveEventProps = {
  /**
   * Fired when the `active` state of this component is being updated.
   */
  'update:active'?: (value: boolean) => void;
};

export declare interface UpdateActiveEventPublic {
  /**
   * Fired when the `active` state of this component is being updated.
   */
  'onUpdate:active'?: (value: boolean) => void;

  /**
   * Fired when the `active` state of this component is being updated.
   */
  '@update:active'?: (state: boolean) => void;
}

export declare type UpdateOpenEventProps = {
  /**
   * Fired when the component's state is updated.
   */
  'update:open'?: (state: boolean) => void;
};

export declare interface UpdateOpenEventPublic {
  /**
   * Fired when the component's state is updated.
   */
  'onUpdate:open'?: (state: boolean) => void;

  /**
   * Fired when the component's state is updated.
   */
  '@update:open'?: (state: boolean) => void;
}

export declare type UpdateModelValueEventProps<T> = {
  /**
   * Fired when this component's `modelValue` is updated.
   */
  'update:model-value'?: (value: T) => void | Promise<void>;
};

export declare interface UpdateModelValueEventPublic<T> {
  /**
   * Fired when this component's `modelValue` is updated.
   */
  'onUpdate:modelValue'?: (value: T) => void | Promise<void>;

  /**
   * Fired when this component's `modelValue` is updated.
   */
  '@update:model-value'?: (value: T) => void | Promise<void>;
}

export declare interface VoidDefaultSlots {
  /**
   * The default slot used to place main content of the Component.
   */
  default?: () => VNode[] | VNode;
}

export declare interface VNodeContext extends VNode {
  ctx: ComponentInternalInstance;
}

export declare interface ComponentContextInstance extends ComponentInternalInstance {
  ctx: ComponentPublicInstance;
}
