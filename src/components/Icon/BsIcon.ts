import { useSizeHeight, useSizeWidth } from '@/components/Icon/mixins/iconApi';
import { iconProps, iconSizeObjectProp } from '@/components/Icon/mixins/iconProps';
import type { TBsIcon, TBsIconSvg, TIconOptionProps } from '@/components/Icon/types';
import { cssPrefix } from '@/mixins/CommonApi';
import type { TRecord } from '@/types';
import Helper from '@/utils/Helper.ts';
import { computed, defineComponent, h, type Prop } from 'vue';
import BsIconSvg from './BsIconSvg';

export default defineComponent<TBsIcon>({
    name: 'BsIcon',
    props: {
        size: iconSizeObjectProp,
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
                h<TBsIconSvg>(BsIconSvg, {
                    icon: props.icon,
                    filled: props.filled,
                    height: szHeight as Prop<string>,
                    width: szWidth as Prop<string>,
                    spin: props.spin,
                    pulse: props.pulse,
                    flip: props.flip,
                    rotate: props.rotate,
                })
            );
    },
});
