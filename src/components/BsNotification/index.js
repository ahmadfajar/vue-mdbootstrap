import BsNotification from "./BsNotification";
import registerPrototype from "../../utils/CmpHelper";

BsNotification.install = function (Vue) {
    let myComponent = Vue.extend({
        template: '<bs-notification ref="notification"></bs-notification>',
        components: {BsNotification}
    });

    const component = new myComponent().$mount();

    document.body.appendChild(component.$el);
    registerPrototype(Vue);
    Vue.prototype.$VueBs.$notification = component.$refs.notification;
    Vue.prototype.$notification = Vue.prototype.$VueBs.$notification;

    Vue.component(BsNotification.name, BsNotification);
};

export default BsNotification;
