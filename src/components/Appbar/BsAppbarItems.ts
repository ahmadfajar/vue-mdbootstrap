import {defineComponent} from "vue";
import {cssPrefix, useRenderSlotDefault} from "../../mixins/CommonApi";

export default defineComponent({
    name: "BsAppbarItems",
    setup(props, {slots}) {
        return () =>
            useRenderSlotDefault("div", slots, `${cssPrefix}appbar-items`)
    }
});
