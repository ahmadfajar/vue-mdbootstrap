import {defineComponent, h, Transition} from "vue";
import {useSimpleRenderWithSlots} from "../Card/mixins/cardApi";
import {cssPrefix} from "../../mixins/CommonApi";

export default defineComponent({
    name: "BsWave",
    setup() {
        return () => h(Transition, {
            name: `${cssPrefix}-ripple`,
            appear: true,
        }, [
            useSimpleRenderWithSlots("span", null, [`${cssPrefix}-ripple-wave`]),
        ])
    }
});
