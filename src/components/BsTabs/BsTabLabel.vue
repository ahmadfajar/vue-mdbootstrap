<template>
  <bs-ripple :class="_rippleClass">
    <div
      v-if="icon && (iconLeft || iconRight)"
      class="text-nowrap">
      <font-awesome-icon
        v-if="iconLeft"
        :icon="icon"
        :size="iconSize"
        :class="{'mr-1': label}"
        fixed-width />
      <span>{{ label }}</span>
      <font-awesome-icon
        v-if="iconRight"
        :icon="icon"
        :size="iconSize"
        :class="{'ml-1': label}"
        fixed-width />
    </div>
    <template v-else-if="icon && (iconTop || iconBottom)">
      <font-awesome-icon
        v-if="iconTop"
        :icon="icon"
        :size="iconSize"
        fixed-width />
      <div :class="_labelClass">
        {{ label }}
      </div>
      <font-awesome-icon
        v-if="iconBottom"
        :icon="icon"
        :size="iconSize"
        fixed-width />
    </template>
    <span v-else>{{ label }}</span>
  </bs-ripple>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import BsRipple from "../BsAnimation/BsRipple";

export default {
    name: "BsTabLabel",
    components: {FontAwesomeIcon, BsRipple},
    props: {
        icon: {
            type: [String, Array],
            default: undefined
        },
        iconPosition: {
            type: String,
            default: undefined
        },
        iconSize: {
            type: String,
            default: undefined
        },
        label: {
            type: String,
            default: undefined
        },
    },
    computed: {
        iconLeft() {
            return this.iconPosition === 'left';
        },
        iconRight() {
            return this.iconPosition === 'right';
        },
        iconTop() {
            return this.iconPosition === 'top';
        },
        iconBottom() {
            return this.iconPosition === 'bottom';
        },
        _labelClass() {
            return {
                'mt-1': this.iconTop && this.icon,
                'mb-1': this.iconBottom && this.icon
            }
        },
        _rippleClass() {
            return {
                'd-flex': true,
                'align-items-center': true,
                'justify-content-center': true,
                'flex-column': this.iconTop || this.iconBottom
            }
        }
    }
}
</script>

<style scoped>

</style>
