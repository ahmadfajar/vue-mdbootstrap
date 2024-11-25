import { useSizeHeight, useSizeWidth } from '@/components/Icon/mixins/iconApi';
import { iconProps } from '@/components/Icon/mixins/iconProps';
import {
    useGetGoogleIcon,
    useRenderIconFromSvg,
    useSvgClasses,
} from '@/components/Icon/mixins/svgApi';
import type { TBsIconSvg, TIconData, TIconOptionProps, TRecord } from '@/types';
import { computed, defineComponent, onBeforeMount, ref, watch } from 'vue';

export default defineComponent<TBsIconSvg>({
    name: 'BsIconSvg',
    props: iconProps,
    setup(props) {
        const thisProps = props as Readonly<TIconOptionProps>;
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
            useRenderIconFromSvg(
                svgIcon.value?.data,
                useSizeHeight(thisProps) || 24,
                useSizeWidth(thisProps) || 24,
                svgClasses.value
            );
    },
});
