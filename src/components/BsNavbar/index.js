import BsNavbar from "./BsNavbar";
import BsNavbarItems from "./BsNavbarItems";
import BsNavbarTitle from "./BsNavbarTitle";
import registerPrototype from "../../utils/CmpHelper";

export default Vue => {
    registerPrototype(Vue);

    Vue.component(BsNavbar.name, BsNavbar);
    Vue.component(BsNavbarItems.name, BsNavbarItems);
    Vue.component(BsNavbarTitle.name, BsNavbarTitle);
};
