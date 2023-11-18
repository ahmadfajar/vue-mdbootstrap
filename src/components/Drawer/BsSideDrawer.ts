import type { ComponentOptionsMixin, ComputedOptions, EmitsOptions, MethodOptions } from 'vue';
import { computed, defineComponent, onMounted, ref, watch } from 'vue';
import { useBreakpointMax } from '../../mixins/CommonApi';
import type { TBsSideDrawer, TLabelPosition, TRecord, TSideDrawerOptionProps, TVueMdb } from '../../types';
import { useRenderSideDrawer, useSideDrawerOnMountedHook, useSideDrawerStyles } from './mixins/sideDrawerApi';
import { sideDrawerProps } from './mixins/sideDrawerProps';

export default defineComponent<TBsSideDrawer, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>({
    name: 'BsSideDrawer',
    props: sideDrawerProps,
    emits: [
        /**
         * Fired when this component size is changed.
         */
        'resize',
        /**
         * Fired when this component state is updated.
         */
        'update:open',
    ],
    setup(props, {emit, slots}) {
        const thisProps = props as Readonly<TSideDrawerOptionProps>;
        // see bootstrap: $zIndex-sticky
        const zIndex = ref(1020);
        const vueMdb = ref<TVueMdb>();
        const appId = ref<string>();
        const isMobile = ref<boolean>(false);
        const isOpen = ref<boolean>(<boolean>thisProps.open);
        const resizeHandler = (el: Element) => {
            emit('resize', el);
            isMobile.value = useBreakpointMax('md');
            if (isMobile.value) {
                isOpen.value = false;
                emit('update:open', false);
            } else {
                isOpen.value = true;
                emit('update:open', true);
            }
        };
        const clipHeight = computed(
            () => {
                if (thisProps.clipped && appId.value && vueMdb.value) {
                    return vueMdb.value.app[appId.value].appbar.height;
                }
                return 0;
            }
        );
        const styles = computed(
            () => useSideDrawerStyles(thisProps, isMobile, isOpen, clipHeight, zIndex)
        );

        onMounted(
            () => useSideDrawerOnMountedHook(appId, vueMdb, thisProps, zIndex)
        );
        watch(
            () => thisProps.mini,
            (value) => {
                if (appId.value && vueMdb.value) {
                    const position: TLabelPosition = thisProps.position === 'right' ? 'right' : 'left';
                    vueMdb.value.app[appId.value].sideDrawer[position].width =
                        value ? parseInt(<string>thisProps.miniWidth, 10)
                            : parseInt(<string>thisProps.width, 10);
                }
            }
        );
        watch(
            () => thisProps.open,
            (value) => {
                isOpen.value = <boolean>value;
                if (appId.value && vueMdb.value) {
                    const position: TLabelPosition = thisProps.position === 'right' ? 'right' : 'left';
                    vueMdb.value.app[appId.value].sideDrawer[position].width =
                        !value ? 0 : parseInt(<string>thisProps.width, 10);
                }
            }
        );

        return () => useRenderSideDrawer(
            slots, emit, thisProps, styles, appId,
            isMobile, isOpen, zIndex, resizeHandler
        )
    }
});
