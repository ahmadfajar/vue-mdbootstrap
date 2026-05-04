/* eslint-disable @typescript-eslint/no-empty-object-type */
import {
  useRenderSideDrawer,
  useSetupSideDrawer,
  useSideDrawerStyles,
} from '@/components/Drawer/mixins/sideDrawerApi.ts';
import { sideDrawerProps } from '@/components/Drawer/mixins/sideDrawerProps.ts';
import type { TBsSideDrawer, TSideDrawerOptionProps } from '@/components/Drawer/types';
import { useBreakpointMax } from '@/mixins/CommonApi.ts';
import type { TRecord, TVueMdb } from '@/types';
import type {
  UpdateOpenEventProps,
  UpdateOpenEventPublic,
  VoidDefaultSlots,
} from '@/types/internals.ts';
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
import { computed, defineComponent, ref } from 'vue';

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
    const isOpen = ref<boolean>(false);
    const clipHeight = ref<number>(0);

    // initialize side-drawer state
    isMobile.value = useBreakpointMax('md');
    const initialState = isMobile.value ? false : ((thisProps.open as boolean) ?? !isMobile.value);
    isOpen.value = initialState;

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

    useSetupSideDrawer(thisProps, vueMdb, appId, isMobile, isOpen, clipHeight, zIndex);

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
}) as DefineComponent<
  TBsSideDrawer,
  {},
  {},
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  SideDrawerEventProps,
  string,
  PublicProps,
  Readonly<TSideDrawerOptionProps> & Readonly<SideDrawerEventPublic>,
  ExtractDefaultPropTypes<TBsSideDrawer>,
  SlotsType<VoidDefaultSlots>,
  {},
  {},
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;

declare type SideDrawerEventProps = UpdateOpenEventProps & {
  /**
   * Fired when this SideDrawer size is resized.
   */
  resize?: (target: HTMLElement) => void;
};

declare interface SideDrawerEventPublic extends UpdateOpenEventPublic {
  /**
   * Fired when this SideDrawer size is resized.
   */
  onResize?: (target: HTMLElement) => void;

  /**
   * Fired when this SideDrawer size is resized.
   */
  '@resize'?: (target: HTMLElement) => void;
}
