import registerConfig from '@/mixins/RegisterConfig.ts';
import type { App, ObjectPlugin } from 'vue';
import BsApp from './BsApp.ts';
import BsContainer from './BsContainer.ts';
import BsContent from './BsContent.ts';

const BsContainerPlugin: ObjectPlugin = {
  install: (app: App): void => {
    registerConfig(app);
    app.component('BsApp', BsApp);
    app.component('BsContainer', BsContainer);
    app.component('BsContent', BsContent);
    // Backward compatibility
    app.component('BsAppContainer', BsApp);
  },
};

export type * from '@/components/Container/types';
export { BsApp, BsContainer, BsContainerPlugin, BsContent };
