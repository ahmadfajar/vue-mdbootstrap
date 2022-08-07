import {defineComponent} from "vue";
import {tagProp} from "../../mixins/Commons";
import {useSimpleNodeWithSlots} from "./mixins/cardFunc";

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
        return () => useSimpleNodeWithSlots(props.tag, slots, "card-footer");
    }
});
