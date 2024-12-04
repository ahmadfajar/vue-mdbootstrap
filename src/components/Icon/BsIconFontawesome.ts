import { useSizeHeight, useSizeWidth } from '@/components/Icon/mixins/iconApi.ts';
import { iconProps, iconSizeObjectProp } from '@/components/Icon/mixins/iconProps.ts';
import {
    useGetFontAwesome,
    useRenderNodeFromSVG,
    useSvgClasses,
} from '@/components/Icon/mixins/svgApi.ts';
import type {
    TBsIconFontawesome,
    TIconFontawesomeOptionProps,
    TFontAwesomeVariant,
    TIconData,
} from '@/components/Icon/types';
import { cssPrefix } from '@/mixins/CommonApi.ts';
import type { TRecord } from '@/types';
import Helper from '@/utils/Helper.ts';
import { computed, defineComponent, h, onBeforeMount, type Prop, ref, watch } from 'vue';

export default defineComponent<TBsIconFontawesome>({
    name: 'BsIconFontawesome',
    props: {
        size: iconSizeObjectProp,
        variant: {
            type: String,
            default: 'solid',
            validator: (value: string): boolean => ['regular', 'solid', 'light'].includes(value),
        } as Prop<TFontAwesomeVariant>,
        version: {
            type: String,
            default: '6.7.1',
        },
        ...iconProps,
    },
    setup(props) {
        const thisProps = props as Readonly<TIconFontawesomeOptionProps>;
        const szWidth = useSizeWidth(thisProps) || 24;
        const szHeight = useSizeHeight(thisProps) || 24;
        const svgIcon = ref<TIconData>();
        const svgClasses = computed<TRecord>(() => useSvgClasses(thisProps));
        const styles = computed<TRecord>(() => ({
            width: Helper.cssUnit(szWidth),
            height: Helper.cssUnit(szHeight),
        }));

        watch(
            () => thisProps.icon,
            async (value) => {
                svgIcon.value = await useGetFontAwesome(
                    value,
                    thisProps.variant,
                    thisProps.version
                );
            }
        );
        watch(
            () => thisProps.variant as TFontAwesomeVariant,
            async (value) => {
                svgIcon.value = await useGetFontAwesome(thisProps.icon, value, thisProps.version);
            }
        );

        onBeforeMount(async () => {
            svgIcon.value = await useGetFontAwesome(
                thisProps.icon,
                thisProps.variant,
                thisProps.version
            );
        });

        return () =>
            h(
                'span',
                {
                    class: [`${cssPrefix}icon`, 'align-items-center', 'justify-content-center'],
                    style: styles.value,
                },
                useRenderNodeFromSVG(svgIcon.value?.data, szWidth, szHeight, svgClasses.value)
            );
    },
});
