import { iconPosition } from '@/components/Button/mixins/buttonProps.ts';
import type { TDataSource } from '@/components/Combobox/types';
import {
  booleanProp,
  booleanTrueProp,
  stringProp,
  validNumberGtZeroProp,
} from '@/mixins/CommonProps.ts';
import type { Prop } from 'vue';

export const listboxMinSearchChars = {
  type: [String, Number],
  default: 2,
  validator: (value: string) => parseInt(value, 10) > 0,
};

export const listboxMinSearchLength = {
  type: [String, Number],
  default: 15,
  validator: (value: string) => parseInt(value, 10) > 0,
};

export const listboxMaxHeight = {
  type: [String, Number],
  default: 300,
  validator: (value: string) => parseInt(value, 10) > 0,
};

export const emptyDataMessage = {
  type: String,
  default: 'No data to display.',
};

export const notFoundMessage = {
  type: String,
  default: 'Data not found.',
};

export const listboxProps = {
  autoload: booleanTrueProp,
  borderless: booleanProp,
  color: stringProp,
  disabled: booleanProp,
  readonly: booleanProp,
  itemSeparator: booleanProp,
  maxHeight: listboxMaxHeight,
  modelValue: {
    type: [String, Number, Array],
    default: undefined,
  },
  multiple: booleanProp,
  searchLabel: {
    type: String,
    default: 'Search...',
  },
  searchText: stringProp,
  dataSource: {
    type: Object,
    default: undefined,
  } as Prop<TDataSource>,
  emptyDataMessage: emptyDataMessage,
  notFoundMessage: notFoundMessage,
  minSearchChars: listboxMinSearchChars,
  minSearchLength: listboxMinSearchLength,
  useCheckbox: booleanProp,
  checkboxColor: stringProp,
  checkboxPosition: iconPosition,
  imageSize: validNumberGtZeroProp,
  showImage: booleanProp,
  roundedImage: booleanProp,
  circleImage: booleanProp,
};
