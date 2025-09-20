import { inputProps } from '@/components/Checkbox/mixins/checkboxProps.ts';
import { defaultColorProp } from '@/mixins/CommonProps.ts';

export const radioProps = {
  ...inputProps,
  color: defaultColorProp,
  value: {
    type: [String, Number, Boolean, Object],
    default: 'on',
  },
  modelValue: {
    type: [String, Number, Boolean, Object],
    default: undefined,
  },
};

export const radioGroupProps = {
  color: defaultColorProp,
  column: {
    type: [String, Number],
    default: undefined,
    validator: (value: string): boolean => {
      const pVal = parseInt(value, 10);
      return pVal > 0 && pVal < 7;
    },
  },
  items: {
    type: Array,
    default: undefined,
    required: true,
  },
  modelValue: {
    type: [String, Number, Boolean, Object],
    default: undefined,
  },
};
