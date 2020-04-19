<template>
  <img :class="imageClass"
       :src="imgSrc"
       :style="imageSizeStyles"
       v-on="$listeners"
       alt=""
       class="md-avatar" />
</template>

<script>
import Image from '../../mixins/Image';

export default {
    name: "BsAvatar",
    mixins: [Image]
}
</script>

<style scoped>

</style>
