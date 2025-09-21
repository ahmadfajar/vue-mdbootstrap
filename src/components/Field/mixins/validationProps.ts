import { booleanProp, booleanTrueProp, stringProp } from '@/mixins/CommonProps.ts';

export const validationProps = {
  helpText: stringProp,
  persistentHelpOff: booleanProp,
  persistentHelpText: booleanTrueProp,
  validator: {
    type: Object,
    validator: (v: object): boolean =>
      Object.hasOwn(v, 'validators') &&
      Object.hasOwn(v, 'messages') &&
      Object.hasOwn(v, 'hasError'),
  },
};
