import type { App, ObjectPlugin } from 'vue';
import BsImageUploader from './BsImageUploader.ts';

const BsUploaderPlugin: ObjectPlugin = {
    install: (app: App): void => {
        app.component(BsImageUploader.name as string, BsImageUploader);
    },
};

export { BsUploaderPlugin, BsImageUploader };
