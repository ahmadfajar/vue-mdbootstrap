import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(fas);

let fontawesome = Vue => {
    Vue.component("font-awesome-icon", FontAwesomeIcon);
}

export default fontawesome;
