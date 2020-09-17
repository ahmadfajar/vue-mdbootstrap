<template>
  <div :is="tag" class="card-header">
    <slot></slot>
  </div>
</template>

<script>
export default {
    name: "BsCardHeader",
    props: {
        /**
         * Html tag used to render the card header.
         * @type {string|*}
         */
        tag: {
            type: String,
            default: 'div'
        }
    }
}
</script>

<style scoped>

</style>
