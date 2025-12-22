import { cssPrefix } from '@/mixins/CommonApi';
import { stringOrNumberProp } from '@/mixins/CommonProps';
import Helper from '@/utils/Helper';
import { defineComponent, h } from 'vue';
import type { TBsSpinLoader, TSpinLoaderOptionProps } from './types';

export default defineComponent<TBsSpinLoader>({
  name: 'BsSpinLoader',
  props: {
    size: stringOrNumberProp,
    thickness: stringOrNumberProp,
  },
  setup(props) {
    const thisProps = props as Readonly<TSpinLoaderOptionProps>;

    return () =>
      h('div', {
        class: [`${cssPrefix}spinner-border`],
        style:
          thisProps.size || thisProps.thickness
            ? {
                [`--${cssPrefix}spinner-width`]: Helper.cssUnit(thisProps.size),
                [`--${cssPrefix}spinner-height`]: Helper.cssUnit(thisProps.size),
                [`--${cssPrefix}spinner-border-width`]: Helper.cssUnit(thisProps.thickness),
              }
            : undefined,
      });
  },
});
