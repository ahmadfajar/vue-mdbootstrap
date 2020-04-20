<template>
  <div :is="tag" class="md-list-tile-content" :class="_classNames">
    <slot></slot>
  </div>
</template>

<script>
export default {
    name: "BsListTileContent",
    props: {
        multiLine: Boolean,
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
