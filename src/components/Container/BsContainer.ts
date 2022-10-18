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
import {booleanProp, tagProp} from "../../mixins/CommonProps";
import {cssPrefix, useBreakpointMax, useFindParentCmp} from "../../mixins/CommonApi";
import {TAppContainerOptionProps, TBsContainer, TContainerOptionProps, TRecord, TVueMdb} from "../../types";
import Resize from "../../directives/Resize";

export default defineComponent<TBsContainer, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsContainer",
    props: {
        /**
         * Mount this component as part of application container or just ordinary container.
         * If mount as part of application container, then it will adapt to `SideDrawer` and `Appbar` size.
         * @type {boolean}
         */
        app: booleanProp,
        /**
         * Html tag used to render this component.
         * @type {string}
         */
        tag: tagProp,
    },
    emits: [
        /**
         * Fired when this component size is changed.
         */
        "resize"
    ],
    setup(props, {emit, slots}) {
        const cmpProps = props as Readonly<TContainerOptionProps>;
        const vueMdb = ref<TVueMdb>();
        const appId = ref<string>();
        const isMobile = ref<boolean>(false);
        const resizeHandler = (node: VNode) => {
            emit("resize", node);
            isMobile.value = useBreakpointMax("lg");
        };
        const styles = computed(
            () => {
                if (cmpProps.app && appId.value) {
                    if (vueMdb.value) {
                        const {left, right, leftSideDrawerWidth, rightSideDrawerWidth} = vueMdb.value.app[appId.value];

                        return {
                            paddingRight: isMobile.value ? `${right}px` : `${rightSideDrawerWidth + right}px`,
                            paddingLeft: isMobile.value ? `${left}px` : `${leftSideDrawerWidth + left}px`
                        };
                    }
                }

                return undefined;
            }
        );
        onMounted(
            () => {
                const instance = getCurrentInstance();
                // console.log("instance:", instance);
                vueMdb.value = instance?.appContext.config.globalProperties.$VueMdb;
                const parent = useFindParentCmp(["bs-app-container", "BsAppContainer"], instance, 3);

                if (parent) {
                    appId.value = (<Readonly<TAppContainerOptionProps>>parent.props).id;
                } else {
                    console.warn("<bs-container> must be used inside <bs-app-container>");
                }
            }
        );

        return () =>
            withDirectives(
                h(cmpProps.tag || "div", {
                        class: `${cssPrefix}container-wrap`,
                        style: styles.value,
                    },
                    slots.default && slots.default()
                ), [
                    [Resize, resizeHandler]
                ]
            )
    }
});
