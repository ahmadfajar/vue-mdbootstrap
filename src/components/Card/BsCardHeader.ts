import {defineComponent} from "vue";
import {tagProp} from "../../mixins/Commons";
import {useSimpleRenderWithSlots} from "./mixins/cardFunc";

export default defineComponent({
    name: "BsCardHeader",
    props: {
        /**
         * Html tag used to render the card header.
         * @type {string|*}
         */
        tag: tagProp
    },
    setup(props, {slots}) {
        return () => useSimpleRenderWithSlots(props.tag, slots, "card-header");
    }
});
