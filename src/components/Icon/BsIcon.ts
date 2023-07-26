import type { ComponentOptionsMixin, ComputedOptions, EmitsOptions, MethodOptions, Prop } from 'vue';
import { defineComponent, h } from 'vue';
import { cssPrefix } from '../../mixins/CommonApi';
import type { TBsIcon, TBsIconSvg, TIconOptionProps, TRecord } from '../../types';
import BsIconSvg from './BsIconSvg';
import { useSizeHeight, useSizeStyles, useSizeWidth } from './mixins/iconApi';
import { iconProps, iconSizeProp } from './mixins/iconProps';

export default defineComponent<TBsIcon, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>({
    name: 'BsIcon',
    props: {
        size: iconSizeProp,
        ...iconProps,
    },
    setup(props) {
        const cmpProps = props as Readonly<TIconOptionProps>;
        const szHeight = useSizeHeight(cmpProps) as Prop<string>;
        const szWidth = useSizeWidth(cmpProps) as Prop<string>;

        return () => h(
            'span', {
                class: [`${cssPrefix}icon`],
                style: useSizeStyles(cmpProps),
            }, h<TBsIconSvg>(BsIconSvg, {
                icon: props.icon,
                height: szHeight,
                width: szWidth,
                spin: props.spin,
                pulse: props.pulse,
                flip: props.flip,
                rotate: props.rotate,
            }),
        );
    }
});
