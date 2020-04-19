export default function registerPrototype (Vue) {
    if (typeof Vue.prototype.$VueBs === 'undefined') {
        Vue.prototype.$VueBs = new Vue({
            data: {
                application: {
                    footerHeight: 0,
                    navbarHeight: 0,
                    sidebarWidth: 0,
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
