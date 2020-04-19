import BsSidebar from "./BsSidebar";
import BsSidebarNav from "./BsSidebarNav";
import BsSidebarNavItem from "./BsSidebarNavItem";
import BsSidebarFooter from "./BsSidebarFooter";
import registerPrototype from "../../utils/CmpHelper";

export default Vue => {
    registerPrototype(Vue);

    Vue.component(BsSidebar.name, BsSidebar);
    Vue.component(BsSidebarNav.name, BsSidebarNav);
    Vue.component(BsSidebarNavItem.name, BsSidebarNavItem);
    Vue.component(BsSidebarFooter.name, BsSidebarFooter);
};
