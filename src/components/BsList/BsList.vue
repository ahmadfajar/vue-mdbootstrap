<template>
  <div class="md-list" :class="classNames">
    <slot></slot>
  </div>
</template>

<script>
import "../../../scss/_others.scss";

export default {
    name: "BsList",
    props: {
        expand: Boolean,
        color: {
            type: String,
            default: 'white'
        }
    },
    data: (vm) => ({
        groups: [],
        bsList: {
            listClick: vm.listClick,
            addGroup: vm.addGroup,
            removeGroup: vm.removeGroup
        }
    }),
    provide() {
        const _list = this.bsList;
        return {
            'BsList': _list
        }
    },
    computed: {
        classNames() {
            return [
                'md-list-' + this.color
            ]
        }
    },
    methods: {
        addGroup(uid, callback) {
            this.groups.push({uid, callback});
        },
        removeGroup(uid) {
            const index = this.groups.findIndex(g => g.uid === uid);

            if (index > -1) {
                this.groups.splice(index, 1);
            }
        },
        listClick(uid) {
            if (this.expand) {
                return;
            }

            for (let i = this.groups.length; i--;) {
                this.groups[i].callback(uid);
            }
        }
    }
}
</script>

<style lang="scss">
  @import "~compass-sass-mixins/lib/compass/css3";
  @import "../../../scss/colors";
  @import "../../../scss/variables";
  @import "../../../scss/functions";
  @import "../../../scss/mixins";

  .#{$prefix}-list {
    @include transition(height .3s cubic-bezier(.4, 0, .2, 1));
    list-style-type: none;
    padding: 8px 0;

    .#{$prefix}-subheader {
      @include user-select(none);
    }

    .#{$prefix}-list-item {
      @include transition($transition-hoverable);
      @include user-select(none);
      color: inherit;
      margin: 0;
      padding: $padding-sm $padding-base;
      position: relative;
      text-decoration: none;

      a {
        cursor: pointer;
        text-decoration: none;
      }

      .#{$prefix}-list-tile-action {
        @include flexbox((display: flex, flex-direction: column, justify-content: center));

        &.#{$prefix}-action-stack {
          @include justify-content(flex-end);
        }
      }

      .#{$prefix}-list-tile-avatar {
        @include justify-content(flex-start);
      }

      .#{$prefix}-list-tile-title,
      .#{$prefix}-list-tile-subtitle {
        @include transition(.3s cubic-bezier(.25, .8, .5, 1));
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
      }

      .#{$prefix}-list-tile-content {
        @include flexbox((display: flex, flex: 1 1 auto, flex-direction: column, justify-content: center));
        overflow: hidden;

        > .#{$prefix}-list-tile-title {
          font-size: 1rem;
          font-weight: $font-weight-normal;
        }

        > .#{$prefix}-list-tile-subtitle {
          font-size: .88rem;
        }

        &.#{$prefix}-multiline {
          > .#{$prefix}-list-tile-subtitle {
            white-space: normal;
          }
        }
      }

      > div[class^="#{$prefix}-list-tile-"] {
        &:nth-child(2),
        &:last-child:not(:first-child) {
          margin-left: $padding-sm;
        }

        &:first-child:not(:last-child) {
          margin-right: $padding-sm;
        }
      }
    }

  }

  @each $name, $color in $mdb-colors {
    @include bslist-variant($name, $color);
  }

  .card {
    > .#{$prefix}-list {
      @include border-radius($border-radius-base * 2);
    }
  }

</style>
