<template>
  <div class="md-datepicker-header">
    <div class="md-datepicker-header-inner d-flex">
      <div
        :class="{ active: isYearActive }"
        :style="_styles"
        class="md-picker-year"
        @click="yearClick">
        {{ year === '' ? '&nbsp;' : year }}
      </div>
      <div
        v-if="enableTime"
        :class="{ active: isTimeActive }"
        :style="_styles"
        class="md-picker-time flex-grow-1 text-right"
        @click="timeClick">
        {{ time === '' ? '&nbsp;' : time }}
      </div>
    </div>
    <div
      :class="{ active: isTitleActive }"
      :style="_styles"
      class="md-datepicker-header-inner md-picker-title"
      @click="titleClick">
      <transition :name="transitionName">
        <div :key="date" v-html="value"></div>
      </transition>
    </div>
  </div>
</template>

<script>
import PickerConst from "./utils/DatePickerConst";

export default {
    name: "BsDatePickerHeader",
    props: {
        readonly: {
            type: Boolean,
            default: false
        },
        enableTime: {
            type: Boolean,
            default: true
        },
        date: {
            type: String,
            default: undefined
        },
        time: {
            type: String,
            default: undefined
        },
        year: {
            type: [Number, String],
            default: undefined
        },
        activePicker: {
            type: String,
            default: undefined
        },
        value: {
            type: String,
            default: ''
        }
    },
    data: () => ({
        reverse: false
    }),
    computed: {
        _styles() {
            return {
                'pointer-events': this.readonly ? 'none' : null
            }
        },
        isTimeActive() {
            return this.activePicker === PickerConst.TIME && !this.readonly;
        },
        isYearActive() {
            return this.activePicker === PickerConst.YEAR && !this.readonly;
        },
        isTitleActive() {
            return this.activePicker === PickerConst.DATE && !this.readonly;
        },
        transitionName() {
            return this.reverse === true ? 'picker-transition-reverse' : 'picker-transition';
        }
    },
    watch: {
        date(newVal, oldVal) {
            this.reverse = newVal < oldVal;
        }
    },
    methods: {
        timeClick() {
            if (!this.isTimeActive) {
                this.$emit('change-view', PickerConst.TIME);
            }
        },
        titleClick() {
            if (!this.isTitleActive) {
                this.$emit('change-view', PickerConst.DATE);
            }
        },
        yearClick() {
            if (!this.isYearActive) {
                this.$emit('change-view', PickerConst.YEAR);
            }
        }
    }
}
</script>

<style lang="scss">
@import "~compass-sass-mixins/lib/compass/css3";
@import "../../../scss/colors";
@import "../../../scss/variables";
@import "../../../scss/shared";

.#{$prefix}-datepicker-header {
    display: block;
    line-height: 1;

    .#{$prefix}-picker-year,
    .#{$prefix}-picker-time,
    .#{$prefix}-picker-title {
        &:not(.active) {
            @include opacity(.6);
            @extend %cursor-pointer;

            &:hover {
                @include opaque();
            }
        }
    }

    .#{$prefix}-datepicker-header-inner {
        @include transition($md-transition-stand);

        &:first-child {
            font-size: 1.25rem;
            font-weight: $font-weight-bold;
            margin-bottom: $padding-base / 4;
        }

        &.#{$prefix}-picker-title {
            font-size: 1.8rem;
            font-weight: $font-weight-bold;
            line-height: normal;
            position: relative;
            overflow: hidden;
            text-align: left;
        }
    }
}
</style>
