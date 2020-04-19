<template>
    <div class="card-footer">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "BsCardFooter",
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