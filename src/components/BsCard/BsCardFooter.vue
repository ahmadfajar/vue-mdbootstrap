<template>
  <div class="card-footer">
    <slot></slot>
  </div>
</template>

<script>
export default {
    name: "BsCardFooter",
    props: {
        /**
         * Html tag used to render the card footer.
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
