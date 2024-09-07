import { computed, defineComponent, onMounted, ref } from 'vue';
import { useBreakpointMax } from '../../mixins/CommonApi';
import { booleanProp } from '../../mixins/CommonProps';
import type { TAppbarOptionProps, TBsAppbar, TVueMdb } from '../../types';
import { useAppbarOnMountedHook, useAppbarStyles, useRenderAppbar } from './mixins/appbarApi';

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
    emits: [
        /**
         * Fired when this component size is changed.
         */
        'resize',
    ],
    setup(props, { emit, slots }) {
        const thisProps = props as Readonly<TAppbarOptionProps>;
        const vueMdb = ref<TVueMdb>();
        const appbar = ref<HTMLElement | null>(null);
        const appId = ref<string>();
        const isMobile = ref<boolean>(false);
        const smoothAnimation = ref<boolean>(false);

        const styles = computed(() => useAppbarStyles(thisProps, appId, vueMdb, isMobile));

        const resizeHandler = (el: Element) => {
            isMobile.value = useBreakpointMax('md');
            emit('resize', el);
        };

        onMounted(() => useAppbarOnMountedHook(appId, appbar, vueMdb, smoothAnimation, thisProps));

        return () =>
            useRenderAppbar(thisProps, appbar, styles, smoothAnimation, slots, resizeHandler);
    },
});
