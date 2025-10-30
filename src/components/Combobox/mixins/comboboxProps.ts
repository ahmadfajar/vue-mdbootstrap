import { iconPosition } from '@/components/Button/mixins/buttonProps.ts';
import { inputProps } from '@/components/Checkbox/mixins/checkboxProps.ts';
import {
  emptyDataMessage,
  listboxMaxHeight,
  listboxMinSearchChars,
  listboxMinSearchLength,
  notFoundMessage,
} from '@/components/Combobox/mixins/listboxProps.ts';
import { textFieldProps } from '@/components/Field/mixins/fieldProps.ts';
import { validationProps } from '@/components/Field/mixins/validationProps.ts';
import { popoverDefaultTransitionProp } from '@/components/Popover/mixins/popoverProps.ts';
import { booleanProp, stringProp, validNumberGtZeroProp } from '@/mixins/CommonProps.ts';
import type { TDataSource } from '@/types';
import type { Prop } from 'vue';

export const comboboxProps = {
  ...inputProps,
  ...textFieldProps,
  ...validationProps,
  autofocus: booleanProp,
  placeholder: stringProp,
  parentValue: {
    type: [String, Number],
    default: undefined,
  },
  modelValue: {
    type: [String, Number, Array],
    default: undefined,
  },
  dataSource: {
    type: Object,
    default: undefined,
  } as Prop<TDataSource>,
  emptyDataMessage: emptyDataMessage,
  notFoundMessage: notFoundMessage,
  minSearchChars: listboxMinSearchChars,
  minSearchLength: listboxMinSearchLength,
  multiple: booleanProp,
  listboxColor: stringProp,
  listboxMaxHeight: listboxMaxHeight,
  listboxMinWidth: validNumberGtZeroProp,
  listboxSearchLabel: stringProp,
  checkboxColor: stringProp,
  checkboxPosition: iconPosition,
  chipEnabled: booleanProp,
  chipColor: stringProp,
  chipPill: booleanProp,
  chipOutlined: booleanProp,
  itemSeparator: booleanProp,
  itemSeparatorDark: booleanProp,
  imageSize: validNumberGtZeroProp,
  showImage: booleanProp,
  roundedImage: booleanProp,
  circleImage: booleanProp,
  openOnHover: booleanProp,
  transition: popoverDefaultTransitionProp,
};
