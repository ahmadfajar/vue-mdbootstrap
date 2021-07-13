export default {
    methods: {
        /**
         * Loop upward until maximum step.
         *
         * @param {string} tagName Parent component tag name
         * @param {number} stepMax Maximum upward step
         * @returns {Vue} Parent component
         */
        getParentContainer(tagName, stepMax = 2) {
            let counter = 0;
            let iterator = this.$parent;

            while (iterator) {
                // Loop X step upward,
                // if not found then stops.
                if (counter === (stepMax + 1)) {
                    iterator = null;
                    break;
                }
                // Found match $parent: stop iterate upward
                if (iterator.$options._componentTag === tagName) {
                    break;
                }
                // Not found: iterate $parent and increase counter
                ++counter;
                iterator = iterator.$parent;
            }

            return iterator;
        }
    },
}
