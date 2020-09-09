<template>
  <div :is="tag"
       :class="_classNames"
       class="md-list-tile-action"
       v-on="$listeners">
    <slot></slot>
  </div>
</template>

<script>
export default {
    name: "BsListTileAction",
    props: {
        /**
         * Center item inside it vertically.
         * @type {boolean|*}
         */
        center: {
            type: Boolean,
            default: true
        },
        /**
         * Arrange item inside it vertically.
         * @type {boolean|*}
         */
        stack: {
            type: Boolean,
            default: false
        },
        tag: {
            type: String,
            default: 'div'
        },
    },
    computed: {
        _classNames() {
            return {
                'md-action-stack': this.stack,
                'align-self-center': this.center,
            }
        }
    }
}
</script>

<style scoped>

</style>
