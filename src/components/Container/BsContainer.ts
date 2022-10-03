import {
    ComponentOptionsMixin, computed,
    ComputedOptions,
    defineComponent,
    EmitsOptions,
    h,
    ref,
    VNode,
    withDirectives
} from "vue";
import {booleanProp, tagProp} from "../../mixins/CommonProps";
import {cssPrefix, useMaxBreakpoint, useFindParentCmp} from "../../mixins/CommonApi";
import {TAppContainerOptionProps, TBsContainer, TContainerOptionProps} from "./types";
import {IVueMdb, TRecord, TVueMdb} from "../../types";
import Resize from "../../directives/Resize";
import Helper from "../../utils/Helper";

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
            isMobile.value = useMaxBreakpoint("lg");
            emit("resize", node);
        };
        const nodeMountedHandler = (node: VNode): void => {
            const app = node.appContext?.app;
            if (app) {
                vueMdb.value = (<IVueMdb>app).$VueMdb;
                const parent = useFindParentCmp(["bs-app-container", "BsAppContainer"], node, 3);

                if (parent) {
                    appId.value = (<Readonly<TAppContainerOptionProps>>parent.$props).id;
                    if (!Helper.isObject(vueMdb.value?.app[(<string>appId.value)])) {
                        console.warn("<bs-container> must be wrapped by <bs-app-container>");
                    }
                }
            }
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

        return () =>
            withDirectives(
                h(cmpProps.tag || "div", {
                        class: `${cssPrefix}container-wrap`,
                        style: styles.value,
                        onVnodeMounted: nodeMountedHandler,
                    },
                    slots.default && slots.default()
                ), [
                    [Resize, resizeHandler]
                ]
            )
    }
});
