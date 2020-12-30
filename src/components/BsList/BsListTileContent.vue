<template>
  <div
    :is="tag"
    :class="_classNames"
    class="md-list-tile-content">
    <slot></slot>
  </div>
</template>

<script>
export default {
    name: "BsListTileContent",
    props: {
        /**
         * Useful when you want to display multiline text. By default the subtitle will be display
         * in a single line, if the text length is beyond the container width then the text will be
         * cut and put an ellipses at the end.
         * @type {boolean|*}
         */
        multiLine: {
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
                'md-multiline': this.multiLine
            }
        }
    }
}
</script>

<style scoped>

</style>
