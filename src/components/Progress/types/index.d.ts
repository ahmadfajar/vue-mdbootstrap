import { ComponentObjectPropsOptions, ObjectPlugin } from 'vue';
import { BaseComponentProps, Numberish, TContextColor } from '../../../types';

export declare type TProgressControlMode = 'determinate' | 'indeterminate' | 'buffer';

export declare type TProgressControlVariant = 'spinner' | 'bar';

export declare type TProgressBarLabelPosition = 'start' | 'end' | 'top' | 'bottom';

export declare type TProgressBarValuePosition = 'start' | 'end' | 'top' | 'bottom' | 'inside';

export declare type TTextLabelAlignment = 'start' | 'end' | 'center';

export declare type TMaskLoaderVariant = 'linear' | 'linear-alt' | 'progress' | 'spinner' | 'grow';

export declare type TMaskLoaderOptionProps = {
  /**
   * Sets the inline css-style `position` property. If `true` then the inline
   * css-style `position` property is set to `fixed`.
   */
  fixedPosition?: boolean;

  /**
   * Mask loader state, show or hide.
   */
  show?: boolean;

  /**
   * Backdrop overlay opacity value.
   */
  overlayOpacity?: Numberish;

  /**
   * Backdrop overlay color.
   */
  overlayColor?: string;

  /**
   * Mask loader spinner color.
   */
  spinnerColor?: string;

  /**
   * Mask loader spinner diameter.
   */
  spinnerDiameter?: Numberish;

  /**
   * Mask loader spinner thickness.
   */
  spinnerThickness?: Numberish;

  /**
   * Mask loader type variant.
   */
  type?: TMaskLoaderVariant;

  /**
   * The animation transition to be used when displaying the mask loader.
   */
  transition?: string;

  /**
   * Sets the css style `z-index` value.
   */
  zIndex?: Numberish;
};

export declare type TSpinLoaderOptionProps = {
  /**
   * HTML tag name to be used to create this component.
   */
  tag?: 'span' | 'div';

  /**
   * Component size. Numbers get converted to pixel. Any other value must
   * include the units (such as `px`, `em`, or `rem`).
   */
  size?: Numberish;

  /**
   * Component border thickness. Numbers get converted to pixel.
   * Any other value must include the units (such as `px`, `em`, or `rem`).
   */
  thickness?: Numberish;
};

export declare type TProgressOptionProps = {
  /**
   * ProgressBar buffer length.
   */
  buffer?: Numberish;

  /**
   * The component color appearance.
   */
  color?: TContextColor | string;

  /**
   * Spinner diameter value.
   */
  diameter?: Numberish;

  /**
   * ProgressBar thickness.
   */
  height?: Numberish;

  /**
   * Spinner thickness.
   */
  stroke?: Numberish;

  /**
   * The value monitored by `v-model` to control the progress value.
   */
  modelValue?: number;

  /**
   * ProgressControl mode, valid values are: `determinate`, `indeterminate`, `buffer`.
   */
  mode?: TProgressControlMode;

  /**
   * ProgressControl type, valid values are: `spinner`, `bar`.
   */
  type?: TProgressControlVariant;
};

export declare type TProgressBarOptionProps = {
  /**
   * The control bar color appearance.
   */
  color?: TContextColor | string;

  /**
   * The ProgressBar thickness.
   */
  height?: Numberish;

  /**
   * Optional, control bar css classes.
   */
  innerCls?: string;

  /**
   * The ProgressBar text label.
   */
  label?: string;

  /**
   * The ProgressBar text label alignment.
   */
  labelAlignment?: TTextLabelAlignment;

  /**
   * The ProgressBar label position.
   */
  labelPosition?: TProgressBarLabelPosition;

  /**
   * The value monitored by `v-model` to control the progress bar value.
   */
  modelValue?: number;

  /**
   * Remove the rounded side border of the progress bar.
   */
  roundedOff?: boolean;

  /**
   * Create striped progress bar.
   */
  striped?: boolean;

  /**
   * Create animated stripe progress bar.
   */
  stripedAnimation?: boolean;

  /**
   * Display progress bar's text value.
   */
  showValue?: boolean;

  /**
   * Progress bar's text value position.
   */
  valuePosition?: TProgressBarValuePosition;
};

export declare type TBsMaskLoader = ComponentObjectPropsOptions<TMaskLoaderOptionProps>;

export declare type TBsSpinLoader = ComponentObjectPropsOptions<TSpinLoaderOptionProps>;

export declare type TBsProgress = ComponentObjectPropsOptions<TProgressOptionProps>;

export declare type TBsProgressBar = ComponentObjectPropsOptions<TProgressBarOptionProps>;

export declare const BsMaskLoader: {
  new (): {
    $props: BaseComponentProps & TMaskLoaderOptionProps;
  };
};

export declare const BsSpinLoader: {
  new (): {
    $props: BaseComponentProps & TSpinLoaderOptionProps;
  };
};

export declare const BsProgress: {
  new (): {
    $props: BaseComponentProps & TProgressOptionProps;
  };
};

export declare const BsProgressBar: {
  new (): {
    $props: BaseComponentProps & TProgressBarOptionProps;
  };
};

export declare const BsProgressPlugin: ObjectPlugin;
