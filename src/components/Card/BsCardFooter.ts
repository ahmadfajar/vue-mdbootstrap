import {defineComponent, h} from "vue";
import {tagProp} from "../../mixins/Commons";

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
        return () => h(
            props.tag, {
                class: "card-footer"
            }, [
                slots.default && slots.default()
            ]
        )
    }
});
