import { useSizeHeight, useSizeStyles, useSizeWidth } from '@/components/Icon/mixins/iconApi';
import { iconProps, iconSizeObjectProp } from '@/components/Icon/mixins/iconProps';
import type { TBsIcon, TBsIconSvg, TIconOptionProps } from '@/components/Icon/types';
import { cssPrefix } from '@/mixins/CommonApi';
import type { Prop } from 'vue';
import { defineComponent, h } from 'vue';
import BsIconSvg from './BsIconSvg';

export default defineComponent<TBsIcon>({
    name: 'BsIcon',
    props: {
        size: iconSizeObjectProp,
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
                    filled: props.filled,
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
