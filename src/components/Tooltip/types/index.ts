import type { TPlacementPosition } from '@/components/Tabs/types';
import type { Numberish, TRecord } from '@/types';
import type { VoidDefaultSlots } from '@/types/internals';
import type {
  Component,
  ComponentObjectPropsOptions,
  ComponentOptionsMixin,
  ComponentProvideOptions,
  ComponentPublicInstance,
  ComputedOptions,
  DefineComponent,
  Directive,
  ExtractDefaultPropTypes,
  MethodOptions,
  PublicProps,
  SlotsType,
  VNode,
} from 'vue';

export declare type TTooltipOptionProps = {
  /**
   * HTML element ID, {@link Element} instance or component instance that can trigger
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

// declare interface AllowedTooltipProps extends PublicComponentProps {
//   /**
//    * Fired when this Tooltip state is updated.
//    */
//   'onUpdate:show'?: (value: boolean) => void;
//
//   /**
//    * Fired when this Tooltip state is updated.
//    */
//   '@update:show'?: (value: boolean) => void;
// }

// export declare const BsTooltip: {
//   new (): {
//     $props: AllowedTooltipProps & TTooltipOptionProps;
//     $slots: {
//       default?: () => VNode[];
//       content?: () => VNode[];
//     };
//     $emits: {
//       (event: 'update:show', value: boolean): boolean;
//     };
//   };
// };

export declare type TooltipEventProps = {
  /**
   * Fired when this Tooltip state is updated.
   */
  'update:show'?: (value: boolean) => void;
};

export declare interface TooltipEventPublic {
  /**
   * Fired when this Tooltip state is updated.
   */
  'onUpdate:show'?: (value: boolean) => void;

  /**
   * Fired when this Tooltip state is updated.
   */
  '@update:show'?: (value: boolean) => void;
}

export declare interface TooltipSlots extends VoidDefaultSlots {
  /**
   * Additional slot used to place the Tooltip's custom content.
   */
  content?: () => VNode[] | VNode;
}

export declare type BsTooltip = DefineComponent<
  TBsTooltip,
  TRecord,
  TRecord,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  TooltipEventProps,
  string,
  PublicProps,
  Readonly<TTooltipOptionProps> & Readonly<TooltipEventPublic>,
  ExtractDefaultPropTypes<TBsTooltip>,
  SlotsType<TooltipSlots>,
  Record<string, Component>,
  Record<string, Directive>,
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;
