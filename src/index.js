import moment from "moment";
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
import ScreenSize from "./mixins/ScreenSize";
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

export {
    AxiosPlugin,
    ProxyAdapter,
    AbstractStore,
    BsModel,
    BsStore,
    BsTreeStore,
    BsArrayStore,
    Helper,
    ScreenSize,
};

export default VueMdb;

if (typeof window !== 'undefined' && window.Vue) {
    console.info('INFO: Registering Vue MDBootstrap libraries...');
    window.Vue.use(VueMdb);
    window.moment = moment;
    // window.AxiosPlugin = AxiosPlugin;
    // window.ProxyAdapter = ProxyAdapter;
    // window.AbstractStore = AbstractStore;
    // window.BsModel = BsModel;
    // window.BsStore = BsStore;
    // window.BsArrayStore = BsArrayStore;
    // window.BsTreeStore = BsTreeStore;
    // window.Helper = Helper;
}
