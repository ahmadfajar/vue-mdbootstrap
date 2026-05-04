/* eslint-disable @typescript-eslint/no-empty-object-type */
import BsSvgIcon from '@/components/Icon/BsSvgIcon.ts';
import { useSizeHeight, useSizeWidth } from '@/components/Icon/mixins/iconApi.ts';
import { iconProps, iconSizeObjectProp } from '@/components/Icon/mixins/iconProps.ts';
import type { TBsIcon, TIconOptionProps } from '@/components/Icon/types';
import { cssPrefix } from '@/mixins/CommonApi.ts';
import { booleanProp, stringArrayOrObjectProp } from '@/mixins/CommonProps.ts';
import type { Numberish, TRecord } from '@/types';
import Helper from '@/utils/Helper.ts';
import type {
  ComponentOptionsMixin,
  ComponentProvideOptions,
  ComputedOptions,
  DefineComponent,
  ExtractDefaultPropTypes,
  MethodOptions,
  PublicProps,
} from 'vue';
import { computed, defineComponent, h } from 'vue';

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
          class: [`${cssPrefix}icon`, 'items-center', 'justify-center'],
          style: styles.value,
        },
        h(BsSvgIcon, {
          class: thisProps.svgClass as never,
          icon: thisProps.icon,
          filled: thisProps.filled,
          height: szHeight as Numberish,
          width: szWidth as Numberish,
          spin: thisProps.spin,
          pulse: thisProps.pulse,
          flip: thisProps.flip,
          rotate: thisProps.rotate,
        })
      );
  },
}) as DefineComponent<
  TBsIcon,
  {},
  {},
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  {},
  string,
  PublicProps,
  Readonly<TIconOptionProps> & Readonly<{}>,
  ExtractDefaultPropTypes<TBsIcon>,
  {},
  {},
  {},
  string,
  ComponentProvideOptions,
  false,
  never
>;
