import { useSizeHeight, useSizeWidth } from '@/components/Icon/mixins/iconApi.ts';
import { iconProps, iconSizeObjectProp } from '@/components/Icon/mixins/iconProps.ts';
import type { TBsIcon, TBsSvgIcon, TIconOptionProps } from '@/components/Icon/types';
import { cssPrefix } from '@/mixins/CommonApi.ts';
import { booleanProp, stringArrayOrObjectProp } from '@/mixins/CommonProps.ts';
import type { Numberish, TRecord } from '@/types';
import Helper from '@/utils/Helper.ts';
import { computed, defineComponent, h, type Prop } from 'vue';
import BsSvgIcon from './BsSvgIcon.ts';

export default defineComponent<TBsIcon>({
  name: 'BsIcon',
  props: {
    filled: booleanProp,
    size: iconSizeObjectProp,
    svgClass: stringArrayOrObjectProp,
    ...iconProps,
  },
  setup(props) {
    const thisProps = props as Readonly<TIconOptionProps>;
    const szHeight = useSizeHeight(thisProps);
    const szWidth = useSizeWidth(thisProps);
    const styles = computed<TRecord>(() => ({
      width: Helper.cssUnit(szWidth),
      height: Helper.cssUnit(szHeight),
    }));

    return () =>
      h(
        'span',
        {
          class: [`${cssPrefix}icon`],
          style: styles.value,
        },
        h<TBsSvgIcon>(BsSvgIcon, {
          class: thisProps.svgClass,
          icon: props.icon,
          filled: props.filled,
          height: szHeight as Prop<Numberish>,
          width: szWidth as Prop<Numberish>,
          spin: props.spin,
          pulse: props.pulse,
          flip: props.flip,
          rotate: props.rotate,
        })
      );
  },
});
