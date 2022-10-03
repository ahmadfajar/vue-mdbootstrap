import {defineComponent} from "vue";
import {useSimpleRenderWithSlots} from "../Card/mixins/cardApi";
import {cssPrefix} from "../../mixins/CommonApi";

export default defineComponent({
    name: "BsAppbarItems",
    setup(props, {slots}) {
        return () =>
            useSimpleRenderWithSlots("div", slots, `${cssPrefix}appbar-items`)
    }
});
