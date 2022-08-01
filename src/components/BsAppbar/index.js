import BsAppbar from "./BsAppbar";
import BsAppbarItems from "./BsAppbarItems";
import BsAppbarTitle from "./BsAppbarTitle";
import registerPrototype from "../../mixins/CmpHelper";

export default Vue => {
    registerPrototype(Vue);

    Vue.component(BsAppbar.name, BsAppbar);
    Vue.component(BsAppbarItems.name, BsAppbarItems);
    Vue.component(BsAppbarTitle.name, BsAppbarTitle);
};
