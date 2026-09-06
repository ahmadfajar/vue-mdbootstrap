import type { TRadioOptionProps } from '@/components/Radio/types';
import type { Numberish, TRecord } from '@/types';
import type {
  UpdateModelValueEventProps,
  UpdateModelValueEventPublic,
  VoidDefaultSlots,
} from '@/types/internals';
import type {
  Component,
  ComponentObjectPropsOptions,
  ComponentOptionsMixin,
  ComponentProvideOptions,
  ComputedOptions,
  DefineComponent,
  Directive,
  ExtractDefaultPropTypes,
  MethodOptions,
  PublicProps,
  SlotsType,
} from 'vue';

export declare type TLabelPosition = 'left' | 'right';

export declare type TSwitchVariant = 'default' | 'inset' | 'outline-inset';

export declare type TSwitchOptionProps = TRadioOptionProps & {
  /**
   * Additional CSS class for the text label.
   */
  labelClass?: string | string[];

  /**
   * The switch text label position, valid values are: `left`, `right`.
   */
  labelPosition?: TLabelPosition;

  /**
   * Sets the switch style appearance. Valid values are: `default`, `inset`, `outline-inset`.
   *
   * @see [Switch Material Design](https://m3.material.io/components/switch/overview)
   */
  variant?: TSwitchVariant;

  /**
   * Sets the switch style appearance to **Inset style**.
   *
   * @deprecated Use `variant` instead.
   */
  insetMode?: boolean;

  /**
   * Sets the switch style appearance to **Inset Outlined style**.
   *
   * @deprecated Use `variant` instead.
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

export declare type SwitchEventProps = UpdateModelValueEventProps<Numberish | boolean> & {
  /**
   * Fired when this Switch component's checked state is changed.
   */
  checked?: (checked: boolean) => void;
};

export declare interface SwitchEventPublic extends UpdateModelValueEventPublic<
  Numberish | boolean
> {
  /**
   * Fired when this Switch component's checked state is changed.
   */
  onChecked?: (checked: boolean) => void;

  /**
   * Fired when this Switch component's checked state is changed.
   */
  '@checked'?: (checked: boolean) => void;
}

export declare type BsSwitchConstructor = DefineComponent<
  TBsSwitch,
  TRecord,
  TRecord,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  SwitchEventProps,
  string,
  PublicProps,
  Readonly<TSwitchOptionProps> & Readonly<SwitchEventPublic>,
  ExtractDefaultPropTypes<TBsSwitch>,
  SlotsType<VoidDefaultSlots>,
  Record<string, Component>,
  Record<string, Directive>,
  string,
  ComponentProvideOptions,
  true,
  TRecord,
  never
>;

export declare const BsSwitch: {
  new (): {
    $props: TSwitchOptionProps & SwitchEventPublic & PublicProps;
    $slots: VoidDefaultSlots;
    $emit: SwitchEventProps;
  };
};
