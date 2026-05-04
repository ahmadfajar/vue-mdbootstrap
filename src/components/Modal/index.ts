import type { App, ObjectPlugin } from 'vue';
import BsLightbox from './BsLightbox.ts';
import BsModal from './BsModal.ts';

const BsModalPlugin: ObjectPlugin = {
  install: (app: App): void => {
    app.component('BsModal', BsModal);
    app.component('BsLightbox', BsLightbox);
  },
};

export type * from '@/components/Modal/types';
export { BsLightbox, BsModal, BsModalPlugin };
