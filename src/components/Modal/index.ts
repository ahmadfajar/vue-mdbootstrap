import type { App, ObjectPlugin } from 'vue';
import BsLightbox from './BsLightbox.ts';
import BsModal from './BsModal.ts';

const BsModalPlugin: ObjectPlugin = {
  install: (app: App): void => {
    app.component(BsModal.name as string, BsModal);
    app.component(BsLightbox.name as string, BsLightbox);
  },
};

export { BsLightbox, BsModal, BsModalPlugin };
