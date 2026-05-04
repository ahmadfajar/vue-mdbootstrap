/* eslint-disable @typescript-eslint/no-empty-object-type */
import {
  useAppbarOnMountedHook,
  useAppbarStyles,
  useRenderAppbar,
} from '@/components/Appbar/mixins/appbarApi.ts';
import type { TAppbarOptionProps, TBsAppbar } from '@/components/Appbar/types';
import { useBreakpointMax } from '@/mixins/CommonApi.ts';
import { booleanProp } from '@/mixins/CommonProps.ts';
import type { TRecord, TVueMdb } from '@/types';
import type { VoidDefaultSlots } from '@/types/internals.ts';
import type {
  ComponentOptionsMixin,
  ComponentProvideOptions,
  ComputedOptions,
  DefineComponent,
  ExtractDefaultPropTypes,
  MethodOptions,
  PublicProps,
  SlotsType,
} from 'vue';
import { computed, defineComponent, onMounted, ref, watch } from 'vue';

export default defineComponent<TBsAppbar>({
  name: 'BsAppbar',
  props: {
    clippedLeft: booleanProp,
    clippedRight: booleanProp,
    fixedTop: booleanProp,
    stickyTop: booleanProp,
    shadow: booleanProp,
    tag: {
      type: String,
      default: 'header',
    },
  },
  emits: ['resize'],
  setup(props, { emit, slots }) {
    const thisProps = props as Readonly<TAppbarOptionProps>;
    const vueMdb = ref<TVueMdb>();
    const appbar = ref<HTMLElement | null>(null);
    const appId = ref<string>();
    const isMobile = ref<boolean>(false);
    const smoothAnimation = ref<boolean>(false);

    const styles = computed(() => useAppbarStyles(thisProps, appId, vueMdb, isMobile));

    watch(
      () => thisProps.fixedTop as boolean,
      (value) => {
        if (appId.value && vueMdb.value) {
          vueMdb.value.app[appId.value].appbar.fixedTop = value;
        }
      }
    );

    watch(
      () => thisProps.stickyTop as boolean,
      (value) => {
        if (appId.value && vueMdb.value) {
          vueMdb.value.app[appId.value].appbar.stickyTop = value;
        }
      }
    );

    const resizeHandler = (el: Element) => {
      isMobile.value = useBreakpointMax('md');
      emit('resize', el);
    };

    onMounted(() => useAppbarOnMountedHook(appId, appbar, vueMdb, smoothAnimation, thisProps));

    return () => useRenderAppbar(thisProps, appbar, styles, smoothAnimation, slots, resizeHandler);
  },
}) as DefineComponent<
  TBsAppbar,
  {},
  {},
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  AppbarEventProps,
  string,
  PublicProps,
  Readonly<TAppbarOptionProps> & Readonly<AppbarEventPublic>,
  ExtractDefaultPropTypes<TBsAppbar>,
  SlotsType<VoidDefaultSlots>,
  {},
  {},
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;

declare type AppbarEventProps = {
  /**
   * Fired when the Appbar is resized.
   */
  resize?: (target: HTMLElement) => void;
};

declare interface AppbarEventPublic {
  /**
   * Fired when the Appbar is resized.
   */
  onResize?: (target: HTMLElement) => void;

  /**
   * Fired when the Appbar is resized.
   */
  '@resize'?: (target: HTMLElement) => void;
}
