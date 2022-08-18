import {defineComponent} from "vue";
import {useSimpleRenderWithSlots} from "./mixins/cardApi";
import {tagProp} from "../../mixins/CommonProps";

export default defineComponent({
    name: "BsCardFooter",
    props: {
        /**
         * Html tag used to render the card footer.
         * @type {string|*}
         */
        tag: tagProp
    },
    setup(props, {slots}) {
        return () => useSimpleRenderWithSlots(props.tag, slots, "card-footer");
    }
});
