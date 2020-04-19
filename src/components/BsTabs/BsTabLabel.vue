<template>
  <bs-ripple>
    <div v-if="icon && (iconLeft || iconRight)"
         class="text-nowrap">
      <font-awesome-icon v-if="iconLeft"
                         :icon="icon"
                         :size="iconSize"
                         fixed-width />
      <span>{{ label }}</span>
      <font-awesome-icon v-if="iconRight"
                         :icon="icon"
                         :size="iconSize"
                         fixed-width />
    </div>
    <template v-else-if="icon && (iconTop || iconBottom)">
      <font-awesome-icon v-if="iconTop"
                         :icon="icon"
                         :size="iconSize"
                         fixed-width />
      <div :class="labelClass">
        {{ label }}
      </div>
      <font-awesome-icon v-if="iconBottom"
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
    data: (vm) => ({
        iconLeft: vm.iconPosition === 'left',
        iconRight: vm.iconPosition === 'right',
        iconTop: vm.iconPosition === 'top',
        iconBottom: vm.iconPosition === 'bottom'
    }),
    computed: {
        labelClass() {
            return {
                'mt-1': this.iconTop && this.icon,
                'mb-1': this.iconBottom && this.icon
            }
        }
    }
}
</script>

<style scoped>

</style>
