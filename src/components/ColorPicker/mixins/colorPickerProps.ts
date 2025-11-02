import type { TColorPickerMode } from '@/components/ColorPicker/types';
import {
  popoverDefaultTransitionProp,
  popoverPlacementProp,
} from '@/components/Popover/mixins/popoverProps.ts';
import {
  booleanProp,
  stringOrArrayProp,
  stringProp,
  validStringOrNumberProp,
} from '@/mixins/CommonProps.ts';
import type { Prop } from 'vue';

export const colorPickerProps = {
  activator: {
    type: [String, Object],
    default: undefined,
  } as Prop<string | Element>,
  containerColor: stringProp,
  cover: booleanProp,
  open: booleanProp,
  hideAlpha: booleanProp,
  hideInputs: booleanProp,
  hideModeButton: booleanProp,
  modeButtonOutlined: booleanProp,
  modeButtonColor: {
    type: String,
    default: 'secondary',
  },
  modeButtonToggleColor: stringProp,
  inputLabelClass: stringOrArrayProp,
  mode: {
    type: String,
    default: 'HEX',
    validator: (v: string) => ['RGB', 'HSL', 'HEX'].includes(v),
  } as Prop<TColorPickerMode>,
  modelValue: stringProp,
  placement: popoverPlacementProp,
  space: validStringOrNumberProp,
  transition: popoverDefaultTransitionProp,
  swatches: {
    type: Array,
    default: undefined,
  },
  swatchesMaxHeight: {
    type: [String, Number],
    default: 80,
  },
};
