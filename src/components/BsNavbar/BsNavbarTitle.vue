<template>
  <div v-if="rawHtml" class="md-navbar-title" v-html="title"></div>
  <div v-else class="md-navbar-title">
    <slot>{{ title }}</slot>
  </div>
</template>

<script>
export default {
    name: "BsNavbarTitle",
    props: {
        rawHtml: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: undefined
        }
    }
}
</script>

<style scoped>

</style>
