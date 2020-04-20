export default function registerPrototype (Vue) {
    if (typeof Vue.prototype.$VueMdb === 'undefined') {
        Vue.prototype.$VueMdb = new Vue({
            data: {
                application: {
                    footerHeight: 0,
                    appbarHeight: 0,
                    sideDrawerWidth: 0,
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                },
                $notification: null
            }
        });
    }
}
