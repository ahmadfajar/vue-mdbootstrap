import type { ComponentOptionsMixin, ComputedOptions, EmitsOptions, MethodOptions, VNode } from 'vue';
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useBreakpointMax } from '../../mixins/CommonApi';
import { booleanProp } from '../../mixins/CommonProps';
import type { TAppbarOptionProps, TBsAppbar, TRecord, TVueMdb } from '../../types';
import { useAppbarOnMountedHook, useAppbarStyles, useRenderAppbar } from './mixins/appbarApi';

export default defineComponent<TBsAppbar, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>({
    name: 'BsAppbar',
    props: {
        clippedLeft: booleanProp,
        clippedRight: booleanProp,
        fixedTop: booleanProp,
        stickyTop: booleanProp,
        shadow: booleanProp,
        tag: {
            type: String,
            default: 'nav'
        },
    },
    emits: [
        /**
         * Fired when this component size is changed.
         */
        'resize'
    ],
    setup(props, {emit, slots}) {
        const thisProps = props as Readonly<TAppbarOptionProps>;
        const vueMdb = ref<TVueMdb>();
        const appbar = ref<HTMLElement | null>(null);
        const appId = ref<string>();
        const isMobile = ref<boolean>(false);
        const smoothTransition = ref<boolean>(false);
        const resizeHandler = (el: Element) => {
            isMobile.value = useBreakpointMax('md');
            emit('resize', el);
        };
        const styles = computed(
            () => useAppbarStyles(thisProps, appId, vueMdb, isMobile)
        );

        onMounted(
            () => useAppbarOnMountedHook(appId, appbar, vueMdb, smoothTransition, thisProps)
        );

        return () => useRenderAppbar(
            thisProps, appId, appbar, vueMdb, styles,
            smoothTransition, slots, resizeHandler
        )
    }
});
