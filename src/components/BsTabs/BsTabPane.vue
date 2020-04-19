<template>
  <transition :name="_transition">
    <div v-show="active" :class="_classNames" v-bind="_attributes">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
    name: "BsTabPane",
    inject: ['tabs'],
    props: {
        id: {
            type: String,
            default: undefined
        },
        tabref: {
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
         * @return {String} Transition animation name
         * @private
         */
        _transition() {
            return this.tabs.transition;
        },
        /**
         * Get computed binding's attributes.
         *
         * @return {Object} HTML attributes
         * @private
         */
        _attributes() {
            return {
                'id': this.id,
                'role': 'tabpanel',
                'aria-labelledby': this.tabref
            }
        },
        /**
         * Get computed component's class names.
         *
         * @return {Object} Css class names
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
        const idx      = this.tabs.register(this);
        this.itemIndex = idx - 1;
    },
    beforeDestroy() {
        this.tabs.unregister(this.itemIndex);
    }
}
</script>

<style scoped>

</style>
