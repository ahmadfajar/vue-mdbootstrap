<template>
  <div class="md-list overflow-hidden" :class="_classNames">
    <slot></slot>
  </div>
</template>

<script>
import "../../../scss/_others.scss";

export default {
    name: "BsListView",
    props: {
        color: {
            type: String,
            default: 'white'
        },
        singleExpand: {
            type: Boolean,
            default: true
        },
    },
    data: (vm) => ({
        bsList: {
            items: [],
            singleExpand: vm.singleExpand,
            /**
             * Add an item to the ListView registry.
             *
             * @param {Object} item The BsListNav instance to add
             * @returns {void}
             */
            addItem: vm.addItem,
            /**
             * Add a child's item to a parent.
             *
             * @param {string} parentUid  The ID of BsListNav's item
             * @param {Object} child      The BsListNavItem instance to add
             * @returns {void}
             */
            addChild: vm.addChild,
            /**
             * Removes an item from the ListView registry.
             *
             * @param {string} uid The ID of BsListNav that will be removed
             * @returns {void}
             */
            removeItem: vm.removeItem,
            /**
             * Removes child's item from a parent.
             *
             * @param {string} parentUid The ID of BsListNav's item
             * @param {string} childUid  The ID of BsListNavItem that will be removed
             * @returns {void}
             */
            removeChild: vm.removeChild,
            findActive: vm.findActive,
        }
    }),
    provide() {
        return {
            bsList: this.bsList
        }
    },
    computed: {
        _classNames() {
            return [
                'md-list-' + this.color
            ]
        }
    },
    beforeDestroy() {
        this.bsList.items = null;
        this.bsList       = null;
    },
    methods: {
        /**
         * Add an item to the ListView registry.
         *
         * @param {Object} item The BsListNav instance to add
         * @returns {void}
         */
        addItem(item) {
            this.bsList.items.push(item);
        },
        /**
         * Add a child's item to a parent.
         *
         * @param {string} parentUid  The ID of BsListNav's item
         * @param {Object} child      The BsListNavItem to add
         * @returns {void}
         */
        addChild(parentUid, child) {
            const obj = this.bsList.items.find(el => el.uid === parentUid);

            if (obj) {
                obj.component.addItem(child);
            }
        },
        findActive() {
            for (const item of this.bsList.items) {
                for (const child of item.component.children) {
                    if (child.component.active) {
                        return child.component;
                    }
                }
            }

            return null;
        },
        /**
         * Removes an item from the ListView registry.
         *
         * @param {string} uid The ID of BsListNav that will be removed
         * @returns {void}
         */
        removeItem(uid) {
            const index = this.bsList.items.findIndex(el => el.uid === uid);

            if (index > -1) {
                this.bsList.items.splice(index, 1);
            }
        },
        /**
         * Removes child's item from a parent.
         *
         * @param {string} parentUid The ID of BsListNav's item
         * @param {string} childUid  The ID of BsListNavItem that will be removed
         * @returns {void}
         */
        removeChild(parentUid, childUid) {
            const obj = this.bsList.items.find(el => el.uid === parentUid);

            if (obj) {
                obj.component.removeItem(childUid);
            }
        },
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
  overflow-x: hidden;
  overflow-y: auto;
  padding: 8px 0;
  height: 100%;

  .#{$prefix}-subheader {
    @include user-select(none);
  }
}

.#{$prefix}-list-tile {
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

  .#{$prefix}-list-tile-leading {
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

@include bslist-variant(white, #fff);

@each $name, $color in $material-colors {
  @include bslist-variant($name, $color);
}

@each $name, $color in $theme-colors {
  @include bslist-variant($name, $color);
}

.card {
  > .#{$prefix}-list:first-child {
    @include border-top-radius($border-radius-base * 2);
  }

  > .#{$prefix}-list:last-child {
    @include border-bottom-radius($border-radius-base * 2);
  }
}
</style>
