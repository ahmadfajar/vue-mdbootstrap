import { cssPrefix, useGenerateId } from '@/mixins/CommonApi.ts';
import { booleanProp } from '@/mixins/CommonProps.ts';
import type {
  IComponentInstance,
  TAppContainerOptionProps,
  TBsAppContainer,
  TVueMdb,
} from '@/types';
import Helper from '@/utils/Helper.ts';
import { defineComponent, getCurrentInstance, h, onMounted, onUnmounted, ref } from 'vue';

export default defineComponent<TBsAppContainer>({
  name: 'BsApp',
  props: {
    id: {
      type: String,
      default: () => useGenerateId(),
    },
    viewportHeight: booleanProp,
  },
  setup(props, { slots }) {
    const thisProps = props as Readonly<TAppContainerOptionProps>;
    const thisElement = ref<HTMLElement | null>(null);
    const vueMdb = ref<TVueMdb>();

    onMounted(() => {
      const instance = getCurrentInstance();
      vueMdb.value = instance?.appContext.config.globalProperties.$VueMdb;

      if (instance && vueMdb.value) {
        const rect =
          (
            (instance as IComponentInstance).ctx.$el as HTMLElement | null
          )?.getBoundingClientRect() ?? thisElement.value?.getBoundingClientRect();

        vueMdb.value.app[thisProps.id as string] = {
          left: rect?.left ?? 0,
          right: rect?.right ?? 0,
          top: rect?.top ?? 0,
          bottom: rect?.bottom ?? 0,
          height: rect?.height ?? 0,
          width: rect?.width ?? 0,
          appbar: {
            height: 0,
            fixedTop: false,
            stickyTop: false,
          },
          sideDrawer: {
            left: { width: 0, miniWidth: 0, mini: false, open: false },
            right: { width: 0, miniWidth: 0, mini: false, open: false },
          },
        };
      }
    });
    onUnmounted(() => {
      if (vueMdb.value) {
        if (Helper.isObject(vueMdb.value.app[thisProps.id as string])) {
          delete vueMdb.value.app[thisProps.id as string];
        }
      }
    });

    return () =>
      h(
        'div',
        {
          ref: thisElement,
          class: {
            [`${cssPrefix}application-wrap`]: true,
            [`${cssPrefix}viewport-height`]: thisProps.viewportHeight,
            [`${cssPrefix}appbar-fixed-top`]:
              vueMdb.value?.app[thisProps.id as string]?.appbar.fixedTop === true,
          },
          id: thisProps.id,
        },
        slots.default && slots.default()
      );
  },
});
