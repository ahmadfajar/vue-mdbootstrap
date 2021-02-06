<template>
  <span
    v-on="$listeners"
    :class="_iconClass"
    :style="_iconStyles"
    class="md-icon">
    <svg
      v-if="iconData"
      :class="_svgClass"
      :height="szHeight"
      :width="szWidth"
      :enable-background="iconData.enableBackground"
      class="svg-inline mx-auto"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg">
      <g v-if="iconData.children">
        <template v-for="(item, idx) in iconData.children">
          <path 
            :is="_svgElTag(item)"
            :key="'svg-el-' + idx"
            v-bind="item" />
        </template>
      </g>
      <template v-else>
        <path
          v-for="(obj, k) in iconData.paths"
          :key="'path-' + k"
          v-bind="obj" />
      </template>
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
        /**
         * The icon’s name or alias.
         * @type {string|*}
         */
        icon: {
            type: String,
            default: undefined,
            required: true
        },
        /**
         * Flip the icon, valid values are: `horizontal`, `vertical`, `both`.
         * @type {string|*}
         */
        flip: {
            type: String,
            default: undefined,
            validator: v => ['horizontal', 'vertical', 'both'].indexOf(v) !== -1
        },
        /**
         * Apply **pulse** animation to the icon.
         * @type {boolean|*}
         */
        pulse: {
            type: Boolean,
            default: false
        },
        /**
         * Rotate the icon, valid values are: `90`, `180`, `270`.
         * @type {string|number|*}
         */
        rotation: {
            type: [Number, String],
            default: undefined,
            validator: v => [90, 180, 270].includes(parseInt(v, 10))
        },
        /**
         * Apply **spin** animation to the icon.
         * @type {boolean|*}
         */
        spin: {
            type: Boolean,
            default: false
        },
    },
    computed: {
        /**
         * Get icon css classes.
         *
         * @returns {string|null} Icon css class
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
         * @returns {Object|null} Icon css style dimension if icon data is empty
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
        _svgClass() {
            return {
                'fa-spin': this.spin,
                'fa-pulse': this.pulse,
                'fa-flip-both': this.flip === 'both',
                'fa-flip-vertical': this.flip === 'vertical',
                'fa-flip-horizontal': this.flip === 'horizontal',
                'fa-rotate-90': this.rotation && parseInt(this.rotation, 10) === 90,
                'fa-rotate-180': this.rotation && parseInt(this.rotation, 10) === 180,
                'fa-rotate-270': this.rotation && parseInt(this.rotation, 10) === 270,
            }
        },
        /**
         * Get icon data.
         *
         * @returns {Object|undefined} The icon data
         */
        iconData() {
            if (Helper.isEmpty(this.icon)) {
                return undefined;
            }
            const iconName = this.icon.toLowerCase();

            return IconLib.find(item => item.name.toLowerCase() === iconName || item.aliases.includes(this.icon));
        }
    },
    methods: {
        _svgElTag(item) {
            return item.rect ? 'rect' : (item.polygon ? 'polygon' : (item.polyline ? 'polyline' : 'path'));
        }
    },
}
</script>

<style lang="scss">
@import "~compass-sass-mixins/lib/compass/css3";
@import "../../../scss/colors";
@import "../../../scss/variables";

.#{$prefix}-icon {
    @include align-self(center);

    > .svg-inline {
        display: flex;
    }
}
</style>
