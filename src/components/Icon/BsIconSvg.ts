import { computed, defineComponent, onBeforeMount, ref, watch } from 'vue';
import type { TBsIconSvg, TIconData, TIconOptionProps, TRecord } from '../../types';
import { useSizeHeight, useSizeWidth } from './mixins/iconApi';
import { iconProps } from './mixins/iconProps';
import { findIcon, useGoogleIcon, useRenderSvgIcon, useSvgClasses } from './mixins/svgApi';

export default defineComponent<TBsIconSvg>({
    name: 'BsIconSvg',
    props: iconProps,
    setup(props) {
        let iconData: TIconData | undefined;
        const thisProps = props as Readonly<TIconOptionProps>;
        const svgIcon = ref<TIconData>();
        const svgClasses = computed<TRecord>(() => useSvgClasses(thisProps));

        watch(
            () => thisProps.icon,
            async (value) => {
                iconData = findIcon(value);
                if (iconData) {
                    svgIcon.value = await useGoogleIcon(iconData);
                }
            }
        );
        onBeforeMount(async () => {
            iconData = findIcon(thisProps.icon);
            if (iconData) {
                svgIcon.value = await useGoogleIcon(iconData);
            }
        });

        return () =>
            useRenderSvgIcon(
                svgIcon.value,
                useSizeHeight(thisProps) || 24,
                useSizeWidth(thisProps) || 24,
                svgClasses.value
            );
    },
});
