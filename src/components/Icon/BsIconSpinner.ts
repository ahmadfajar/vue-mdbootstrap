import type { ComponentOptionsMixin, ComputedOptions, EmitsOptions, MethodOptions } from 'vue';
import { defineComponent, h } from 'vue';
import { cssPrefix } from '../../mixins/CommonApi';
import type { TBsIconSpinner, TRecord } from '../../types';
import { iconSpinnerProps } from './mixins/iconProps';
import { spinnerSvgData, useCircleSizeStyles, useCreateSvgNode } from './mixins/svgApi';

export default defineComponent<TBsIconSpinner, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>({
    name: 'BsIconSpinner',
    props: iconSpinnerProps,
    setup(props) {
        return () => {
            return useCreateSvgNode(
                [
                    `${cssPrefix}svg-inline`,
                    'align-self-center',
                    props.spin ? `${cssPrefix}spin` : (props.pulse ? `${cssPrefix}pulse` : ''),
                    props.color ? `text-${props.color}` : '',
                ],
                useCircleSizeStyles(<number>props.size),
                false, null,
                '0 0 512 512', {
                    role: 'img'
                }, [
                    h('path', {
                        d: spinnerSvgData,
                        fill: 'currentColor'
                    }),
                ]
            )
        }
    }
});
