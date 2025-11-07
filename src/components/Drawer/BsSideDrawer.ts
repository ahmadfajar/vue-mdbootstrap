import {
  useOnMountedSideDrawer,
  useRenderSideDrawer,
  useSideDrawerStyles,
  useUpdateSideDrawerConfig,
} from '@/components/Drawer/mixins/sideDrawerApi.ts';
import { sideDrawerProps } from '@/components/Drawer/mixins/sideDrawerProps.ts';
import { useBreakpointMax } from '@/mixins/CommonApi.ts';
import type { TBsSideDrawer, TSideDrawerOptionProps, TVueMdb } from '@/types';
import { computed, defineComponent, nextTick, onMounted, ref, watch } from 'vue';

export default defineComponent<TBsSideDrawer>({
  name: 'BsSideDrawer',
  props: sideDrawerProps,
  inheritAttrs: false,
  emits: ['resize', 'update:open'],
  setup(props, { attrs, emit, slots }) {
    const thisProps = props as Readonly<TSideDrawerOptionProps>;
    // see bootstrap: $zIndex-sticky
    const zIndex = ref(1021);
    const vueMdb = ref<TVueMdb>();
    const appId = ref<string>();
    const isMobile = ref<boolean>(false);
    const isOpen = ref<boolean>(thisProps.open as boolean);
    const initialState = thisProps.open as boolean;

    const clipHeight = computed(() => {
      if (thisProps.clipped && appId.value && vueMdb.value) {
        return vueMdb.value.app[appId.value]?.appbar.height;
      }
      return 0;
    });
    const styles = computed(() =>
      useSideDrawerStyles(thisProps, isMobile, isOpen, clipHeight, zIndex)
    );

    const resizeHandler = (el: Element) => {
      emit('resize', el);
      isMobile.value = useBreakpointMax('md');

      if (isMobile.value) {
        isOpen.value = false;
        emit('update:open', false);
      } else {
        isOpen.value = initialState;
        emit('update:open', isOpen.value);
      }
    };

    watch(
      () => thisProps.open as boolean,
      (value) => {
        isOpen.value = value;
        if (appId.value && vueMdb.value) {
          useUpdateSideDrawerConfig(thisProps, vueMdb.value, appId.value, isMobile.value, value);
        }
      }
    );

    onMounted(async () => {
      await useOnMountedSideDrawer(vueMdb, appId, zIndex);
      await nextTick().then(() => {
        if (appId.value && vueMdb.value) {
          useUpdateSideDrawerConfig(
            thisProps,
            vueMdb.value,
            appId.value,
            isMobile.value,
            thisProps.open as boolean
          );
        }
      });
    });

    return () =>
      useRenderSideDrawer(
        slots,
        emit,
        thisProps,
        attrs,
        styles,
        isMobile,
        isOpen,
        zIndex,
        resizeHandler
      );
  },
});
