import { useSizeHeight, useSizeWidth } from '@/components/Icon/mixins/iconApi';
import { iconProps, iconSizeObjectProp } from '@/components/Icon/mixins/iconProps';
import {
  useGetGoogleIcon,
  useRenderIconFromSVG,
  useSvgIconClasses,
} from '@/components/Icon/mixins/svgApi';
import type { TBsSvgIcon, TIconData, TSvgIconOptionProps } from '@/components/Icon/types';
import { booleanProp } from '@/mixins/CommonProps.ts';
import type { TRecord } from '@/types';
import { computed, defineComponent, onBeforeMount, ref, watch } from 'vue';

export default defineComponent<TBsSvgIcon>({
  name: 'BsSvgIcon',
  props: {
    filled: booleanProp,
    size: iconSizeObjectProp,
    ...iconProps,
  },
  setup(props) {
    const thisProps = props as Readonly<TSvgIconOptionProps>;
    const svgIcon = ref<TIconData>();
    const svgClasses = computed<TRecord>(() => useSvgIconClasses(thisProps));

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
