import { inputProps } from '@/components/Checkbox/mixins/checkboxProps.ts';
import { booleanProp, defaultColorProp, stringOrArrayProp } from '@/mixins/CommonProps.ts';

export const switchProps = {
  ...inputProps,
  color: defaultColorProp,
  labelClass: stringOrArrayProp,
  labelPosition: {
    type: String,
    default: 'right',
    validator: (value: string) => ['left', 'right'].includes(value),
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value: string) => ['default', 'inset', 'inset-outlined'].includes(value),
  },
  insetMode: booleanProp,
  insetOutlined: booleanProp,
  checkoffIcon: booleanProp,
  checkedIcon: booleanProp,
  value: {
    type: [String, Number, Boolean, Object],
    default: undefined,
    required: true,
  },
  modelValue: {
    type: [String, Number, Boolean, Object],
    default: undefined,
  },
};
