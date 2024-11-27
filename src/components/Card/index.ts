import type { App, ObjectPlugin } from 'vue';
import BsCard from './BsCard';
import BsCardBody from './BsCardBody';
import BsCardContent from './BsCardContent';
import BsCardFooter from './BsCardFooter';
import BsCardHeader from './BsCardHeader';
import BsCardMedia from './BsCardMedia';

const BsCardPlugin: ObjectPlugin = {
    install: (app: App): void => {
        app.component(BsCard.name as string, BsCard);
        app.component(BsCardBody.name as string, BsCardBody);
        app.component(BsCardContent.name as string, BsCardContent);
        app.component(BsCardFooter.name as string, BsCardFooter);
        app.component(BsCardHeader.name as string, BsCardHeader);
        app.component(BsCardMedia.name as string, BsCardMedia);
    },
};

export { BsCardPlugin, BsCard, BsCardBody, BsCardContent, BsCardFooter, BsCardHeader, BsCardMedia };
