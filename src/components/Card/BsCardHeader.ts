import {defineComponent, h} from "vue";
import {tagProp} from "../../mixins/Commons";

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
        return () => h(
            props.tag, {
                class: "card-header"
            }, [
                slots.default && slots.default()
            ]
        )
    }
});
