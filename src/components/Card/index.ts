import type { App, ObjectPlugin } from 'vue';
import BsCard from './BsCard.ts';
import BsCardBody from './BsCardBody.ts';
import BsCardContent from './BsCardContent.ts';
import BsCardFooter from './BsCardFooter.ts';
import BsCardHeader from './BsCardHeader.ts';
import BsCardMedia from './BsCardMedia.ts';

const BsCardPlugin: ObjectPlugin = {
  install: (app: App): void => {
    app.component('BsCard', BsCard);
    app.component('BsCardBody', BsCardBody);
    app.component('BsCardContent', BsCardContent);
    app.component('BsCardFooter', BsCardFooter);
    app.component('BsCardHeader', BsCardHeader);
    app.component('BsCardMedia', BsCardMedia);
  },
};

export type * from '@/components/Card/types';
export { BsCard, BsCardBody, BsCardContent, BsCardFooter, BsCardHeader, BsCardMedia, BsCardPlugin };
