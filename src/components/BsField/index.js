import BsCheckbox from "./BsCheckbox";
import BsCheckboxGroup from "./BsCheckboxGroup";
import BsCombobox from "./BsCombobox";
import BsTextField from "./BsTextField";
import BsTextArea from "./BsTextArea";
import BsNumericField from "./BsNumericField";
import BsDateTimeField from "./BsDateTimeField";
import BsChipField from "./BsChipField";
import BsSearchField from "./BsSearchField";
import BsRadio from "./BsRadio";
import BsRadioGroup from "./BsRadioGroup";
import BsSwitch from "./BsSwitch";

export default Vue => {
    Vue.component(BsCheckbox.name, BsCheckbox);
    Vue.component(BsCheckboxGroup.name, BsCheckboxGroup);
    Vue.component(BsCombobox.name, BsCombobox);
    Vue.component(BsTextField.name, BsTextField);
    Vue.component(BsTextArea.name, BsTextArea);
    Vue.component(BsNumericField.name, BsNumericField);
    Vue.component(BsDateTimeField.name, BsDateTimeField);
    Vue.component(BsChipField.name, BsChipField);
    Vue.component(BsSearchField.name, BsSearchField);
    Vue.component(BsRadio.name, BsRadio);
    Vue.component(BsRadioGroup.name, BsRadioGroup);
    Vue.component(BsSwitch.name, BsSwitch);
};
