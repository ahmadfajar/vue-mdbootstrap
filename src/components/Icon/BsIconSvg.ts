import { useSizeHeight, useSizeWidth } from '@/components/Icon/mixins/iconApi';
import { iconProps } from '@/components/Icon/mixins/iconProps';
import {
    useGetGoogleIcon,
    useRenderIconFromSVG,
    useSvgClasses,
} from '@/components/Icon/mixins/svgApi';
import { booleanProp } from '@/mixins/CommonProps.ts';
import type { TBsIconSvg, TIconData, TIconSVGOptionProps, TRecord } from '@/types';
import { computed, defineComponent, onBeforeMount, ref, watch } from 'vue';

export default defineComponent<TBsIconSvg>({
    name: 'BsIconSvg',
    props: {
        filled: booleanProp,
        ...iconProps,
    },
    setup(props) {
        const thisProps = props as Readonly<TIconSVGOptionProps>;
        const svgIcon = ref<TIconData>();
        const svgClasses = computed<TRecord>(() => useSvgClasses(thisProps));

        watch(
            () => thisProps.icon,
            async (value) => {
                svgIcon.value = await useGetGoogleIcon(value, thisProps.filled);
            }
        );
        onBeforeMount(async () => {
            svgIcon.value = await useGetGoogleIcon(thisProps.icon, thisProps.filled);
        });

        return () =>
            useRenderIconFromSVG(
                svgIcon.value?.data,
                useSizeWidth(thisProps) || 24,
                useSizeHeight(thisProps) || 24,
                svgClasses.value
            );
    },
});
