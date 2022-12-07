import type {ComponentOptionsMixin, ComputedOptions, EmitsOptions, VNode} from "vue";
import {computed, defineComponent, onMounted, ref} from "vue";
import {booleanProp} from "../../mixins/CommonProps";
import {useBreakpointMax} from "../../mixins/CommonApi";
import {useAppbarOnMountedHook, useAppbarStyles, useRenderAppbar} from "./mixins/appbarApi";
import type {TAppbarOptionProps, TBsAppbar, TRecord, TVueMdb} from "../../types";

export default defineComponent<TBsAppbar, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsAppbar",
    props: {
        /**
         * Clipped left side of the `Appbar` or not.
         * @type {boolean}
         */
        clippedLeft: booleanProp,
        /**
         * Clipped right side of the `Appbar` or not.
         * @type {boolean}
         */
        clippedRight: booleanProp,
        /**
         * Always stick `Appbar` at top of the page even though user already scrolled down.
         * @type {boolean}
         */
        fixedTop: booleanProp,
        /**
         * Create shadow effect at the bottom of `Appbar`.
         * @type {boolean}
         */
        shadow: booleanProp,
        /**
         * Html tag used to create the Appbar.
         * @type {string}
         */
        tag: {
            type: String,
            default: "nav"
        },
    },
    emits: [
        /**
         * Fired when this component size is changed.
         */
        "resize"
    ],
    setup(props, {emit, slots}) {
        const cmpProps = props as Readonly<TAppbarOptionProps>;
        const vueMdb = ref<TVueMdb>();
        const appId = ref<string>();
        const isMobile = ref<boolean>(false);
        const smoothTransition = ref<boolean>(false);
        const resizeHandler = (node: VNode) => {
            isMobile.value = useBreakpointMax("md");
            emit("resize", node);
        };
        const styles = computed(
            () => useAppbarStyles(cmpProps, appId, vueMdb, isMobile)
        );

        onMounted(
            () => useAppbarOnMountedHook(appId, vueMdb, smoothTransition)
        );

        return () => useRenderAppbar(
            cmpProps, appId, vueMdb, styles,
            smoothTransition, slots, resizeHandler
        )
    }
});
