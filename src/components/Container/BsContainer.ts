import { baseTagProps } from '@/components/Card/mixins/cardProps.ts';
import { Resize } from '@/directives';
import {
  cssPrefix,
  useBreakpointMax,
  useFindParentComponent,
  useVueMdbService,
} from '@/mixins/CommonApi.ts';
import { booleanProp } from '@/mixins/CommonProps.ts';
import type {
  TAppContainerOptionProps,
  TBsContainer,
  TContainerOptionProps,
  TRecord,
  TVueMdb,
} from '@/types';
import Helper from '@/utils/Helper';
import { computed, defineComponent, h, onMounted, ref, withDirectives } from 'vue';

export default defineComponent<TBsContainer>({
  name: 'BsContainer',
  props: {
    app: booleanProp,
    ...baseTagProps,
  },
  emits: [
    /**
     * Fired when this component size is changed.
     */
    'resize',
  ],
  setup(props, { emit, slots }) {
    const thisProps = props as Readonly<TContainerOptionProps>;
    const thisElement = ref<HTMLElement | null>(null);
    const vueMdb = ref<TVueMdb>();
    const appId = ref<string>();
    const isMobile = ref<boolean>(false);
    const smoothAnimation = ref<boolean>(false);

    const styles = computed((): TRecord | undefined => {
      if (thisProps.app && appId.value) {
        if (vueMdb.value) {
          const { sideDrawer, appbar } = vueMdb.value.app[appId.value];

          return {
            paddingRight:
              isMobile.value && sideDrawer.right.mini
                ? `${sideDrawer.right.miniWidth}px`
                : isMobile.value
                  ? 0
                  : `${sideDrawer.right.width}px`,
            paddingLeft:
              isMobile.value && sideDrawer.left.mini
                ? `${sideDrawer.left.miniWidth}px`
                : isMobile.value
                  ? 0
                  : `${sideDrawer.left.width}px`,
            top: appbar.fixedTop === true ? Helper.cssUnit(appbar.height) : undefined,
            bottom: appbar.fixedTop === true ? 0 : undefined,
            position: appbar.fixedTop === true ? 'fixed' : undefined,
          };
        }
      }

      return undefined;
    });

    const resizeHandler = () => {
      emit('resize', thisElement.value);
      isMobile.value = useBreakpointMax('md');
    };

    onMounted(() => {
      vueMdb.value = useVueMdbService();
      const parent = useFindParentComponent(
        ['bs-app', 'bs-app-container', 'BsApp', 'BsAppContainer'],
        3
      );

      if (parent) {
        appId.value = (parent.props as Readonly<TAppContainerOptionProps>).id;
      } else {
        console.warn('<BsContainer> must be used inside <BsApp>');
      }

      window &&
        window.requestAnimationFrame(() => {
          smoothAnimation.value = true;
        });
    });

    return () =>
      withDirectives(
        h(
          thisProps.tag || 'div',
          {
            ref: thisElement,
            class: {
              [`${cssPrefix}container-wrap`]: true,
              'smooth-animation': smoothAnimation.value,
            },
            style: styles.value,
          },
          slots.default && slots.default()
        ),
        [[Resize, resizeHandler]]
      );
  },
});
