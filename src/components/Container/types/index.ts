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

export declare type TAppContainerOptionProps = {
  /**
   * Sets the element `ID` attribute. This property value is auto generate.
   */
  id?: string;

  /**
   * Use document viewport height or not.
   */
  viewportHeight?: boolean;
};

export declare type TContainerOptionProps = {
  /**
   * Mount this component as part of application container or just ordinary container.
   * If mount as part of application container, then it will adapt to `SideDrawer` and `Appbar` size.
   */
  app?: boolean;

  /**
   * Html tag used to render this component.
   */
  tag?: HtmlTagName | string;
};

export declare type TBsAppContainer = ComponentObjectPropsOptions<TAppContainerOptionProps>;

export declare type TBsContainer = ComponentObjectPropsOptions<TContainerOptionProps>;

export declare type TBsContent = ComponentObjectPropsOptions<TContainerOptionProps>;

// export declare interface AllowedContainerProps extends PublicComponentProps {
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
// declare const BsApp: {
//   new (): {
//     $props: PublicComponentProps & TAppContainerOptionProps;
//     $slots: {
//       default?: () => VNode[];
//     };
//   };
// }
//
// export declare const BsContainer: {
//   new (): {
//     $props: AllowedContainerProps & TContainerOptionProps;
//     $slots: {
//       default?: () => VNode[];
//     };
//     $emits: {
//       (event: 'resize', target: HTMLElement): void;
//     };
//   };
// };
//
// export declare const BsContent: {
//   new (): {
//     $props: PublicComponentProps & TContainerOptionProps;
//     $slots: {
//       default?: () => VNode[];
//     };
//   };
// };

export declare type BsApp = DefineComponent<
  TBsAppContainer,
  TRecord,
  TRecord,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  EmitsOptions,
  string,
  PublicProps,
  Readonly<TAppContainerOptionProps>,
  ExtractDefaultPropTypes<TBsAppContainer>,
  SlotsType<VoidDefaultSlots>,
  Record<string, Component>,
  Record<string, Directive>,
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;

export declare type ContainerEventProps = {
  /**
   * Fired when this component size is changed.
   */
  resize?: (target: HTMLElement) => void;
};

export declare interface ContainerEventPublic {
  /**
   * Fired when this component size is changed.
   */
  onResize?: (target: HTMLElement) => void;

  /**
   * Fired when this component size is changed.
   */
  '@resize'?: (target: HTMLElement) => void;
}

export declare type BsContainer = DefineComponent<
  TBsContainer,
  TRecord,
  TRecord,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  ContainerEventProps,
  string,
  PublicProps,
  Readonly<TContainerOptionProps> & Readonly<ContainerEventPublic>,
  ExtractDefaultPropTypes<TBsContainer>,
  SlotsType<VoidDefaultSlots>,
  Record<string, Component>,
  Record<string, Directive>,
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;

export declare type BsContent = DefineComponent<
  TBsContent,
  TRecord,
  TRecord,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  EmitsOptions,
  string,
  PublicProps,
  Readonly<TContainerOptionProps>,
  ExtractDefaultPropTypes<TBsContainer>,
  SlotsType<VoidDefaultSlots>,
  Record<string, Component>,
  Record<string, Directive>,
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;
