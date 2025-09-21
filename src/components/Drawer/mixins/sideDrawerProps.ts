import { booleanProp, booleanTrueProp, stringProp } from '@/mixins/CommonProps.ts';
import type { TSideDrawerPosition } from '@/types';
import type { Prop } from 'vue';

export const sideDrawerProps = {
  color: stringProp,
  clipped: booleanProp,
  mini: booleanProp,
  fixedLayout: booleanProp,
  miniWidth: {
    type: [Number, String],
    default: 56,
    validator: (value: string): boolean => !isNaN(parseInt(value, 10)),
  },
  modalWidth: {
    type: [Number, String],
    default: 300,
    validator: (value: string): boolean => !isNaN(parseInt(value, 10)),
  },
  open: booleanTrueProp,
  overlayColor: {
    type: String,
    default: '#000',
  },
  position: {
    type: String,
    default: 'left',
    validator: (value: string): boolean => ['left', 'right'].includes(value),
  } as Prop<TSideDrawerPosition>,
  shadow: booleanProp,
  tag: {
    type: String,
    default: 'aside',
  },
  width: {
    type: [Number, String],
    default: 250,
    validator: (value: string): boolean => !isNaN(parseInt(value, 10)),
  },
};
