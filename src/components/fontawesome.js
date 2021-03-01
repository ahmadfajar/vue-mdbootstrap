import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from "@fortawesome/vue-fontawesome";

library.add(fas);

let fontawesome = Vue => {
    Vue.component("FontAwesomeIcon", FontAwesomeIcon);
    Vue.component("FontAwesomeLayers", FontAwesomeLayers);
    Vue.component("FontAwesomeLayersText", FontAwesomeLayersText);
}

export default fontawesome;
