<template>
  <transition :name="_transition">
    <div
      v-show="active"
      v-bind="_attributes"
      :class="_classNames">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
import RouteAble from "../../mixins/RouteAble";

export default {
    name: "BsTab",
    mixins: [RouteAble],
    inject: ['tabs'],
    props: {
        /**
         * TabItem ID.
         * @type {string|*}
         */
        id: {
            type: String,
            default: undefined
        },
        /**
         * TabItem icon to used.
         * @type {string|*}
         */
        icon: {
            type: [String, Array],
            default: undefined
        },
        /**
         * TabItem label.
         * @type {string|*}
         */
        label: {
            type: String,
            default: undefined
        },
        /**
         * TabItem aria-labelledby.
         * @type {string|*}
         */
        ariaLabel: {
            type: String,
            default: undefined
        }
    },
    data: () => ({
        isActive: false,
        itemIndex: -1
    }),
    computed: {
        /**
         * @property {Object} tabs
         */

        /**
         * @returns {string} Transition animation name
         * @private
         */
        _transition() {
            return this.tabs.transition;
        },
        /**
         * Get computed binding's attributes.
         *
         * @returns {Object|*} HTML attributes
         * @private
         */
        _attributes() {
            return {
                'id': this.id,
                'role': 'tabpanel',
                'aria-labelledby': this.ariaLabel
            }
        },
        /**
         * Get computed component's class names.
         *
         * @returns {Object} Css class names
         * @private
         */
        _classNames() {
            return {
                'tab-pane': true,
                'active': this.active
            }
        },
        active: {
            get() {
                return this.isActive;
            },
            set(value) {
                this.isActive = value;
            }
        }
    },
    created() {
        const idx = this.tabs.register(this);
        this.itemIndex = idx - 1;
    },
    beforeDestroy() {
        this.tabs.unregister(this.itemIndex);
    }
}
</script>

<style scoped>

</style>
