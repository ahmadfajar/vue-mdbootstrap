import {defineComponent} from "vue";
import {cssPrefix, useSimpleRenderWithSlots} from "../../mixins/CommonApi";

export default defineComponent({
    name: "BsAppbarItems",
    setup(props, {slots}) {
        return () =>
            useSimpleRenderWithSlots("div", slots, `${cssPrefix}appbar-items`)
    }
});
