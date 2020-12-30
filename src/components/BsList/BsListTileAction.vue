<template>
  <div
    :is="tag"
    v-on="$listeners"
    :class="_classNames"
    class="md-list-tile-action">
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
        /**
         * The html tag is used to render the component.
         * @type {string|*}
         */
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
