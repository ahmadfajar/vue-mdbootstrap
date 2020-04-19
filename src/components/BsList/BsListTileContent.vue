<template>
  <div :is="tag" class="md-list-tile-content" :class="classNames">
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
        classNames() {
            return {
                'md-multiline': this.multiLine
            }
        }
    }
}
</script>

<style scoped>

</style>
