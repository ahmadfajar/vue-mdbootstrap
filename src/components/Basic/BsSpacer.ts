import type { TBsSpacer, TSpacerOptionProps } from '@/components/Basic/types';
import { useWrapSlotDefault } from '@/mixins/CommonApi.ts';
import { booleanTrueProp, validStringOrNumberProp } from '@/mixins/CommonProps.ts';
import Helper from '@/utils/Helper';
import { defineComponent } from 'vue';

export default defineComponent<TBsSpacer>({
  name: 'BsSpacer',
  props: {
    fill: booleanTrueProp,
    width: validStringOrNumberProp,
  },
  setup(props) {
    const thisProps = props as Readonly<TSpacerOptionProps>;

    return () =>
      useWrapSlotDefault(
        'div',
        undefined,
        { 'flex-grow-1': thisProps.fill && !thisProps.width },
        { width: thisProps.width ? Helper.cssUnit(thisProps.width) : undefined }
      );
  },
});
