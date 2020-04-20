<template>
  <div :is="tag" class="card-body">
    <slot></slot>
  </div>
</template>

<script>
    export default {
        name: "BsCardBody",
        props: {
            tag: {
                type: String,
                default: 'div'
            }
        }
    }
</script>

<style scoped>

</style>
