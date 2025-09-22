import { useSizeHeight, useSizeWidth } from '@/components/Icon/mixins/iconApi.ts';
import { iconProps, iconSizeObjectProp } from '@/components/Icon/mixins/iconProps.ts';
import {
  useGetFontAwesome,
  useRenderNodeFromSVG,
  useSvgIconClasses,
} from '@/components/Icon/mixins/svgApi.ts';
import type {
  TBsFontawesomeIcon,
  TFontawesomeIconOptionProps,
  TFontAwesomeVariant,
  TIconData,
} from '@/components/Icon/types';
import { cssPrefix } from '@/mixins/CommonApi.ts';
import { stringArrayOrObjectProp } from '@/mixins/CommonProps.ts';
import type { Numberish, TRecord } from '@/types';
import Helper from '@/utils/Helper.ts';
import {
  computed,
  defineComponent,
  h,
  normalizeClass,
  onBeforeMount,
  type Prop,
  ref,
  watchEffect,
} from 'vue';

export default defineComponent<TBsFontawesomeIcon>({
  name: 'BsFontawesomeIcon',
  props: {
    size: iconSizeObjectProp,
    svgClass: stringArrayOrObjectProp,
    variant: {
      type: String,
      default: 'solid',
      validator: (value: string): boolean => ['regular', 'solid', 'light'].includes(value),
    } as Prop<TFontAwesomeVariant>,
    version: {
      type: String,
      default: '7.0.1',
    },
    ...iconProps,
  },
  setup(props) {
    const thisProps = props as Readonly<TFontawesomeIconOptionProps>;
    const szWidth = ref(useSizeWidth(thisProps) || 24);
    const szHeight = ref(useSizeHeight(thisProps) || 24);
    const svgIcon = ref<TIconData>();

    const svgClasses = computed<TRecord>(() => {
      if (!Helper.isEmpty(thisProps.svgClass)) {
        const name = normalizeClass(thisProps.svgClass);

        return {
          ...useSvgIconClasses(thisProps),
          [name]: true,
        };
      } else {
        return useSvgIconClasses(thisProps);
      }
    });

    const styles = computed<TRecord>(() => ({
      width: Helper.cssUnit(szWidth.value),
      height: Helper.cssUnit(szHeight.value),
    }));

    watchEffect(() => {
      if (szHeight.value !== useSizeHeight(thisProps)) {
        szHeight.value = useSizeHeight(thisProps) as Numberish;
      }
      if (szWidth.value !== useSizeWidth(thisProps)) {
        szWidth.value = useSizeWidth(thisProps) as Numberish;
      }

      useGetFontAwesome(thisProps.icon, thisProps.variant, thisProps.version)
        .then((v) => {
          svgIcon.value = v;
        })
        .catch((err) => {
          console.warn(err);
        });
      // svgIcon.value = await useGetFontAwesome(thisProps.icon, thisProps.variant, thisProps.version);
      //
      // if (szHeight.value !== useSizeHeight(thisProps)) {
      //   szHeight.value = useSizeHeight(thisProps) as Numberish;
      // }
      // if (szWidth.value !== useSizeWidth(thisProps)) {
      //   szWidth.value = useSizeWidth(thisProps) as Numberish;
      // }
    });

    onBeforeMount(async () => {
      svgIcon.value = await useGetFontAwesome(thisProps.icon, thisProps.variant, thisProps.version);
    });

    return () =>
      h(
        'span',
        {
          class: [`${cssPrefix}icon`, 'items-center', 'justify-center'],
          style: styles.value,
        },
        useRenderNodeFromSVG(svgIcon.value?.data, szWidth.value, szHeight.value, svgClasses.value)
      );
  },
});
