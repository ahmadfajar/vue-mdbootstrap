import {
    ComponentOptionsMixin,
    computed,
    ComputedOptions,
    defineComponent,
    EmitsOptions,
    getCurrentInstance,
    h,
    onMounted,
    ref,
    VNode,
    withDirectives
} from "vue";
import {booleanProp} from "../../mixins/CommonProps";
import {cssPrefix, useFindParentCmp, useMaxBreakpoint} from "../../mixins/CommonApi";
import {IComponentInstance, TRecord, TVueMdb} from "../../types";
import {TAppbarOptionProps, TBsAppbar} from "./types";
import {TAppContainerOptionProps} from "../Container/types";
import Resize from "../../directives/Resize";

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
            isMobile.value = useMaxBreakpoint("lg");
            emit("resize", node);
        };
        const styles = computed(
            () => {
                if (cmpProps.fixedTop) {
                    return {
                        'margin-left': isMobile.value
                            ? 0
                            : (
                                (cmpProps.clippedLeft && appId.value)
                                    ? (vueMdb.value?.app[appId.value].leftSideDrawerWidth || 0) + 'px'
                                    : 0
                            ),
                        'margin-right': isMobile.value
                            ? 0
                            : (
                                (cmpProps.clippedRight && appId.value)
                                    ? (vueMdb.value?.app[appId.value].rightSideDrawerWidth || 0) + 'px'
                                    : 0
                            ),
                    }
                } else {
                    return {
                        'margin-left': (cmpProps.clippedLeft && appId.value)
                            ? (vueMdb.value?.app[appId.value].leftSideDrawerWidth || 0) + 'px'
                            : undefined,
                        'margin-right': (cmpProps.clippedRight && appId.value)
                            ? (vueMdb.value?.app[appId.value].rightSideDrawerWidth || 0) + 'px'
                            : undefined,
                    }
                }
            }
        );
        onMounted(
            () => {
                const instance = getCurrentInstance();
                // console.log("instance:", instance);
                vueMdb.value = instance?.appContext.config.globalProperties.$VueMdb;
                const parent = useFindParentCmp(["bs-app-container", "BsAppContainer"], instance, 3);

                if (parent && instance) {
                    appId.value = (<Readonly<TAppContainerOptionProps>>parent.props).id;

                    if (appId.value && vueMdb.value) {
                        const rect = (<HTMLElement>(<IComponentInstance>instance).ctx.$el).getBoundingClientRect();
                        vueMdb.value.app[appId.value].appbarHeight = rect.height;
                    }
                } else {
                    console.warn("<bs-appbar> must be used inside <bs-app-container>");
                }
                smoothTransition.value = true;
            }
        );

        return () =>
            withDirectives(
                h(cmpProps.tag || "nav", {
                    class: {
                        [`${cssPrefix}appbar`]: true,
                        [`${cssPrefix}appbar-shadow`]: cmpProps.shadow,
                        [`${cssPrefix}appbar-transition`]: smoothTransition.value,
                        "sticky-top": cmpProps.fixedTop
                    },
                    style: styles.value,
                }, [
                    h("div", {
                        class: `${cssPrefix}appbar-content`
                    }, slots.default && slots.default()),
                ]), [
                    [Resize, resizeHandler]
                ]
            )
    }
});
