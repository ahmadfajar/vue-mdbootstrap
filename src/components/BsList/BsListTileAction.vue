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
        stack: Boolean,
        tag: {
            type: String,
            default: 'div'
        },
    },
    computed: {
        _classNames() {
            return {
                'md-action-stack': this.stack
            }
        }
    }
}
</script>

<style scoped>

</style>
