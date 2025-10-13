import { booleanProp, booleanTrueProp, stringOrArrayProp } from '@/mixins/CommonProps.ts';
import type { TImageDataset, TLightboxToolbarItems, TRecord, TTransitionMode } from '@/types';
import type { Prop } from 'vue';

export const lightboxProps = {
  imageClass: stringOrArrayProp,
  imageStyles: {
    type: Object,
    default: undefined,
  } as Prop<TRecord>,
  items: {
    type: Array,
    default: undefined,
  } as Prop<TImageDataset[]>,
  open: booleanProp,
  escClose: booleanTrueProp,
  overlay: booleanTrueProp,
  overlayClickClose: booleanTrueProp,
  showCounter: booleanTrueProp,
  showItemTitle: booleanTrueProp,
  showThumbnail: booleanTrueProp,
  showToolbar: booleanTrueProp,
  showNavControl: booleanTrueProp,
  thumbnailHeight: {
    type: Number,
    default: 72,
    validator: (v: string): boolean => parseInt(v, 10) > 0,
  },
  toolbar: {
    type: Object,
    default: () => ({
      download: false,
      zoom: true,
      rotate: true,
      info: true,
      delete: false,
      menubar: false,
      close: true,
    }),
  } as Prop<TLightboxToolbarItems>,
  transition: {
    type: String,
    default: 'slide-top-bottom',
  },
  transitionMode: {
    type: String,
    default: undefined,
    validator: (v: string) => ['out-in', 'in-out'].includes(v),
  } as Prop<TTransitionMode>,
  zIndex: {
    type: [String, Number],
    default: 1990,
    validator: (v: string): boolean => !isNaN(parseInt(v, 10)),
  },
};
