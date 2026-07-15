import type { HtmlTagName, TRecord } from '@/types';
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

export declare type TAppbarOptionProps = {
  /**
   * Cut off the left side of the component.
   */
  clippedLeft?: boolean;

  /**
   * Cut off the right side of the component.
   */
  clippedRight?: boolean;

  /**
   * Placed `Appbar` fixed at the top of the page.
   * See [Bootstrap Position](https://getbootstrap.com/docs/5.3/helpers/position/) documentation.
   */
  fixedTop?: boolean;

  /**
   * Always stick `Appbar` at top of the page.
   * See [Bootstrap Position](https://getbootstrap.com/docs/5.3/helpers/position/) documentation.
   */
  stickyTop?: boolean;

  /**
   * Add shadow effect to this component.
   */
  shadow?: boolean;

  /**
   * Html tag used to render this component.
   */
  tag?: HtmlTagName | string;
};

export declare type TAppbarTitleOptionProps = {
  /**
   * The text to display.
   */
  title?: string;
};

export declare type TBsAppbar = ComponentObjectPropsOptions<TAppbarOptionProps>;

export declare type TBsAppbarTitle = ComponentObjectPropsOptions<TAppbarTitleOptionProps>;

// declare interface AllowedAppbarProps extends PublicComponentProps {
//   /**
//    * Fired when this component size is changed.
//    */
//   onResize?: (target: HTMLElement) => void;
//
//   /**
//    * Fired when this component size is changed.
//    */
//   '@resize'?: (target: HTMLElement) => void;
// }
//
// export declare const BsAppbar: {
//   new (): {
//     $props: AllowedAppbarProps & TAppbarOptionProps;
//     $slots: {
//       default?: () => VNode[];
//     };
//     $emits: {
//       (event: 'resize', target: HTMLElement): void;
//     };
//   };
// };
//
// export declare const BsAppbarItems: {
//   new (): {
//     $props: PublicComponentProps;
//     $slots: {
//       default?: () => VNode[];
//     };
//   };
// };
//
// export declare const BsAppbarTitle: {
//   new (): {
//     $props: PublicComponentProps & TAppbarTitleOptionProps;
//     $slots: {
//       default?: () => VNode[];
//     };
//   };
// };

export declare type AppbarEventProps = {
  /**
   * Fired when the Appbar is resized.
   */
  resize?: (target: HTMLElement) => void;
};

export declare interface AppbarEventPublic {
  /**
   * Fired when the Appbar is resized.
   */
  onResize?: (target: HTMLElement) => void;

  /**
   * Fired when the Appbar is resized.
   */
  '@resize'?: (target: HTMLElement) => void;
}

export declare type BsAppbar = DefineComponent<
  TBsAppbar,
  TRecord,
  TRecord,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  AppbarEventProps,
  string,
  PublicProps,
  Readonly<TAppbarOptionProps> & Readonly<AppbarEventPublic>,
  ExtractDefaultPropTypes<TBsAppbar>,
  SlotsType<VoidDefaultSlots>,
  Record<string, Component>,
  Record<string, Directive>,
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;

export declare type BsAppbarItems = DefineComponent<
  TRecord,
  TRecord,
  TRecord,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  EmitsOptions,
  string,
  PublicProps,
  Readonly<TRecord>,
  ExtractDefaultPropTypes<TRecord>,
  SlotsType<VoidDefaultSlots>,
  Record<string, Component>,
  Record<string, Directive>,
  string,
  ComponentProvideOptions,
  true,
  TRecord,
  never
>;

export declare type BsAppbarTitle = DefineComponent<
  TBsAppbarTitle,
  TRecord,
  TRecord,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  EmitsOptions,
  string,
  PublicProps,
  Readonly<TAppbarTitleOptionProps>,
  ExtractDefaultPropTypes<TBsAppbarTitle>,
  SlotsType<VoidDefaultSlots>,
  Record<string, Component>,
  Record<string, Directive>,
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;
