<template>
  <span :class="_iconClass"
        :style="_iconStyles"
        class="md-icon"
        v-on="$listeners">
    <svg v-if="iconData"
         :height="szHeight"
         :width="szWidth"
         class="svg-inline mx-auto"
         viewBox="0 0 24 24"
         xmlns="http://www.w3.org/2000/svg">
      <path v-for="(obj, k) in iconData.paths"
            :key="obj.fill + '-' + k"
            :d="obj.d"
            :fill="obj.fill" />
    </svg>
  </span>
</template>

<script>
import IconLib from "./IconLibrary";
import Helper from "../../utils/Helper";
import IconSize from "./mixins/IconSize";
import "../../../scss/_others.scss";

export default {
    name: "BsIcon",
    mixins: [IconSize],
    props: {
        icon: {
            type: String,
            default: undefined
        }
    },
    computed: {
        /**
         * Get icon css classes.
         *
         * @return {string|null} Icon css class
         * @private
         */
        _iconClass() {
            const found = this.iconData;

            if (!Helper.isEmpty(found)) {
                return found.class;
            }

            return null;
        },
        /**
         * Get icon css style dimension.
         *
         * @return {Object|null} Icon css style dimension if icon data is empty
         */
        _iconStyles() {
            if (Helper.isEmpty(this.iconData)) {
                return {
                    height: this.szHeight + 'px',
                    width: this.szWidth + 'px',
                }
            }

            return null;
        },
        /**
         * Get icon data.
         *
         * @return {Object|undefined} The icon data
         */
        iconData() {
            if (Helper.isEmpty(this.icon)) {
                return undefined;
            }
            const iconName = this.icon.toLowerCase();

            return IconLib.find(item => item.name.toLowerCase() === iconName || item.aliases.includes(this.icon));
        }
    }
}
</script>

<style lang="scss">
@import "~compass-sass-mixins/lib/compass/css3";
@import "../../../scss/colors";
@import "../../../scss/variables";

.#{$prefix}-icon {
  @include flexbox((display: flex, align-items: center));
}
</style>
