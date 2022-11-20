import {ComponentOptionsMixin, ComputedOptions, defineComponent, EmitsOptions, h, VNode} from "vue";
import {booleanProp} from "../../mixins/CommonProps";
import {cssPrefix} from "../../mixins/CommonApi";
import {baseTagProps} from "../Card/mixins/cardProps";
import {TBsContainer, TBsContent, TContainerOptionProps, TRecord} from "../../types";
import BsContainer from "./BsContainer";

export default defineComponent<TBsContent, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsContent",
    props: {
        /**
         * Mount this component as part of application container or just ordinary container.
         * If mount as part of application container, then it will adapt to `SideDrawer` and `Appbar` size.
         * @type {boolean}
         */
        app: booleanProp,
        ...baseTagProps,
    },
    setup(props, {slots}) {
        const cmpProps = props as Readonly<TContainerOptionProps>;
        const cmpRender = (): VNode => {
            return h(cmpProps.tag || "div", {
                class: `${cssPrefix}content-wrap`
            }, slots.default && slots.default())
        }

        return () =>
            cmpProps.app
                ? h<TBsContainer>(BsContainer, {
                    app: props.app,
                    tag: props.tag,
                }, {
                    default: () => cmpRender()
                })
                : cmpRender()
    }
});
