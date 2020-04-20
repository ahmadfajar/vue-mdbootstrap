<template>
  <div :is="tag" class="card-header">
    <slot></slot>
  </div>
</template>

<script>
export default {
    name: "BsCardHeader",
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
