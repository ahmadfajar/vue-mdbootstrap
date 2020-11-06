import BsNotification from "./BsNotification";
import registerPrototype from "../../utils/CmpHelper";

export default Vue => {
    const myComponent = Vue.extend(BsNotification);
    const component = new myComponent().$mount()

    document.body.appendChild(component.$el);
    registerPrototype(Vue);
    Vue.prototype.$VueMdb.$notification = component;
    Vue.prototype.$notification = Vue.prototype.$VueMdb.$notification;
    Vue.component(BsNotification.name, BsNotification);
};
