import type { App, ObjectPlugin } from 'vue';
import BsCard from './BsCard.ts';
import BsCardBody from './BsCardBody.ts';
import BsCardContent from './BsCardContent.ts';
import BsCardFooter from './BsCardFooter.ts';
import BsCardHeader from './BsCardHeader.ts';
import BsCardMedia from './BsCardMedia.ts';

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

export { BsCard, BsCardBody, BsCardContent, BsCardFooter, BsCardHeader, BsCardMedia, BsCardPlugin };
