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
import Image from "../../mixins/Image";

export default {
    name: "BsListTileLeading",
    components: {BsAvatar},
    mixins: [Image],
    props: {
        /**
         * The image location to place inside component.
         * @type {string|*}
         */
        imgSrc: {
            type: String,
            default: undefined
        },
    }
}
</script>

<style scoped>

</style>
