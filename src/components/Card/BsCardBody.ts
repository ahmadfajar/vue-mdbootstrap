import {defineComponent, h} from "vue";
import {tagProp} from "../../mixins/Commons";

export default defineComponent({
    name: "BsCardBody",
    props: {
        /**
         * Html tag used to render the card body.
         * @type {string|*}
         */
        tag: tagProp
    },
    setup(props, {slots}) {
        return () => h(
            props.tag, {
                class: "card-body"
            }, [
                slots.default && slots.default()
            ]
        )
    }
});
