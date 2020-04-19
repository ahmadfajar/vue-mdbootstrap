import * as components from "./components";
import * as directives from "./directives";
import AxiosPlugin from "./utils/AxiosPlugin";
import ProxyAdapter from "./model/ProxyAdapter";
import AbstractStore from "./model/AbstractStore";
import BsModel from "./model/BsModel";
import BsStore from "./model/BsStore";
import BsTreeStore from "./model/BsTreeStore";
import BsArrayStore from "./model/BsArrayStore";
import Helper from "./utils/Helper";
import registerPrototype from "./utils/CmpHelper";

let VueMdb = Vue => {
    registerPrototype(Vue);

    Object.values(components).forEach(component => {
        Vue.use(component);
    });
    Object.values(directives).forEach(directive => {
        Vue.directive(directive.name, directive);
    });
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VueMdb);
}

export {
    AxiosPlugin,
    ProxyAdapter,
    BsModel,
    AbstractStore,
    BsStore,
    BsTreeStore,
    BsArrayStore,
    Helper
};

export default VueMdb;
