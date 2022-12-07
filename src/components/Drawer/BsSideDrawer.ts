import type {ComponentOptionsMixin, ComputedOptions, EmitsOptions} from "vue";
import {computed, defineComponent, onMounted, ref, watch} from "vue";
import {useBreakpointMax} from "../../mixins/CommonApi";
import {useRenderSideDrawer, useSideDrawerOnMountedHook, useSideDrawerStyles} from "./mixins/sideDrawerApi";
import {sideDrawerProps} from "./mixins/sideDrawerProps";
import type {TBsSideDrawer, TRecord, TSideDrawerOptionProps, TVueMdb} from "../../types";

export default defineComponent<TBsSideDrawer, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsSideDrawer",
    props: sideDrawerProps,
    emits: [
        /**
         * Fired when this component size is changed.
         */
        "resize",
        /**
         * Fired when this component state is updated.
         */
        "update:open",
    ],
    setup(props, {emit, slots}) {
        const cmpProps = props as Readonly<TSideDrawerOptionProps>;
        const zIndex = 1030; // see bootstrap: $zindex-fixed
        const vueMdb = ref<TVueMdb>();
        const appId = ref<string>();
        const isMobile = ref<boolean>(false);
        const isOpen = ref<boolean>(true);
        const resizeHandler = () => {
            emit("resize");
            isMobile.value = useBreakpointMax("md");
            if (isMobile.value) {
                isOpen.value = false;
                emit("update:open", false);
            } else {
                isOpen.value = true;
                emit("update:open", true);
            }
        };
        const clipHeight = computed(
            () => {
                if (cmpProps.clipped && appId.value && vueMdb.value) {
                    return vueMdb.value.app[appId.value].appbarHeight + 1;
                }
                return 0;
            }
        );
        const styles = computed(
            () => useSideDrawerStyles(cmpProps, isMobile, isOpen, clipHeight, zIndex)
        );

        onMounted(
            () => useSideDrawerOnMountedHook(appId, vueMdb, cmpProps)
        );
        watch(
            () => cmpProps.mini,
            (value) => {
                emit("resize");
                if (appId.value && vueMdb.value) {
                    if (cmpProps.position === "right") {
                        vueMdb.value.app[appId.value].rightSideDrawerWidth = value
                            ? (<number>cmpProps.miniWidth) : (<number>cmpProps.width);
                    } else {
                        vueMdb.value.app[appId.value].leftSideDrawerWidth = value
                            ? (<number>cmpProps.miniWidth) : (<number>cmpProps.width);
                    }
                }
            }
        );
        watch(
            () => cmpProps.open,
            (value) => {
                isOpen.value = <boolean>value;
                if (appId.value && vueMdb.value) {
                    if (cmpProps.position === "right") {
                        vueMdb.value.app[appId.value].rightSideDrawerWidth = !value ? 0 : (<number>cmpProps.width);
                    } else {
                        vueMdb.value.app[appId.value].leftSideDrawerWidth = !value ? 0 : (<number>cmpProps.width);
                    }
                }
            }
        );

        return () => useRenderSideDrawer(
            cmpProps, styles, appId,
            isMobile, isOpen, zIndex,
            slots, emit, resizeHandler,
        )
    }
});
