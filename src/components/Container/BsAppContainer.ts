import {
    ComponentOptionsMixin,
    ComputedOptions,
    defineComponent,
    EmitsOptions,
    getCurrentInstance,
    h,
    onMounted,
    onUnmounted,
    ref
} from "vue";
import {booleanProp} from "../../mixins/CommonProps";
import {cssPrefix, useGenerateId} from "../../mixins/CommonApi";
import {IComponentInstance, TAppContainerOptionProps, TBsAppContainer, TRecord, TVueMdb} from "../../types";
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
        const cmpProps = props as Readonly<TAppContainerOptionProps>;
        const vueMdb = ref<TVueMdb>();

        onMounted(
            () => {
                const instance = getCurrentInstance();
                vueMdb.value = instance?.appContext.config.globalProperties.$VueMdb;

                if (instance && vueMdb.value) {
                    const rect = (<HTMLElement>(<IComponentInstance>instance).ctx.$el).getBoundingClientRect();
                    vueMdb.value.app[(<string>cmpProps.id)] = {
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
                }
            }
        );
        onUnmounted(
            () => {
                if (vueMdb.value) {
                    if (Helper.isObject(vueMdb.value.app[(<string>cmpProps.id)])) {
                        delete vueMdb.value.app[(<string>cmpProps.id)]
                    }
                }
            }
        );

        return () =>
            h("div", {
                class: {
                    [`${cssPrefix}application-wrap`]: true,
                    [`${cssPrefix}viewport-height`]: cmpProps.viewportHeight,
                },
                id: cmpProps.id,
            }, slots.default && slots.default());
    }
});
