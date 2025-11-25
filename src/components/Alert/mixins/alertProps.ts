import type { TAlertVariant } from '@/components/Alert/types';
import { iconBaseProps } from '@/components/Avatar/mixins/avatarProps.ts';
import {
  booleanProp,
  booleanTrueProp,
  defaultTransitionProp,
  stringProp,
} from '@/mixins/CommonProps';
import type { Prop } from 'vue';

const alertVariant = {
  type: String,
  default: undefined,
  validator: (value: string): boolean =>
    ['success', 'info', 'warning', 'danger', 'help'].includes(value),
} as Prop<TAlertVariant>;

export const alertProps = {
  color: stringProp,
  dismissible: booleanProp,
  variant: alertVariant,
  outlined: booleanProp,
  filled: booleanProp,
  transition: defaultTransitionProp,
  modelValue: booleanTrueProp,
  closeButtonColor: stringProp,
  ...iconBaseProps,
};
