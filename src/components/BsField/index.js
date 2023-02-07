import BsCombobox from "./BsCombobox";
import BsNumericField from "./BsNumericField";
import BsDateTimeField from "./BsDateTimeField";
import BsChipField from "./BsChipField";
import BsSearchField from "./BsSearchField";
import BsSwitch from "./BsSwitch";

export default Vue => {
    Vue.component(BsCombobox.name, BsCombobox);
    Vue.component(BsNumericField.name, BsNumericField);
    Vue.component(BsDateTimeField.name, BsDateTimeField);
    Vue.component(BsChipField.name, BsChipField);
    Vue.component(BsSearchField.name, BsSearchField);
    Vue.component(BsSwitch.name, BsSwitch);
};
