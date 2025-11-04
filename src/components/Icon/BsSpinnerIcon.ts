import { iconSpinnerProps } from '@/components/Icon/mixins/iconProps.ts';
import {
  spinnerSvgData,
  useCircleSizeStyles,
  useCreateSvgNode,
} from '@/components/Icon/mixins/svgApi.ts';
import type { TBsSpinnerIcon, TSpinnerIconOptionProps } from '@/components/Icon/types';
import { cssPrefix } from '@/mixins/CommonApi.ts';
import { defineComponent, h } from 'vue';

export default defineComponent<TBsSpinnerIcon>({
  name: 'BsSpinnerIcon',
  props: iconSpinnerProps,
  setup(props) {
    const thisProps = props as Readonly<TSpinnerIconOptionProps>;

    return () =>
      useCreateSvgNode(
        [
          `${cssPrefix}svg-inline`,
          thisProps.spin ? `${cssPrefix}spin` : thisProps.pulse ? `${cssPrefix}pulse` : '',
          thisProps.color
            ? thisProps.color.startsWith('text-')
              ? thisProps.color
              : `text-${thisProps.color}`
            : '',
        ],
        useCircleSizeStyles(thisProps.size as number),
        false,
        null,
        '0 0 512 512',
        {
          role: 'img',
        },
        [
          h('path', {
            d: spinnerSvgData,
            fill: 'currentColor',
          }),
        ]
      );
  },
});
