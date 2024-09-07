import { defineComponent, h } from 'vue';
import { cssPrefix } from '../../mixins/CommonApi';
import { iconSpinnerProps } from './mixins/iconProps';
import { spinnerSvgData, useCircleSizeStyles, useCreateSvgNode } from './mixins/svgApi';
import type { TBsIconSpinner } from './types';

export default defineComponent<TBsIconSpinner>({
    name: 'BsIconSpinner',
    props: iconSpinnerProps,
    setup(props) {
        return () =>
            useCreateSvgNode(
                [
                    `${cssPrefix}svg-inline`,
                    'align-self-center',
                    props.spin ? `${cssPrefix}spin` : props.pulse ? `${cssPrefix}pulse` : '',
                    props.color ? `text-${props.color}` : '',
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
