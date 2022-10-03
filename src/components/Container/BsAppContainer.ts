import {ComponentOptionsMixin, ComputedOptions, defineComponent, EmitsOptions, h, VNode} from "vue";
import {booleanProp} from "../../mixins/CommonProps";
import {cssPrefix, useGenerateId} from "../../mixins/CommonApi";
import {IVueMdb, TRecord, TMdbAppObject} from "../../types";
import {TBsAppContainer} from "./types";
import Helper from "../../utils/Helper";

export default defineComponent<TBsAppContainer, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsAppContainer",
    props: {
        /**
         * Use document viewport height or not.
         * @type {boolean}
         */
        viewportHeight: booleanProp,
        /**
         * Sets the element `ID` attribute. This property value is auto generates.
         * @type {string}
         */
        id: {
            type: String,
            default: () => useGenerateId()
        },
    },
    setup(props, {slots}) {
        const nodeMountedHandler = (node: VNode): void => {
            const app = node.appContext?.app;
            const element = node.el as HTMLElement;
            const rect = element.getBoundingClientRect();

            const obj: TMdbAppObject = {
                left: rect.left,
                right: rect.right,
                top: rect.top,
                bottom: rect.bottom,
                height: rect.height,
                width: rect.width,
                appbarHeight: 0,
                leftSideDrawerWidth: 0,
                rightSideDrawerWidth: 0,
            };
            if (app) {
                (<IVueMdb>app).$VueMdb.app[(<string>props.id)] = obj;
            }
        };
        const nodeUnMountedHandler = (node: VNode) => {
            const app = node.appContext?.app;
            if (app) {
                const vueMdb = (<IVueMdb>app).$VueMdb;
                if (Helper.isObject(vueMdb.app[(<string>props.id)])) {
                    delete vueMdb.app[(<string>props.id)];
                }
            }
        };

        return () =>
            h("div", {
                class: {
                    [`${cssPrefix}application-wrap`]: true,
                    [`${cssPrefix}viewport-height`]: props.viewportHeight,
                },
                id: props.id,
                onVnodeMounted: nodeMountedHandler,
                onVnodeUnmounted: nodeUnMountedHandler,
            }, slots.default && slots.default());
    }
});
