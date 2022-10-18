import {
    ComponentOptionsMixin,
    computed,
    ComputedOptions,
    defineComponent,
    EmitsOptions,
    onMounted,
    ref,
    VNode
} from "vue";
import {sideDrawerProps} from "./mixins/sideDrawerProps";
import {useBreakpointMax} from "../../mixins/CommonApi";
import {
    useRenderSideDrawer,
    useSideDrawerClasses,
    useSideDrawerOnMountedHook,
    useSideDrawerStyles
} from "./mixins/sideDrawerApi";
import {TBsSideDrawer, TRecord, TSideDrawerOptionProps, TVueMdb} from "../../types";

export default defineComponent<TBsSideDrawer, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsSideDrawer",
    props: sideDrawerProps,
    emits: [
        /**
         * Fired when this component is hide or show.
         */
        "open",
        /**
         * Fired when this component size is changed.
         */
        "resize",
    ],
    setup(props, {emit, slots}) {
        const cmpProps = props as Readonly<TSideDrawerOptionProps>;
        const zIndex = 1030; // see bootstrap: $zindex-fixed
        const vueMdb = ref<TVueMdb>();
        const appId = ref<string>();
        const isMobile = ref<boolean>(false);
        const resizeHandler = (node: VNode) => {
            emit("resize", node);
            isMobile.value = useBreakpointMax("lg");
            if (isMobile.value) {
                emit("open", false);
            } else {
                emit("open", true);
            }
        };
        const clipHeight = computed(
            () => {
                if (cmpProps.clipped && appId.value && vueMdb.value) {
                    return vueMdb.value.app[appId.value].top + vueMdb.value.app[appId.value].appbarHeight + 1;
                }
                return 0;
            }
        );
        const classNames = computed(
            () => useSideDrawerClasses(cmpProps)
        );
        const styles = computed(
            () => useSideDrawerStyles(cmpProps, isMobile, clipHeight, zIndex)
        );

        onMounted(
            () => useSideDrawerOnMountedHook(appId, vueMdb, cmpProps)
        );

        return () => useRenderSideDrawer(
            cmpProps, classNames, styles, appId,
            isMobile, slots, resizeHandler
        )
    }
});
