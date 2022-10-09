import {defineComponent} from "vue";
import {sideDrawerProps} from "./mixins/sideDrawerProps";

export default defineComponent({
    name: "BsSideDrawer",
    props: sideDrawerProps,
    setup(props, {slots}) {

    }
});
