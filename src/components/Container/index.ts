import type { App, ObjectPlugin } from 'vue';
import registerConfig from '../../mixins/registerConfig';
import BsApp from './BsApp';
import BsContainer from './BsContainer';
import BsContent from './BsContent';
import './container.scss';
import '../../../scss/_utilities.scss';

const BsContainerPlugin: ObjectPlugin = {
    install: (app: App): void => {
        registerConfig(app);
        app.component(BsApp.name as string, BsApp);
        app.component(BsContainer.name as string, BsContainer);
        app.component(BsContent.name as string, BsContent);
        // Backward compatibility
        app.component('BsAppContainer', BsApp);
    },
};

export { BsContainerPlugin, BsApp, BsContainer, BsContent };
