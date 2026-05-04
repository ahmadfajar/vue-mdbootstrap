import type { App, ObjectPlugin } from 'vue';
import BsImageUploader from './BsImageUploader.ts';

const BsUploaderPlugin: ObjectPlugin = {
  install: (app: App): void => {
    app.component('BsImageUploader', BsImageUploader);
  },
};

export type * from '@/components/Uploader/types';
export { BsImageUploader, BsUploaderPlugin };
