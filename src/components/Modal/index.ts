import type { App, ObjectPlugin } from 'vue';
import BsModal from './BsModal';
import BsLightbox from './BsLightbox';
import '../../../scss/_transitions.scss';
import '../../../scss/_utilities.scss';
import './modal.scss';
import './lightbox.scss';

const BsModalPlugin: ObjectPlugin = {
    install: (app: App): void => {
        app.component(BsModal.name as string, BsModal);
        app.component(BsLightbox.name as string, BsLightbox);
    },
};

export { BsModalPlugin, BsModal, BsLightbox };
