import {h, Transition} from "vue";
import {cssPrefix} from "../../mixins/CommonApi";

export default function bsWave() {
    return h(Transition, {
        name: `${cssPrefix}ripple`,
        appear: true,
    }, {
        default: () => h("span", {class: `${cssPrefix}ripple-wave`}),
    })
}
