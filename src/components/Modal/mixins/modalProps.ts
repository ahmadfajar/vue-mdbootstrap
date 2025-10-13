import { popoverBaseProps } from '@/components/Popover/mixins/popoverProps.ts';
import {
  booleanProp,
  booleanTrueProp,
  stringOrArrayProp,
  stringProp,
  validStringOrNumberProp,
} from '@/mixins/CommonProps.ts';

export const modalProps = {
  ...popoverBaseProps,
  fullPage: booleanProp,
  scrollable: booleanProp,
  overlay: booleanTrueProp,
  title: stringProp,
  width: validStringOrNumberProp,
  maxWidth: validStringOrNumberProp,
  bodyClass: stringOrArrayProp,
  footerClass: stringOrArrayProp,
  headerClass: stringOrArrayProp,
  transition: {
    type: String,
    default: 'scale',
    validator: (v: string) =>
      ['slide-top', 'slide-bottom', 'slide-left', 'slide-right', 'fade', 'scale'].includes(v),
  },
};
