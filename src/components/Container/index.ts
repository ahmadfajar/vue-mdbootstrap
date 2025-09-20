import type { App, ObjectPlugin } from 'vue';
import registerConfig from '../../mixins/registerConfig.ts';
import BsApp from './BsApp.ts';
import BsContainer from './BsContainer.ts';
import BsContent from './BsContent.ts';

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

export { BsApp, BsContainer, BsContainerPlugin, BsContent };
