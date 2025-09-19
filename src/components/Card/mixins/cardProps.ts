import type { TCardContentType } from '@/components/Card/types';
import { booleanProp, stringMandatoryProp, stringProp, tagProp } from '@/mixins/CommonProps.ts';
import type { Prop } from 'vue';

export const cardProps = {
  tag: tagProp,
  borderOff: booleanProp,
  roundedOff: booleanProp,
  shadow: booleanProp,
  imgTopSrc: stringProp,
  imgTopAlt: stringProp,
  imgBottomSrc: stringProp,
  imgBottomAlt: stringProp,
};

export const cardContentProps = {
  tag: stringProp,
  type: {
    type: String,
    default: 'text',
    validator: (value: string): boolean => ['title', 'subtitle', 'text'].includes(value),
  } as Prop<TCardContentType>,
};

export const cardMediaProps = {
  title: stringMandatoryProp,
  subtitle: stringProp,
  overlayTop: booleanProp,
};
