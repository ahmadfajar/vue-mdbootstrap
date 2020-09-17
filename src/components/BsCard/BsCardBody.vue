<template>
  <div :is="tag" class="card-body">
    <slot></slot>
  </div>
</template>

<script>
export default {
    name: "BsCardBody",
    props: {
        /**
         * Html tag used to render the card body.
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
