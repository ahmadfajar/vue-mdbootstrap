import BsNotification from "./BsNotification";
import registerPrototype from "../../utils/CmpHelper";

export default Vue => {
    const myComponent = Vue.extend(BsNotification);
    const component = new myComponent().$mount()

    registerPrototype(Vue);
    setTimeout(() => document.body.appendChild(component.$el), 100);
    Vue.prototype.$VueMdb.$notification = component;
    Vue.prototype.$notification = Vue.prototype.$VueMdb.$notification;
    Vue.component(BsNotification.name, BsNotification);
};
