import BsTabs from "./BsTabs";
import BsTab from "./BsTab";
import BsTabContent from "./BsTabContent";
import BsTabPane from "./BsTabPane";

export default Vue => {
    Vue.component(BsTabs.name, BsTabs);
    Vue.component(BsTab.name, BsTab);
    Vue.component(BsTabContent.name, BsTabContent);
    Vue.component(BsTabPane.name, BsTabPane);
};
