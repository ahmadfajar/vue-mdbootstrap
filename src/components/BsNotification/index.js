import BsNotification from "./BsNotification";
import registerPrototype from "../../utils/CmpHelper";

export default Vue => {
    let myComponent = Vue.extend({
        template: '<bs-notification ref="notification"></bs-notification>',
        components: {BsNotification}
    });

    const component = new myComponent().$mount();

    document.body.appendChild(component.$el);
    registerPrototype(Vue);
    Vue.prototype.$VueMdb.$notification = component.$refs.notification;
    Vue.prototype.$notification = Vue.prototype.$VueMdb.$notification;

    Vue.component(BsNotification.name, BsNotification);
};
