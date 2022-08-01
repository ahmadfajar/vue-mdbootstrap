import BsSideDrawer from "./BsSideDrawer";
import BsSidebarFooter from "./BsSidebarFooter";
import registerPrototype from "../../mixins/CmpHelper";

export default Vue => {
    registerPrototype(Vue);

    Vue.component(BsSideDrawer.name, BsSideDrawer);
    Vue.component(BsSidebarFooter.name, BsSidebarFooter);
};
