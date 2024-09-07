import type { Prop } from 'vue';
import { defineComponent, h } from 'vue';
import { cssPrefix } from '../../mixins/CommonApi';
import BsIconSvg from './BsIconSvg';
import { useSizeHeight, useSizeStyles, useSizeWidth } from './mixins/iconApi';
import { iconProps, iconSizeProp } from './mixins/iconProps';
import type { TBsIcon, TBsIconSvg, TIconOptionProps } from './types';

export default defineComponent<TBsIcon>({
    name: 'BsIcon',
    props: {
        size: iconSizeProp,
        ...iconProps,
    },
    setup(props) {
        const thisProps = props as Readonly<TIconOptionProps>;
        const szHeight = useSizeHeight(thisProps) as Prop<string>;
        const szWidth = useSizeWidth(thisProps) as Prop<string>;

        return () =>
            h(
                'span',
                {
                    class: [`${cssPrefix}icon`],
                    style: useSizeStyles(thisProps),
                },
                h<TBsIconSvg>(BsIconSvg, {
                    icon: props.icon,
                    height: szHeight,
                    width: szWidth,
                    spin: props.spin,
                    pulse: props.pulse,
                    flip: props.flip,
                    rotate: props.rotate,
                })
            );
    },
});
