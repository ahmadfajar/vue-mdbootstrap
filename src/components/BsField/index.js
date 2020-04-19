import BsCheckbox from "./BsCheckbox";
import BsCombobox from "./BsCombobox";
import BsTextField from "./BsTextField";
import BsTextArea from "./BsTextArea";
import BsNumberField from "./BsNumberField";
import BsDateTimeField from "./BsDateTimeField";
import BsSearchField from "./BsSearchField";
import BsRadio from "./BsRadio";
import BsRadioGroup from "./BsRadioGroup";
import BsSwitch from "./BsSwitch";

export default Vue => {
    Vue.component(BsCheckbox.name, BsCheckbox);
    Vue.component(BsCombobox.name, BsCombobox);
    Vue.component(BsTextField.name, BsTextField);
    Vue.component(BsTextArea.name, BsTextArea);
    Vue.component(BsNumberField.name, BsNumberField);
    Vue.component(BsDateTimeField.name, BsDateTimeField);
    Vue.component(BsSearchField.name, BsSearchField);
    Vue.component(BsRadio.name, BsRadio);
    Vue.component(BsRadioGroup.name, BsRadioGroup);
    Vue.component(BsSwitch.name, BsSwitch);
};
