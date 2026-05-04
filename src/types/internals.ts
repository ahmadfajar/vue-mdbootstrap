import type { TRecord } from '@/types/index.ts';
import type {
  AllowedComponentProps,
  ComponentCustomProps,
  ComponentInternalInstance,
  ComponentPublicInstance,
  VNode,
  VNodeProps,
} from 'vue';

export declare type RawProps = VNodeProps & TRecord;

export declare type PublicComponentProps = AllowedComponentProps &
  VNodeProps &
  ComponentCustomProps;

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
   * Fired when this component is closed or dismissed (hide).
   */
  close?: (msg: string) => void;
};

export declare interface ClosableEventPublic {
  /**
   * Fired when this component is closed or dismissed (hide).
   */
  onClose?: (msg: string) => void;

  /**
   * Fired when this component is closed or dismissed (hide).
   */
  '@close'?: (msg: string) => void;
}

export declare type ClosableVoidEventProps = {
  /**
   * Fired when this component is closed or dismissed (hide).
   */
  close?: VoidFunction;
};

export declare interface ClosableVoidEventPublic {
  /**
   * Fired when this component is closed or dismissed (hide).
   */
  onClose?: VoidFunction;

  /**
   * Fired when this component is closed or dismissed (hide).
   */
  '@close'?: VoidFunction;
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
  'update:model-value'?: (value: T) => void;
};

export declare interface UpdateModelValueEventPublic<T> {
  /**
   * Fired when this component's `modelValue` is updated.
   */
  'onUpdate:modelValue'?: (value: T) => void;

  /**
   * Fired when this component's `modelValue` is updated.
   */
  '@update:model-value'?: (value: T) => void;
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

// /**
//  * Create Vue application then registers all VueMDB components and directives.
//  *
//  * @param rootComponent Root of component instance
//  */
// export declare function createVueMdb(rootComponent: Component): App;
//
// export {
//   EventListener,
//   useAddResizeListener,
//   useRemoveResizeListener,
// } from '../mixins/types/DomHelper';
// export * from '../model/types';
// export * from '../utils/types/AxiosPlugin';
// export * from '../utils/types/CacheManager';
// export * as Color from '../utils/types/colorUtils';
// export { default as Helper } from '../utils/types/Helper';
// export * as StringHelper from '../utils/types/StringHelper';
//
// export {
//   useAxiosPlugin,
//   useBreakpointMax,
//   useBreakpointMin,
//   useCurrentRoute,
//   useGenerateId,
//   useHttpService,
//   useMergeClass,
//   useMobileDevice,
//   useRenderSlot,
//   useRenderTransition,
//   useVueMdbNotification,
//   useVueMdbService,
//   useWrapSlot,
//   useWrapSlotDefault,
//   useWrapSlotWithCondition,
// } from '../mixins/types/CommonApi';
