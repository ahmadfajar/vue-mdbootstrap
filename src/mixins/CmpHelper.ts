import Helper from "../utils/Helper";

export default function registerPrototype(Vue) {
    if (typeof Vue.prototype.$VueMdb === 'undefined') {
        Vue.prototype.$VueMdb = new Vue({
            props: {
                apps: {
                    type: Object,
                    default: null
                },
                notification: {
                    type: Object,
                    default: null
                }
            },
            methods: {
                /**
                 * Get App from global data store.
                 *
                 * @param {string} uuid The App identifier
                 * @returns {Object} The App which match the identifier or null
                 */
                getApplication(uuid: string): object {
                    return this.apps[uuid] || null;
                },
                /**
                 * Validate $VueMdb global data store, if doesn't exist then create it.
                 *
                 * @returns {void}
                 */
                validateApps() {
                    if (!this.apps || !Helper.isObject(this.apps)) {
                        this.apps = {};
                    }
                }
            },
        });
    }
}
