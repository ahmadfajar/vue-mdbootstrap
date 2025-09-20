import { iconPosition } from '@/components/Button/mixins/buttonProps';
import { inputProps } from '@/components/Checkbox/mixins/checkboxProps.ts';
import { textFieldProps } from '@/components/Field/mixins/fieldProps';
import { validationProps } from '@/components/Field/mixins/validationProps';
import {
  emptyDataMessage,
  listboxMaxHeight,
  listboxMinSearchChars,
  listboxMinSearchLength,
  notFoundMessage,
} from '@/components/Listbox/mixins/listboxProps';
import { popoverDefaultTransitionProp } from '@/components/Popover/mixins/popoverProps';
import { booleanProp, stringProp, validNumberGtZeroProp } from '@/mixins/CommonProps';
import type { TDataSource, TLabelPosition } from '@/types';
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
  minimumItemsForSearch: validNumberGtZeroProp,
  multiple: booleanProp,
  listboxColor: stringProp,
  listboxMaxHeight: listboxMaxHeight,
  listboxMinWidth: validNumberGtZeroProp,
  listboxSearchLabel: stringProp,
  popoverMaxHeight: validNumberGtZeroProp,
  popoverMinWidth: validNumberGtZeroProp,
  checkboxColor: stringProp,
  checkboxPosition: iconPosition,
  checkOptionColor: stringProp,
  checkOptionPosition: stringProp as Prop<TLabelPosition>,
  chipEnabled: booleanProp,
  chipColor: stringProp,
  chipPill: booleanProp,
  chipOutlined: booleanProp,
  itemSeparator: booleanProp,
  imageSize: validNumberGtZeroProp,
  showImage: booleanProp,
  roundedImage: booleanProp,
  circleImage: booleanProp,
  openOnHover: booleanProp,
  transition: popoverDefaultTransitionProp,
};
