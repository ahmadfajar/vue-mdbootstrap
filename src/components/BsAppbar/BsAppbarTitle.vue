<template>
  <div
    v-if="rawHtml"
    class="md-appbar-title"
    v-html="title"></div>
  <div v-else class="md-appbar-title">
    <slot>{{ title }}</slot>
  </div>
</template>

<script>
export default {
    name: "BsAppbarTitle",
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
