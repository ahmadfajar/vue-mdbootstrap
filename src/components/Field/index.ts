import type { App, ObjectPlugin } from 'vue';
import BsTextField from './BsTextField';
import BsTextArea from './BsTextArea';
import BsChipField from './BsChipField';
import BsNumericField from './BsNumericField';
import BsSearchField from './BsSearchField';
import '../../../scss/_globalvars.scss';
import '../../../scss/_transitions.scss';
import '../../../scss/_utilities.scss';
import './field.scss';
import './chipField.scss';
import './numericField.scss';
import './searchField.scss';

const BsFieldPlugin: ObjectPlugin = {
    install: (app: App): void => {
        app.component(BsTextField.name as string, BsTextField);
        app.component(BsTextArea.name as string, BsTextArea);
        app.component(BsChipField.name as string, BsChipField);
        app.component(BsNumericField.name as string, BsNumericField);
        app.component(BsSearchField.name as string, BsSearchField);
    },
};

export { BsFieldPlugin, BsTextField, BsTextArea, BsChipField, BsNumericField, BsSearchField };
