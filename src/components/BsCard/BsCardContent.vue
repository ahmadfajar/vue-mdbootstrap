<template>
  <div :is="tagName" :class="_classNames">
    <slot></slot>
  </div>
</template>

<script>
    export default {
        name: "BsCardContent",
        props: {
            tag: {
                type: String,
                default: undefined
            },
            type: {
                type: String,
                default: 'text',
                validator(value) {
                    return ['title', 'subtitle', 'text'].indexOf(value) > -1;
                }
            }
        },
        computed: {
            _classNames() {
                return {
                    ['card-' + this.type]: this.tagName
                }
            },
            tagName() {
                if (!this.tag) {
                    return (this.type === 'title' ? 'h5' : this.type === 'subtitle' ? 'h6' : 'p');
                }
                return this.tag;
            }
        }
    }
</script>

<style scoped>

</style>
