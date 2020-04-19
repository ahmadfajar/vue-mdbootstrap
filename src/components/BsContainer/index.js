import BsAppContainer from "./BsAppContainer";
import BsContainer from "./BsContainer";
import BsContent from "./BsContent";
import registerPrototype from "../../utils/CmpHelper";

export default Vue => {
    registerPrototype(Vue);

    Vue.component(BsAppContainer.name, BsAppContainer);
    Vue.component(BsContainer.name, BsContainer);
    Vue.component(BsContent.name, BsContent);
};
