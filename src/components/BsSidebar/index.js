import BsSideDrawer from "./BsSideDrawer";
import BsSidebarNav from "./BsSidebarNav";
import BsSidebarNavItem from "./BsSidebarNavItem";
import BsSidebarFooter from "./BsSidebarFooter";
import registerPrototype from "../../utils/CmpHelper";

export default Vue => {
    registerPrototype(Vue);

    Vue.component(BsSideDrawer.name, BsSideDrawer);
    Vue.component(BsSidebarNav.name, BsSidebarNav);
    Vue.component(BsSidebarNavItem.name, BsSidebarNavItem);
    Vue.component(BsSidebarFooter.name, BsSidebarFooter);
};
