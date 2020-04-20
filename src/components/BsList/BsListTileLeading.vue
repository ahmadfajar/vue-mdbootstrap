<template>
  <div class="md-list-tile-leading"
       :class="imageClass"
       :style="imageSizeStyles">
    <slot></slot>
    <bs-avatar v-if="!$slots.default"
               :img-src="imgSrc"
               :circle="circle"
               :rounded="rounded"
               :size="size" />
  </div>
</template>

<script>
import BsAvatar from "../BsBasic/BsAvatar";
import image from '../../mixins/Image';

export default {
    name: "BsListTileLeading",
    components: {BsAvatar},
    mixins: [image]
}
</script>

<style scoped>

</style>
