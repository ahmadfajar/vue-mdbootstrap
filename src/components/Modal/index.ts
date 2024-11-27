import type { App, ObjectPlugin } from 'vue';
import BsModal from './BsModal';
import BsLightbox from './BsLightbox';

const BsModalPlugin: ObjectPlugin = {
    install: (app: App): void => {
        app.component(BsModal.name as string, BsModal);
        app.component(BsLightbox.name as string, BsLightbox);
    },
};

export { BsModalPlugin, BsModal, BsLightbox };
