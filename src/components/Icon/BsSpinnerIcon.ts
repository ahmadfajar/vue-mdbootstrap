import { iconSpinnerProps } from '@/components/Icon/mixins/iconProps.ts';
import {
  spinnerSvgData,
  useCircleSizeStyles,
  useCreateSvgNode,
} from '@/components/Icon/mixins/svgApi.ts';
import type { TBsSpinnerIcon } from '@/components/Icon/types';
import { cssPrefix } from '@/mixins/CommonApi.ts';
import { defineComponent, h } from 'vue';

export default defineComponent<TBsSpinnerIcon>({
  name: 'BsSpinnerIcon',
  props: iconSpinnerProps,
  setup(props) {
    return () =>
      useCreateSvgNode(
        [
          `${cssPrefix}svg-inline`,
          props.spin ? `${cssPrefix}spin` : props.pulse ? `${cssPrefix}pulse` : '',
          props.color ? `text-${props.color as string}` : '',
        ],
        useCircleSizeStyles(props.size as number),
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
