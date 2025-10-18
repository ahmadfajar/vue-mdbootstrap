import { ComponentObjectPropsOptions, ObjectPlugin, VNode } from 'vue';
import { BaseComponentProps, Numberish, TSizeOptionProps } from '../../../types';

export declare type TDividerOptionProps = {
  /**
   * Set to `TRUE` when divider is placed inside element that has dark background color.
   */
  dark?: boolean;

  /**
   * Indentation from left side.
   */
  leftIndent?: Numberish;

  /**
   * Indentation from right side.
   */
  rightIndent?: Numberish;

  /**
   * Divider thickness.
   */
  thickness?: Numberish;
};

export declare type TImageHolderOptionProps = TSizeOptionProps & {
  /**
   * Create this component with circle shape.
   */
  circle?: boolean;

  /**
   * Create this component with rounded shape.
   */
  rounded?: boolean;

  /**
   * This component's background color, must be in hex color format.
   */
  bgColor?: string;

  /**
   * This component's text color, must be in hex color format.
   */
  textColor?: string;

  /**
   * Short text as placeholder.
   */
  placeholderText?: string;

  /**
   * Text placeholder X position.
   */
  xPos?: Numberish;

  /**
   * Text placeholder Y position.
   */
  yPos?: Numberish;
};

export declare type TSpacerOptionProps = {
  /**
   * Sets this component to fill the available space or not.
   */
  fill?: boolean;

  /**
   * Sets this component width.
   */
  width?: Numberish;
};

export declare type TSubheaderOptionProps = {
  /**
   * Define explicitly when placed inside element that has dark background color.
   */
  dark?: boolean;
};

export declare type TBsDivider = ComponentObjectPropsOptions<TDividerOptionProps>;

export declare type TBsImageHolder = ComponentObjectPropsOptions<TImageHolderOptionProps>;

export declare type TBsSpacer = ComponentObjectPropsOptions<TSpacerOptionProps>;

export declare type TBsSubheader = ComponentObjectPropsOptions<TSubheaderOptionProps>;

export declare const BsDivider: {
  new (): {
    $props: BaseComponentProps & TDividerOptionProps;
  };
};

export declare const BsImageHolder: {
  new (): {
    $props: BaseComponentProps & TImageHolderOptionProps;
  };
};

export declare const BsSpacer: {
  new (): {
    $props: BaseComponentProps & TSpacerOptionProps;
  };
};

export declare const BsSubheader: {
  new (): {
    $props: BaseComponentProps & TSubheaderOptionProps;
    $slots: {
      default?: () => VNode[];
    };
  };
};

export declare const BsBasicCmpPlugin: ObjectPlugin;
