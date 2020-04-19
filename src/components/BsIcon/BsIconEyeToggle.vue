<template>
  <span class="md-toggle-icon icon-eye" v-on="$listeners">
    <font-awesome-icon :icon="toggleEye" />
  </span>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
    name: "BsIconEyeToggle",
    components: {FontAwesomeIcon},
    props: {
        toggle: Boolean
    },
    computed: {
        toggleEye() {
            if (this.toggle) {
                return 'eye-slash';
            }
            return 'eye';
        }
    }
}
</script>

<style lang="scss">
  @import "../../../scss/colors";
  @import "../../../scss/variables";

  .#{$prefix}-toggle-icon {
    cursor: pointer;
  }
</style>
